import Link from 'next/link';
import { Header } from '@/components/cumbreal/header';
import { Footer } from '@/components/cumbreal/footer';
import { Cumbi } from '@/components/cumbreal/cumbi';

const contact = 'mailto:cumbreal.cc@gmail.com?subject=' + encodeURIComponent('Conversación sobre un piloto de Cumbreal') + '&body=' + encodeURIComponent('Hola, equipo de Cumbreal.\n\nInstitución o programa:\nPersona de contacto:\nCantidad y etapa educativa de estudiantes:\nCómo acompañamos la orientación actualmente:\nDisponibilidad para conversar:\n\nMe interesa conocer el alcance y las condiciones propuestas del piloto.');

export default function Institutions() {
  return <>
    <Header />
    <main id="contenido" className="wrap py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-10">
        <section>
          <p className="eyebrow">Para quienes acompañan</p>
          <h1 className="text-5xl mt-4">El progreso merece hacerse visible.</h1>
          <p className="text-ink-muted text-lg mt-6">Conecta intereses, alternativas educativas de El Salvador y un primer proyecto. Buscamos aprender de centros educativos y programas de becas que acompañan a estudiantes.</p>
          <Cumbi state="Leyendo" size={200}/>
        </section>
        <section className="panel self-start" aria-label="Contacto para el piloto">
          <h2 className="text-3xl">Conversemos sobre un piloto</h2>
          <p className="text-ink-muted mt-4">Queremos conocer cómo orientan hoy, qué decisiones necesitan acompañar y qué información les resultaría útil. Una conversación no implica contratar un servicio.</p>
          <a className="button mt-6" href={contact}>Preparar correo sobre el piloto</a>
          <p className="text-sm text-ink-muted mt-4">Se abrirá tu aplicación de correo con un borrador editable. Tú decides cuándo enviarlo. Si no tienes una configurada, escribe a <a href="mailto:cumbreal.cc@gmail.com" className="underline text-teal-deep">cumbreal.cc@gmail.com</a>.</p>
          <p className="text-sm text-ink-muted mt-4">Para esta primera conversación, comparte información general del programa, sin nombres ni expedientes de estudiantes.</p>
          <Link href="/privacy" className="inline-flex items-center min-h-[44px] text-teal-deep underline mt-3">Privacidad del prototipo</Link>
        </section>
      </div>
      <section className="border-t border-ink/15 pt-8 mt-10" aria-label="Acceso y tarifas propuestas">
        <h2 className="text-3xl">Acceso y tarifas propuestas</h2>
        <p className="text-ink-muted mt-4 max-w-3xl">El prototipo se puede explorar gratis y no solicita pagos. Estas condiciones son propuestas para evaluar con instituciones; todavía no hay contratación ni cobro en la plataforma.</p>
        <dl className="grid md:grid-cols-3 gap-8 mt-8">
          <div><dt className="font-semibold text-lg">Exploración inicial</dt><dd className="text-3xl mt-3">Gratis</dd><dd className="text-sm text-ink-muted mt-3">Cuestionario exploratorio, ocho trayectorias, ocupaciones relacionadas y un primer proyecto. El acceso patrocinado tampoco supondría un pago individual del estudiante.</dd></div>
          <div><dt className="font-semibold text-lg">Plan institucional propuesto</dt><dd className="text-3xl mt-3">$500 / mes</dd><dd className="text-sm text-ink-muted mt-3">Cobertura estándar de hasta 100 estudiantes. El acompañamiento y los reportes por cohorte deben acordarse y probarse; el panel institucional todavía no está implementado.</dd></div>
          <div><dt className="font-semibold text-lg">Piloto propuesto</dt><dd className="text-3xl mt-3">$250</dd><dd className="text-sm text-ink-muted mt-3">Propuesta de cuatro semanas para hasta 100 estudiantes, sujeta a acuerdo. Mediríamos comprensión de opciones, primer proyecto y continuidad de uso. Sin renovación automática.</dd></div>
        </dl>
        <p className="text-sm text-ink-muted mt-8">El modelo también contempla una suscripción individual de $5 al mes sin patrocinio, con alcance por definir y validar. No es un precio del cuestionario ni una oferta activa. Las ampliaciones de cobertura requieren una propuesta ajustada a las necesidades y costos de cada institución.</p>
      </section>
    </main>
    <Footer />
  </>;
}
