'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { useProgress } from '@/lib/progress-context';
import { PATHWAYS } from '@/lib/pathways';
import { Cumbi } from '@/components/cumbreal/cumbi';
import { CumbiChat } from '@/components/cumbreal/cumbi-chat';
export default function Overview() {
  const { user } = useAuth();
  const { activities, isLoading } = useProgress();
  const [greeting, setGreeting] = useState('Hola');
  useEffect(() => {
    const h = Number(
      new Intl.DateTimeFormat('en', { hour: 'numeric', hourCycle: 'h23', timeZone: 'America/El_Salvador' }).format(new Date()),
    );
    setGreeting(h < 12 ? 'Buenos días' : h < 18 ? 'Buenas tardes' : 'Buenas noches');
  }, []);
  if (!user) return null;
  const primaryPath = PATHWAYS.find((p) => p.id === user.diagnosis?.selectedPathwayId);
  // One next step, chosen by where the student is; it is the only amber action on the page.
  const next = !user.diagnosis
    ? {
        title: 'Descubre qué te mueve.',
        text: 'Responde 18 actividades para conocer tus intereses y explorar rutas educativas en El Salvador.',
        href: '/onboarding',
        action: 'Comenzar mis 18 actividades',
      }
    : activities.length === 0
      ? {
          title: 'Registra tu primera evidencia.',
          text: primaryPath ? 'Un buen comienzo: ' + primaryPath.starterProject : 'Un proyecto, una tarea o algo que aprendiste por tu cuenta.',
          href: '/dashboard/evidence',
          action: 'Registrar mi primera actividad',
        }
      : {
          title: primaryPath ? primaryPath.title : 'Explora antes de decidir.',
          text: primaryPath ? primaryPath.starterProject : 'Compara trayectorias y elige una para comenzar.',
          href: '/dashboard/pathways',
          action: primaryPath ? 'Ver mi trayectoria' : 'Explorar trayectorias',
        };
  return (
    <>
      <h1 className="text-4xl">
        {greeting}, {user.fullName.split(' ')[0]}.
      </h1>
      <section aria-labelledby="next-step" className="mt-8 border-t-2 border-ink pt-6 max-w-2xl">
        <h2 id="next-step" className="text-3xl">
          {next.title}
        </h2>
        <p className="text-ink-muted mt-3">{next.text}</p>
        <Link href={next.href} className="button mt-5">
          {next.action} <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
      <section className="mt-12">
        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-ink/25 pb-3">
          <h2 className="text-3xl">Lo que estás aprendiendo</h2>
          <Link className="text-teal-deep font-medium" href="/dashboard/evidence">
            <Plus size={18} aria-hidden="true" />
            Registrar actividad
          </Link>
        </div>
        {isLoading ? (
          <p role="status" className="mt-6">
            Cargando tus actividades…
          </p>
        ) : activities.length === 0 ? (
          <div className="flex flex-col sm:flex-row items-center gap-6 py-8">
            <Cumbi state="Leyendo" size={120} className="shrink-0" />
            <p className="text-ink-muted max-w-lg">
              Aún no has registrado evidencias. Tu primera puede ser algo pequeño: un proyecto, una tarea o algo que aprendiste por tu cuenta.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-ink/15">
            {activities.slice(0, 5).map((a) => (
              <li key={a.id} className="py-5 flex flex-wrap justify-between gap-3">
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-ink-muted">
                    {a.skill} · {new Date(a.createdAt).toLocaleDateString('es-SV')}
                  </p>
                </div>
                <span className="text-sm">
                  {a.evidence?.status === 'verified'
                    ? 'Verificada · +100 XP'
                    : a.evidence?.status === 'pending'
                      ? 'En revisión'
                      : a.evidence?.status === 'rejected'
                        ? 'Necesita revisión'
                        : 'Sin evidencia todavía'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <CumbiChat
        context={{
          firstName: user.fullName.split(' ')[0],
          code: user.diagnosis?.code ?? null,
          selectedPathwayId: user.diagnosis?.selectedPathwayId,
          topThree: user.diagnosis?.topThree,
          activityCount: activities.length,
        }}
      />
    </>
  );
}
