import Link from 'next/link';
import { CumbrealLogo } from '@/components/cumbreal/cumbreal-logo';
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="wrap flex items-center justify-between py-5 gap-4">
        <Link href="/" className="brand">
          <CumbrealLogo />
        </Link>
        <Link href="/">Volver al inicio</Link>
      </header>
      <main id="contenido" className="max-w-lg mx-auto px-6 pt-8 pb-16">
        <div className="panel">{children}</div>
        <p className="text-sm text-ink-muted mt-6">Tu ritmo. Tu curiosidad. Tu siguiente paso.</p>
      </main>
    </div>
  );
}
