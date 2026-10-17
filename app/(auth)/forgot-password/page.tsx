'use client';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
export default function Recovery() { const [submitted, setSubmitted] = useState(false); function submit(e: FormEvent) { e.preventDefault(); setSubmitted(true); } return <>
<p className="eyebrow">Recuperación de acceso</p>
<h1 className="text-3xl mt-3">Volvamos a encontrar tu camino.</h1>
<p className="text-ink-muted mt-4">La recuperación por correo todavía no está conectada. Este formulario no enviará un mensaje ni cambiará tu contraseña local.</p>
<form onSubmit={submit} className="space-y-4 mt-6">
<label htmlFor="recovery-email" className="field-label">Correo electrónico</label>
<input id="recovery-email" className="field" type="email" autoComplete="email" required/>
<button className="button w-full">Consultar opciones de acceso</button>
</form>{submitted && <p role="status" className="notice mt-4">No se ha enviado ningún correo. Puedes volver a ingresar si recuerdas tu contraseña o crear otro perfil local con un correo diferente.</p>}<Link className="text-teal-deep mt-5" href="/login">Volver a ingresar</Link>
</>; }
