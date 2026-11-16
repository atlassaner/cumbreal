import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Cumbi } from './cumbi';

export function Hero() {
  return (
    <section className="wrap grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center py-12 lg:py-20">
      <div>
        <h1 className="text-5xl lg:text-[64px] max-w-xl">Descubre el rumbo de tu aprendizaje.</h1>
        <p className="text-ink-muted text-lg mt-6 max-w-lg">
          Lo que aprendes puede abrir nuevos caminos. Reconoce tus intereses, reúne evidencias y explora tu siguiente paso con Cumbi.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
          <Link href="/onboarding" className="button">
            Explorar mis intereses <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a href="#metodo" className="text-teal-deep font-medium underline underline-offset-4">
            Conocer el método
          </a>
        </div>
        <p className="text-sm text-ink-muted mt-5">Diseñado para estudiantes e instituciones de El Salvador.</p>
      </div>

      <div className="hero-scene hero-journey-scene overflow-hidden border border-ink/10">
        <svg
          className="hero-route-lines pointer-events-none absolute inset-x-0 top-0 h-[330px] w-full"
          viewBox="0 0 480 330"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M0 268 93 138 148 193 262 69 365 172 422 117 480 210V330H0Z" fill="#D3E1DA" />
          <path d="m0 301 104-78 70 31 120-100 74 78 112-45v143H0Z" fill="#C7DAD0" />
          <g stroke="#28697A" strokeOpacity=".22" strokeWidth="1">
            <path d="M-28 185C47 125 79 126 126 159S202 78 261 83 327 167 395 131 457 138 501 115" />
            <path d="M-28 208C47 148 79 149 126 182S202 101 261 106 327 190 395 154 457 161 501 138" />
            <path d="M-28 231C47 171 79 172 126 205S202 124 261 129 327 213 395 177 457 184 501 161" />
            <path d="M-28 254C47 194 79 195 126 228S202 147 261 152 327 236 395 200 457 207 501 184" />
            <path d="M-28 277C47 217 79 218 126 251S202 170 261 175 327 259 395 223 457 230 501 207" />
            <path d="M-28 300C47 240 79 241 126 274S202 193 261 198 327 282 395 246 457 253 501 230" />
          </g>
          <path
            className="route-draw"
            pathLength={1}
            d="M419 172C389 202 428 223 372 244S294 251 296 270"
            stroke="#F2AA2E"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle className="route-mark" cx="419" cy="172" r="6" fill="#F2AA2E" stroke="#F7F4EC" strokeWidth="3" />
        </svg>

        <Cumbi size={250} state="Base" className="relative mx-auto" />

        <ol
          aria-label="Tu recorrido en Cumbreal"
          className="hero-steps relative grid grid-cols-3 items-center gap-2 text-xs sm:text-sm text-center text-ink mb-5"
        >
          <li className="flex items-center justify-center gap-2">
            Intereses <ArrowRight size={14} className="shrink-0" aria-hidden="true" />
          </li>
          <li className="flex items-center justify-center gap-2">
            Experiencia <ArrowRight size={14} className="shrink-0" aria-hidden="true" />
          </li>
          <li>Siguiente paso</li>
        </ol>

        <div className="hero-example relative border-t border-ink/25 pt-4 mt-12 max-w-sm mx-auto">
          <h2 className="text-2xl">De una idea a una posibilidad.</h2>
          <p className="text-ink-muted mt-3">
            Crear una página para tu escuela puede ser el primer paso para explorar desarrollo de software.
          </p>
          <a href="#trayectorias" className="text-teal-deep font-medium mt-4">
            Explorar este camino <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
