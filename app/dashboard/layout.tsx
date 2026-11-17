'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LayoutDashboard, Route, BookOpen, LogOut } from 'lucide-react';
import { CumbiLogo } from '@/components/cumbreal/cumbi-logo';
import { CumbrealLogo } from '@/components/cumbreal/cumbreal-logo';
import { useAuth } from '@/lib/auth-context';
import { useProgress } from '@/lib/progress-context';
import { progression } from '@/lib/progression';
const links = [
  { href: '/dashboard', label: 'Mi recorrido', icon: LayoutDashboard },
  { href: '/dashboard/evidence', label: 'Mis evidencias', icon: BookOpen },
  { href: '/dashboard/pathways', label: 'Explorar trayectorias', icon: Route },
];
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const progress = useProgress();
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false),
    [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => {
    if (!auth.isLoading && !auth.user) router.replace('/login');
  }, [auth.isLoading, auth.user, router]);
  if (auth.isLoading || !auth.user)
    return (
      <main id="contenido" className="wrap py-16" role="status">
        Abriendo tu recorrido…
      </main>
    );
  const total = auth.user.xp + progress.xp;
  const rank = progression(total);
  return (
    <div className="min-h-screen md:grid md:grid-cols-[248px_1fr]">
      <header className="md:hidden flex justify-between items-center px-6 py-4 border-b border-ink/15">
        <Link href="/" className="brand">
          <CumbrealLogo />
        </Link>
        <button
          className="icon-button"
          aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'}
          aria-expanded={open}
          aria-controls="dashboard-sidebar"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <aside
        id="dashboard-sidebar"
        className={
          (open ? 'block ' : 'hidden ') + 'md:block bg-white border-r border-ink/10 p-6 md:sticky md:top-0 md:h-screen overflow-y-auto'
        }
      >
        <Link href="/" className="brand">
          <CumbrealLogo />
        </Link>
        <div className="mt-8 pb-5 border-b border-ink/15">
          <div className="flex items-center gap-3">
            <span role="img" aria-label="Imagen de perfil predeterminada: Cumbi" className="shrink-0">
              <CumbiLogo size={44} />
            </span>
            <p className="font-medium break-words min-w-0">{auth.user.fullName}</p>
          </div>
          <p className="text-sm text-ink-muted mt-1">
            {rank.name} · Nivel {rank.level}
          </p>
          <p className="font-semibold mt-3 tabular-nums" data-testid="sidebar-xp">
            {total} XP
          </p>
          <progress value={rank.percent} max="100" aria-label="Progreso al siguiente nivel" className="w-full h-2 accent-teal-deep" />
          <p className="text-xs text-ink-muted mt-2">{rank.next ? 'Siguiente nivel: ' + rank.next + ' XP' : 'Has llegado a Líder'}</p>
        </div>
        <nav aria-label="Tu espacio" className="grid gap-2 mt-5">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={path === item.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
              className={
                'rounded-lg px-3 py-3 gap-3 ' + (path === item.href ? 'bg-teal-light text-teal-deep font-medium' : 'hover:bg-canvas')
              }
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
          <Link href="/onboarding" className="px-3 py-3">
            Revisar mis intereses
          </Link>
        </nav>
        <div className="grid mt-8 border-t border-ink/15 pt-4">
          <button
            className="text-left flex gap-2 items-center"
            onClick={() => {
              auth.logout();
              router.push('/login');
            }}
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
          <button className="text-sm text-left text-ink-muted" onClick={() => setConfirmDelete(true)}>
            Eliminar mi perfil local
          </button>
          {confirmDelete && (
            <div className="notice mt-3">
              <p>Se eliminarán este perfil y sus actividades de este navegador. Esta acción no se puede deshacer.</p>
              <button
                className="button button-secondary mt-3"
                onClick={() => {
                  auth.deleteLocalData();
                  router.push('/');
                }}
              >
                Eliminar definitivamente
              </button>
              <button className="block mt-2" onClick={() => setConfirmDelete(false)}>
                Cancelar
              </button>
            </div>
          )}
        </div>
      </aside>
      <main id="contenido" className="min-w-0 p-6 lg:p-10 max-w-6xl w-full mx-auto">
        {progress.error && (
          <p className="notice mb-5" role="alert">
            {progress.error}
          </p>
        )}
        {children}
      </main>
    </div>
  );
}
