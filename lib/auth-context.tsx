'use client';
import { DiagnosisResult, GUEST_DIAGNOSIS_KEY, restoreDiagnosis } from './diagnosis';
import { PATHWAYS } from './pathways';
import { createContext, useContext, useEffect, useState } from 'react';
export interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    level: 1 | 2 | 3 | 4 | 5;
    levelName: string;
    affinity: {
        category: string;
        percentage: number;
    };
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
    login: (email: string, password?: string) => Promise<boolean>;
    signup: (name: string, email: string, password?: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<UserProfile>) => void;
    completeOnboarding: (diagnosis: DiagnosisResult) => void;
    deleteLocalData: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION = 'cumbreal_v2_session', ACCOUNTS = 'cumbreal_v2_accounts';
function accounts(): Account[] { const raw = localStorage.getItem(ACCOUNTS); if (!raw)
    return []; const parsed = JSON.parse(raw); if (!Array.isArray(parsed) || parsed.some(a => !a?.profile?.id || !a?.profile?.email || typeof a.hash !== 'string' || typeof a.salt !== 'string'))
    throw new Error('Los perfiles locales no se pudieron leer. Elimina los datos del sitio desde tu navegador para comenzar de nuevo.'); return parsed.map((a: Account) => ({ ...a, profile: { ...a.profile, diagnosis: restoreDiagnosis(a.profile.diagnosis) || undefined } })); }
async function derive(password: string, salt: string) { const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']); const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: new TextEncoder().encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256); return Array.from(new Uint8Array(bits)).map(v => v.toString(16).padStart(2, '0')).join(''); }
export function AuthProvider({ children }: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<UserProfile | null>(null), [isLoading, setLoading] = useState(true), [error, setError] = useState('');
    useEffect(() => { try {
        const id = localStorage.getItem(SESSION);
        if (id)
            setUser(accounts().find(a => a.profile.id === id)?.profile || null);
    }
    catch {
        setError('No pudimos recuperar el perfil local. Revisa los datos del sitio en tu navegador.');
    }
    finally {
        setLoading(false);
    } }, []);
    function save(profile: UserProfile) { const list = accounts(); const existing = list.findIndex(a => a.profile.id === profile.id); if (existing < 0)
        throw new Error('No encontramos este perfil local.'); list[existing] = { ...list[existing], profile }; localStorage.setItem(ACCOUNTS, JSON.stringify(list)); localStorage.setItem(SESSION, profile.id); setUser(profile); }
    async function login(email: string, password = '') { setLoading(true); setError(''); try {
        const account = accounts().find(a => a.profile.email === email.trim().toLowerCase());
        if (!account || await derive(password, account.salt) !== account.hash) {
            setError('El correo o la contraseña no coinciden con un perfil de este navegador.');
            return false;
        }
        localStorage.setItem(SESSION, account.profile.id);
        setUser(account.profile);
        try { sessionStorage.removeItem(GUEST_DIAGNOSIS_KEY); sessionStorage.removeItem('cumbreal_diagnosis_draft_v1:guest'); } catch { /* Local session is already open. */ }
        return true;
    }
    catch {
        setError('No pudimos abrir el perfil. Comprueba que el almacenamiento del navegador esté disponible.');
        return false;
    }
    finally {
        setLoading(false);
    } }
    async function signup(name: string, email: string, password = '') { setLoading(true); setError(''); try {
        const list = accounts();
        const normalized = email.trim().toLowerCase();
        if (list.some(a => a.profile.email === normalized)) {
            setError('Ya existe un perfil local con este correo. Puedes ingresar.');
            return false;
        }
        if (!name.trim() || password.length < 8)
            return false;
        const profile: UserProfile = { id: crypto.randomUUID(), fullName: name.trim(), email: normalized, level: 1, levelName: 'Explorador', affinity: { category: 'Por explorar', percentage: 0 }, xp: 0, isOnboarded: false };
        try {
            const diagnosis = restoreDiagnosis(JSON.parse(sessionStorage.getItem(GUEST_DIAGNOSIS_KEY) || 'null'));
            if (diagnosis?.selectedPathwayId) {
                profile.diagnosis = diagnosis;
                const path = PATHWAYS.find(p => p.id === diagnosis.selectedPathwayId)!;
                profile.affinity = { category: path.title, percentage: diagnosis.matches.find(m => m.pathwayId === path.id)?.matchScore || 0 };
                profile.isOnboarded = true;
                profile.xp = 50;
            }
        } catch { /* An invalid guest result is never imported into a profile. */ }
        const salt = crypto.randomUUID();
        const account = { profile, salt, hash: await derive(password, salt) };
        localStorage.setItem(ACCOUNTS, JSON.stringify([...list, account]));
        localStorage.setItem(SESSION, profile.id);
        setUser(profile);
        try { sessionStorage.removeItem(GUEST_DIAGNOSIS_KEY); } catch { /* Profile is already saved. */ }
        return true;
    }
    catch {
        setError('No pudimos guardar el perfil. Comprueba que el almacenamiento del navegador esté disponible.');
        return false;
    }
    finally {
        setLoading(false);
    } }
    function logout() { localStorage.removeItem(SESSION); setUser(null); }
    function updateProfile(data: Partial<UserProfile>) { if (user)
        save({ ...user, ...data, id: user.id, email: user.email }); }
    function completeOnboarding(result: DiagnosisResult) {
        if (!user) throw new Error('Abre tu perfil antes de guardar.');
        const diagnosis = restoreDiagnosis(result);
        if (!diagnosis?.selectedPathwayId) throw new Error('Selecciona una trayectoria antes de guardar.');
        const path = PATHWAYS.find(p => p.id === diagnosis.selectedPathwayId)!;
        save({ ...user, diagnosis, affinity: { category: path.title, percentage: diagnosis.matches.find(m => m.pathwayId === path.id)?.matchScore || 0 }, xp: Math.max(user.xp, 50), isOnboarded: true });
    }
    function deleteLocalData() { if (!user)
        return; const list = accounts().filter(a => a.profile.id !== user.id); localStorage.setItem(ACCOUNTS, JSON.stringify(list)); localStorage.removeItem('cumbreal_v2_progress:' + user.id); localStorage.removeItem('cumbreal_diagnosis_draft_v1:' + user.id); logout(); }
    return <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, error, login, signup, logout, updateProfile, completeOnboarding, deleteLocalData }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const c = useContext(AuthContext); if (!c)
    throw new Error('AuthProvider requerido'); return c; }
