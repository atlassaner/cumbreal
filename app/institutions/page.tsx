'use client';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/cumbreal/header';
import { Footer } from '@/components/cumbreal/footer';
import { Cumbi } from '@/components/cumbreal/cumbi';
export default function Institutions() { const [sent, setSent] = useState(false); function submit(e: FormEvent) { e.preventDefault(); setSent(true); } return <>
<Header />
<main id="contenido" className="wrap grid lg:grid-cols-2 gap-10 py-12 lg:py-20">
<section>
<p className="eyebrow">Para quienes acompañan</p>
<h1 className="text-5xl mt-4">El progreso merece hacerse visible.</h1>
<p className="text-ink-muted text-lg mt-6">Un espacio para conectar actividades, evidencias y conversaciones sobre el futuro. Estamos construyendo Cumbreal junto a la comunidad educativa de El Salvador.</p>
<Cumbi state="Leyendo" size={200}/>
<p className="text-ink-muted">Buscamos aprender de escuelas, universidades y programas que acompañan a estudiantes.</p>
</section>
<section className="panel self-start">
<h2 className="text-3xl">Exploremos un piloto.</h2>
<p className="notice mt-4">Formulario de demostración: el canal de contacto aún no está conectado. No se enviará ni guardará tu información.</p>
<form onSubmit={submit} className="space-y-5 mt-6">
<div>
<label className="field-label" htmlFor="institution-name">Tu nombre</label>
<input className="field" id="institution-name" autoComplete="name" required/>
</div>
<div>
<label className="field-label" htmlFor="institution-email">Correo institucional</label>
<input className="field" id="institution-email" type="email" autoComplete="email" required/>
</div>
<div>
<label className="field-label" htmlFor="institution-organization">Institución o programa</label>
<input className="field" id="institution-organization" autoComplete="organization" required/>
</div>
<div>
<label className="field-label" htmlFor="institution-population">¿A quiénes acompañan?</label>
<textarea className="field" id="institution-population" rows={3} required/>
</div>
<button className="button w-full">Probar el formulario</button>
</form>{sent && <p role="status" className="notice mt-4">Prueba completada. Tus datos no se han enviado ni guardado. Publicaremos un canal real cuando el piloto esté disponible.</p>}<Link href="/privacy" className="text-teal-deep mt-4">Privacidad del prototipo</Link>
</section>
</main>
<Footer />
</>; }
