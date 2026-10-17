'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CumbrealLogo } from './cumbreal-logo';
import { useAuth } from '@/lib/auth-context';
export function Header() { const [open, setOpen] = useState(false); const { isAuthenticated } = useAuth(); return <header className="border-b border-ink/10 bg-canvas">
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
<Link className="hidden sm:inline-flex" href={isAuthenticated ? '/dashboard' : '/login'}>{isAuthenticated ? 'Mi espacio' : 'Ingresar'}</Link>
<Link className="button button-small hidden md:inline-flex" href="/signup">Comenzar</Link>
<button className="icon-button md:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
</div>
</div>{open && <nav id="mobile-navigation" aria-label="Navegación móvil" className="wrap grid pb-5 md:hidden" onClick={() => setOpen(false)}>
<a href="/#metodo">El método</a>
<a href="/#trayectorias">Trayectorias</a>
<Link href="/institutions">Instituciones</Link>
<Link href="/login">Ingresar</Link>
<Link href="/signup">Comenzar</Link>
</nav>}</header>; }
