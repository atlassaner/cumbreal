import Link from 'next/link';
import { CumbrealLogo } from '@/components/cumbreal/cumbreal-logo';
export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="wrap flex items-center justify-between py-5 gap-4">
        <Link href="/" className="brand">
          <CumbrealLogo />
        </Link>
        <span className="text-sm text-ink-muted">Un paso a la vez</span>
      </header>
      <main id="contenido" className="max-w-2xl mx-auto px-6 pt-6 pb-16">
        {children}
      </main>
    </div>
  );
}
