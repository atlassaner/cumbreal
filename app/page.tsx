import { Header } from '@/components/cumbreal/header';
import { Hero } from '@/components/cumbreal/hero';
import { Footer } from '@/components/cumbreal/footer';
import { Cumbi, CumbiState } from '@/components/cumbreal/cumbi';
import { PathwayExplorer } from '@/components/cumbreal/pathway-explorer';
const steps: {
    state: CumbiState;
    title: string;
    text: string;
}[] = [
    { state: 'Curioso', title: 'Conócete un poco más', text: 'Un diagnóstico breve para pensar en tus intereses. Un punto de partida, no una etiqueta.' },
    { state: 'Leyendo', title: 'Dale valor a lo que haces', text: 'Registra un proyecto, explica lo que aprendiste y reúne evidencia de tus capacidades.' },
    { state: 'Explorando', title: 'Explora nuevas posibilidades', text: 'Conecta tus aprendizajes con caminos que puedas probar, paso a paso.' }
];
export default function Home() { return <>
<Header />
<main id="contenido">
<Hero />
<section id="metodo" className="bg-canvas-subtle py-14 lg:py-16">
<div className="wrap">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<p className="eyebrow">El método Cumbreal</p>
<h2 className="text-4xl mt-3">Tu recorrido se construye haciendo.</h2>
</div>
<p className="max-w-sm text-ink-muted">No necesitas tener todas las respuestas. Solo un lugar para comenzar.</p>
</div>
<div className="grid md:grid-cols-3 gap-8 mt-10">{steps.map((s, i) => <article key={s.title} className="border-t border-ink/20 pt-4">
<div className="flex justify-between items-center">
<span className="text-sm text-ink-muted">0{i + 1}</span>
<Cumbi state={s.state} size={100}/>
</div>
<h3 className="text-2xl mt-3">{s.title}</h3>
<p className="text-ink-muted mt-3">{s.text}</p>
</article>)}</div>
</div>
</section>
<section id="trayectorias" className="wrap py-16 lg:py-20">
<p className="eyebrow">Explorador de trayectorias</p>
<h2 className="text-4xl mt-3">Hay más de una forma de llegar.</h2>
<p className="text-ink-muted mt-4 max-w-xl">Elige un camino y descubre qué podrías aprender. Empieza con una experiencia pequeña y real.</p>
<PathwayExplorer />
</section>
</main>
<Footer />
</>; }
