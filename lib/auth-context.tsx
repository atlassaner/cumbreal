'use client';
import { DiagnosisResult, applyDiagnosis, restoreDiagnosis } from './diagnosis';
import { ACCOUNTS_KEY, GUEST_DIAGNOSIS_KEY, SESSION_KEY, clearUserData, draftKey } from './storage';
import { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  level: 1 | 2 | 3 | 4 | 5;
  levelName: string;
  affinity: { category: string; percentage: number };
  xp: number;
  isOnboarded: boolean;
  diagnosis?: DiagnosisResult;
}
interface Account {
  profile: UserProfile;
  salt: string;
  hash: string;
}
interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  login: (email: string, password?: string) => Promise<UserProfile | null>;
  signup: (name: string, email: string, password?: string) => Promise<UserProfile | null>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  completeOnboarding: (diagnosis: DiagnosisResult) => void;
  deleteLocalData: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function accounts(): Account[] {
  const raw = localStorage.getItem(ACCOUNTS_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  if (
    !Array.isArray(parsed) ||
    parsed.some((a) => !a?.profile?.id || !a?.profile?.email || typeof a.hash !== 'string' || typeof a.salt !== 'string')
  )
    throw new Error('Los perfiles locales no se pudieron leer. Elimina los datos del sitio desde tu navegador para comenzar de nuevo.');
  return parsed.map((a: Account) => ({ ...a, profile: { ...a.profile, diagnosis: restoreDiagnosis(a.profile.diagnosis) || undefined } }));
}

async function derive(password: string, salt: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256);
  return Array.from(new Uint8Array(bits))
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('');
}

// The result a guest finished before signing in. An invalid one is never imported.
function readGuestDiagnosis(): DiagnosisResult | null {
  try {
    const diagnosis = restoreDiagnosis(JSON.parse(sessionStorage.getItem(GUEST_DIAGNOSIS_KEY) || 'null'));
    return diagnosis?.selectedPathwayId ? diagnosis : null;
  } catch {
    return null;
  }
}

// Called only after the profile is saved, so a failed save keeps the guest's result.
function clearGuestDiagnosis() {
  try {
    sessionStorage.removeItem(GUEST_DIAGNOSIS_KEY);
    sessionStorage.removeItem(draftKey('guest'));
  } catch {
    /* Nothing left to protect: the profile already holds the result. */
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const id = localStorage.getItem(SESSION_KEY);
      if (id) setUser(accounts().find((a) => a.profile.id === id)?.profile || null);
    } catch {
      setError('No pudimos recuperar el perfil local. Revisa los datos del sitio en tu navegador.');
    } finally {
      setLoading(false);
    }
  }, []);

  function save(profile: UserProfile) {
    const list = accounts();
    const existing = list.findIndex((a) => a.profile.id === profile.id);
    if (existing < 0) throw new Error('No encontramos este perfil local.');
    list[existing] = { ...list[existing], profile };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(list));
    localStorage.setItem(SESSION_KEY, profile.id);
    setUser(profile);
  }

  async function login(email: string, password = '') {
    setLoading(true);
    setError('');
    try {
      const account = accounts().find((a) => a.profile.email === email.trim().toLowerCase());
      if (!account || (await derive(password, account.salt)) !== account.hash) {
        setError('El correo o la contraseña no coinciden con un perfil de este navegador.');
        return null;
      }
      // A result finished as a guest is kept only if this profile has none of its own.
      const guest = readGuestDiagnosis();
      const profile = guest && !account.profile.diagnosis ? applyDiagnosis(account.profile, guest) : account.profile;
      if (profile !== account.profile) save(profile);
      else {
        localStorage.setItem(SESSION_KEY, profile.id);
        setUser(profile);
      }
      clearGuestDiagnosis();
      return profile;
    } catch {
      setError('No pudimos abrir el perfil. Comprueba que el almacenamiento del navegador esté disponible.');
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function signup(name: string, email: string, password = '') {
    setLoading(true);
    setError('');
    try {
      const list = accounts();
      const normalized = email.trim().toLowerCase();
      if (list.some((a) => a.profile.email === normalized)) {
        setError('Ya existe un perfil local con este correo. Puedes ingresar.');
        return null;
      }
      if (!name.trim() || password.length < 8) {
        setError('Escribe tu nombre y una contraseña de al menos 8 caracteres.');
        return null;
      }
      let profile: UserProfile = {
        id: crypto.randomUUID(),
        fullName: name.trim(),
        email: normalized,
        level: 1,
        levelName: 'Explorador',
        affinity: { category: 'Por explorar', percentage: 0 },
        xp: 0,
        isOnboarded: false,
      };
      const guest = readGuestDiagnosis();
      if (guest) profile = applyDiagnosis(profile, guest);
      const salt = crypto.randomUUID();
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...list, { profile, salt, hash: await derive(password, salt) }]));
      localStorage.setItem(SESSION_KEY, profile.id);
      clearGuestDiagnosis();
      setUser(profile);
      return profile;
    } catch {
      setError('No pudimos guardar el perfil. Comprueba que el almacenamiento del navegador esté disponible.');
      return null;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  function updateProfile(data: Partial<UserProfile>) {
    if (user) save({ ...user, ...data, id: user.id, email: user.email });
  }

  function completeOnboarding(result: DiagnosisResult) {
    if (!user) throw new Error('Abre tu perfil antes de guardar.');
    const diagnosis = restoreDiagnosis(result);
    if (!diagnosis?.selectedPathwayId) throw new Error('Selecciona una trayectoria antes de guardar.');
    save(applyDiagnosis(user, diagnosis));
  }

  function deleteLocalData() {
    if (!user) return;
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts().filter((a) => a.profile.id !== user.id)));
    clearUserData(user.id);
    logout();
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, error, login, signup, logout, updateProfile, completeOnboarding, deleteLocalData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const c = useContext(AuthContext);
  if (!c) throw new Error('AuthProvider requerido');
  return c;
}
