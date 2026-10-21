'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useProgress } from '@/lib/progress-context';
import { PATHWAYS } from '@/lib/pathways';
import { progression } from '@/lib/progression';
import { Cumbi } from '@/components/cumbreal/cumbi';
import { Aperture } from '@/components/cumbreal/aperture';
export default function Overview() { const { user } = useAuth(); const { activities, xp, isLoading } = useProgress(); const [greeting, setGreeting] = useState('Hola'); useEffect(() => { const h = Number(new Intl.DateTimeFormat('en', { hour: 'numeric', hourCycle: 'h23', timeZone: 'America/El_Salvador' }).format(new Date())); setGreeting(h < 12 ? 'Buenos días' : h < 18 ? 'Buenas tardes' : 'Buenas noches'); }, []); if (!user)
    return null; const primaryPath = PATHWAYS.find(p => p.id === user.diagnosis?.selectedPathwayId); const total = user.xp + xp, rank = progression(total), verified = activities.filter(a => a.evidence?.status === 'verified'); return <>
<p className="eyebrow">Mi recorrido</p>
<h1 className="text-4xl mt-3">{greeting}, {user.fullName.split(' ')[0]}.</h1>
<p className="text-ink-muted mt-4">Cada experiencia cuenta. Este es el camino que estás construyendo.</p>
<section className="bg-canvas-subtle rounded-xl p-6 mt-8 grid sm:grid-cols-[1fr_auto] gap-6 items-center">
<div>
<p className="text-sm text-ink-muted">Tu progreso real en este prototipo</p>
<p className="text-4xl font-semibold tabular-nums mt-2" data-testid="overview-xp">{total} XP</p>
<p className="mt-2">{rank.name} · Nivel {rank.level}</p>
<p className="text-sm text-ink-muted mt-2">{activities.length} actividades · {verified.length} evidencias verificadas en modo de prueba</p>
</div>
<Aperture level={rank.level} size={90}/>
</section>{!user.diagnosis && <Link href="/onboarding" className="button mt-5">Explorar mis intereses <ArrowUpRight size={18}/>
</Link>}<section className="mt-10">
<div className="flex flex-wrap justify-between items-center gap-3">
<h2 className="text-3xl">Lo que estás aprendiendo</h2>
<Link className="button button-secondary" href="/dashboard/evidence">
<Plus size={18}/>Registrar actividad</Link>
</div>{isLoading ? <p role="status" className="mt-6">Cargando tus actividades…</p> : activities.length === 0 ? <div className="flex flex-col sm:flex-row items-center gap-6 mt-6 border-y border-ink/15 py-8">
<Cumbi state="Leyendo" size={150}/>
<div>
<h3 className="text-2xl">Tu primera evidencia puede ser algo pequeño.</h3>
<p className="text-ink-muted mt-3 max-w-lg">Aún no has registrado evidencias. Comienza con un proyecto, una tarea o algo que aprendiste por tu cuenta.</p>
<Link href="/dashboard/evidence" className="text-teal-deep font-medium mt-3">Registrar mi primera actividad <ArrowUpRight size={16}/>
</Link>
</div>
</div> : <ul className="divide-y divide-ink/15 mt-6">{activities.slice(0, 5).map(a => <li key={a.id} className="py-5 flex flex-wrap justify-between gap-3">
<div>
<p className="font-medium">{a.title}</p>
<p className="text-sm text-ink-muted">{a.skill} · {new Date(a.createdAt).toLocaleDateString('es-SV')}</p>
</div>
<span className="text-sm">{a.evidence?.status === 'verified' ? '✓ Verificada · +100 XP' : a.evidence?.status === 'pending' ? 'En revisión' : a.evidence?.status === 'rejected' ? 'Necesita revisión' : 'Sin evidencia todavía'}</span>
</li>)}</ul>}</section>
<section className="mt-10 border-t border-ink/15 pt-8">
<p className="eyebrow">Tu siguiente posibilidad</p>
<h2 className="text-3xl mt-3">{primaryPath ? primaryPath.title : 'Explora antes de decidir.'}</h2>
<p className="text-ink-muted mt-3 max-w-xl">{primaryPath ? primaryPath.starterProject : 'Responde 18 actividades para conocer tus intereses y explorar rutas educativas en El Salvador.'}</p>
<Link href="/dashboard/pathways" className="button mt-5">Explorar trayectorias <ArrowUpRight size={18}/>
</Link>
</section>
</>; }
