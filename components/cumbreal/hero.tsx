import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Cumbi } from './cumbi';
export function Hero() { return <section className="wrap grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-16 items-center py-12 lg:py-20">
<div>
<p className="eyebrow">Un camino que empieza contigo</p>
<h1 className="text-5xl lg:text-[64px] mt-4 max-w-xl">Descubre el rumbo de tu aprendizaje.</h1>
<p className="text-ink-muted text-lg mt-6 max-w-lg">Lo que aprendes puede abrir nuevos caminos. Reconoce tus intereses, reúne evidencias y explora tu siguiente paso con Cumbi.</p>
<Link href="/onboarding" className="button mt-8">Explorar mis intereses <ArrowRight size={18}/>
</Link>
<p className="text-sm text-ink-muted mt-5">Diseñado para estudiantes e instituciones de El Salvador.</p>
</div>
<div className="hero-scene">
<div className="scene-ridge" aria-hidden="true"/>
<Cumbi size={250} state="Base" className="relative mx-auto"/>
<div className="relative bg-white p-6 rounded-xl shadow-elevated max-w-sm mx-auto -mt-2">
<p className="eyebrow">Un ejemplo de tu recorrido</p>
<h2 className="text-2xl mt-3">De una idea a una posibilidad.</h2>
<p className="text-ink-muted mt-3">Crear una página para tu escuela puede ser el primer paso para explorar desarrollo de software.</p>
<a href="#trayectorias" className="text-teal-deep font-medium mt-4">Explorar este camino <ArrowRight size={16}/>
</a>
</div>
</div>
</section>; }
