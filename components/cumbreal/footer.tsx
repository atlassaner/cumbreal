import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CumbrealLogo } from './cumbreal-logo';

export function Footer() {
  return (
    <footer className="summit-footer">
      <div className="summit-landscape" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet="/brand/landscapes/cumbreal-summit-mobile.webp" />
          <Image src="/brand/landscapes/cumbreal-summit.webp" alt="" fill sizes="100vw" className="summit-image" />
        </picture>
      </div>

      <div className="wrap relative">
        <div className="summit-invitation">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl max-w-xl text-balance">Tu próximo paso empieza contigo.</h2>
          <p className="text-ink mt-5 max-w-md text-lg">Explora tus intereses y encuentra un camino que quieras probar.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-7">
            <Link href="/onboarding" className="button">
              Explorar mis intereses <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href="/#metodo" className="button button-secondary summit-method-link">
              Conocer el método
            </a>
          </div>
        </div>

        <div className="summit-footer-panel">
          <div className="grid md:grid-cols-[1.3fr_1fr_1fr] gap-8 lg:gap-12">
            <div>
              <Link href="/" className="brand">
                <CumbrealLogo />
              </Link>
              <p className="text-sm text-ink-muted max-w-xs mt-3">Aprender también es encontrar tu rumbo.</p>
              <p className="text-xs text-ink-muted mt-5">Hecho para explorar posibilidades en El Salvador.</p>
            </div>
            <nav aria-label="Explora Cumbreal" className="summit-link-group">
              <h3 className="font-sans text-base font-medium text-teal-deep">Explora</h3>
              <a href="/#metodo">El método</a>
              <a href="/#trayectorias">Trayectorias</a>
              <Link href="/onboarding">Explorar mis intereses</Link>
            </nav>
            <nav aria-label="Contacto y privacidad" className="summit-link-group">
              <h3 className="font-sans text-base font-medium text-teal-deep">Conversemos</h3>
              <Link href="/institutions">
                Para instituciones <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link href="/privacy">Privacidad del prototipo</Link>
              <a href="mailto:cumbreal.cc@gmail.com">cumbreal.cc@gmail.com</a>
            </nav>
          </div>
          <div className="border-t border-ink/15 mt-7 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-xs text-ink-muted">© 2026 Cumbreal · El Salvador</p>
            <p className="text-xs text-ink-muted">Un punto de partida, no una etiqueta.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
