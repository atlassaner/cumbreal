import Link from 'next/link';
import { CumbrealLogo } from './cumbreal-logo';
export function Footer() { return <footer className="border-t border-ink/15 py-8">
<div className="wrap flex flex-col md:flex-row md:items-center justify-between gap-6">
<div>
<Link href="/" className="brand">
<CumbrealLogo /></Link>
<p className="text-sm text-ink-muted mt-2">Aprender también es encontrar tu rumbo.</p>
</div>
<nav aria-label="Enlaces del pie de página" className="flex flex-wrap gap-x-6">
<Link href="/institutions">Para instituciones</Link>
<Link href="/privacy">Privacidad del prototipo</Link>
</nav>
<p className="text-sm text-ink-muted">© 2026 Cumbreal · El Salvador</p>
</div>
</footer>; }
