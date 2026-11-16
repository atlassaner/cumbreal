'use client';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
export function AuthForm({ signup = false }: { signup?: boolean }) {
  const router = useRouter();
  const auth = useAuth();
  const [name, setName] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmation, setConfirmation] = useState(''),
    [errors, setErrors] = useState<Record<string, string>>({}),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (signup && !name.trim()) next.name = 'Escribe tu nombre.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Escribe un correo válido.';
    if (password.length < 8) next.password = 'Usa al menos 8 caracteres.';
    if (signup && password !== confirmation) next.confirmation = 'Las contraseñas deben coincidir.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    const profile = signup ? await auth.signup(name, email, password) : await auth.login(email, password);
    setBusy(false);
    if (profile) router.push(signup && !profile.isOnboarded ? '/onboarding' : '/dashboard');
  }
  const control = (id: string, label: string, type: string, value: string, set: (s: string) => void, auto: string) => (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => set(e.target.value)}
        autoComplete={auto}
        className="field"
        required
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? id + '-error' : undefined}
      />
      {errors[id] && (
        <p id={id + '-error'} className="field-error">
          ⚠ {errors[id]}
        </p>
      )}
    </div>
  );
  return (
    <>
      <h1 className="text-4xl">{signup ? 'Crea tu perfil' : 'Retoma tu camino'}</h1>
      <p className="text-ink-muted mt-4">
        Prototipo local: tu perfil vive en este navegador. Usa una contraseña de prueba que no utilices en otros servicios.
      </p>
      <button
        type="button"
        className="button button-secondary w-full mt-6"
        onClick={() => setMessage('Google aún no está conectado. Puedes crear o abrir un perfil local con el formulario.')}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path fill="#4285F4" d="M22 12.2c0-.7-.1-1.4-.2-2.2H12v4.2h5.6a4.8 4.8 0 0 1-2.1 3.1v2.6h3.4c2-1.8 3.1-4.4 3.1-7.7Z" />
          <path fill="#34A853" d="M12 22c2.8 0 5.1-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1.9-3.5.9-2.7 0-5-1.8-5.8-4.2H2.7v2.7A10 10 0 0 0 12 22Z" />
          <path fill="#FBBC05" d="M6.2 13.6a6 6 0 0 1 0-3.2V7.7H2.7a10 10 0 0 0 0 8.6Z" />
          <path fill="#EA4335" d="M12 6.2c1.5 0 2.8.5 3.8 1.5l2.9-2.8A10 10 0 0 0 2.7 7.7l3.5 2.7C7 8 9.3 6.2 12 6.2Z" />
        </svg>
        Continuar con Google <span className="text-xs">(próximamente)</span>
      </button>
      {message && (
        <p role="status" className="notice mt-4">
          {message}
        </p>
      )}
      <div className="border-t border-ink/15 mt-6 pt-6">
        <form onSubmit={submit} noValidate className="space-y-5">
          {signup && control('name', 'Nombre completo', 'text', name, setName, 'name')}
          {control('email', 'Correo electrónico', 'email', email, setEmail, 'email')}
          {control('password', 'Contraseña local', 'password', password, setPassword, signup ? 'new-password' : 'current-password')}
          {signup && (
            <>
              <p className="text-sm text-ink-muted" aria-live="polite">
                Fortaleza: {password.length < 8 ? 'usa 8 caracteres o más' : password.length < 12 ? 'básica' : 'mejor con una frase única'}.
              </p>
              {control('confirmation', 'Confirma tu contraseña', 'password', confirmation, setConfirmation, 'new-password')}
            </>
          )}
          {auth.error && (
            <p role="alert" className="notice">
              {auth.error}
            </p>
          )}
          <button className="button w-full" disabled={busy}>
            {busy ? 'Guardando…' : signup ? 'Crear mi perfil local' : 'Ingresar a mi perfil'}
          </button>
        </form>
      </div>
      {!signup && (
        <Link href="/forgot-password" className="text-teal-deep mt-3">
          ¿Olvidaste tu contraseña?
        </Link>
      )}
      <p className="text-sm mt-4">
        {signup ? '¿Ya tienes un perfil?' : '¿Es tu primera visita?'}{' '}
        <Link href={signup ? '/login' : '/signup'} className="text-teal-deep font-medium">
          {signup ? 'Ingresar' : 'Crear un perfil'}
        </Link>
      </p>
    </>
  );
}
