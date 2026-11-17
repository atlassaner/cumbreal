'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CumbrealLogo } from './cumbreal-logo';
import { useAuth } from '@/lib/auth-context';

export function Header() {
  const [open, setOpen] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const { isAuthenticated } = useAuth();

  return (
    <header
      className="border-b border-ink/10 bg-canvas"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          setOpen(false);
          menuToggle.current?.focus();
        }
      }}
    >
      <div className="wrap flex min-h-[80px] items-center justify-between gap-4">
        <Link href="/" className="brand">
          <CumbrealLogo />
        </Link>
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-7">
          <a href="/#metodo">El método</a>
          <a href="/#trayectorias">Trayectorias</a>
          <Link href="/institutions">Instituciones</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link className="hidden sm:inline-flex" href={isAuthenticated ? '/dashboard' : '/login'}>
            {isAuthenticated ? 'Mi espacio' : 'Ingresar'}
          </Link>
          <Link className="button button-small hidden md:inline-flex" href="/signup">
            Comenzar
          </Link>
          <button
            ref={menuToggle}
            type="button"
            className="icon-button md:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Navegación móvil"
        className={'wrap pb-5 md:hidden ' + (open ? 'grid' : 'hidden')}
        hidden={!open}
        onClick={() => setOpen(false)}
      >
        <a href="/#metodo">El método</a>
        <a href="/#trayectorias">Trayectorias</a>
        <Link href="/institutions">Instituciones</Link>
        <Link href="/login">Ingresar</Link>
        <Link href="/signup">Comenzar</Link>
      </nav>
    </header>
  );
}
