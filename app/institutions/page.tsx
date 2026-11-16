import Link from 'next/link';
import { Header } from '@/components/cumbreal/header';
import { Footer } from '@/components/cumbreal/footer';
import { Cumbi } from '@/components/cumbreal/cumbi';
import { PricingSection } from '@/components/cumbreal/pricing-section';

const contact =
  'mailto:cumbreal.cc@gmail.com?subject=' +
  encodeURIComponent('Conversación sobre un piloto de Cumbreal') +
  '&body=' +
  encodeURIComponent(
    'Hola, equipo de Cumbreal.\n\nInstitución o programa:\nPersona de contacto:\nCantidad y etapa educativa de estudiantes:\nCómo acompañamos la orientación actualmente:\nDisponibilidad para conversar:\n\nMe interesa conocer el alcance y las condiciones propuestas del piloto.',
  );

export default function Institutions() {
  return (
    <>
      <Header />
      <main id="contenido" className="wrap py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10">
          <section>
            <h1 className="text-5xl mt-4">El progreso merece hacerse visible.</h1>
            <p className="text-ink-muted text-lg mt-6">
              Conecta intereses, alternativas educativas de El Salvador y un primer proyecto. Buscamos aprender de centros educativos y
              programas de becas que acompañan a estudiantes.
            </p>
            <Cumbi state="Leyendo" size={200} />
          </section>
          <section className="panel self-start" aria-label="Contacto para el piloto">
            <h2 className="text-3xl">Conversemos sobre un piloto</h2>
            <p className="text-ink-muted mt-4">
              Queremos conocer cómo orientan hoy, qué decisiones necesitan acompañar y qué información les resultaría útil. Una conversación
              no implica contratar un servicio.
            </p>
            <a className="button mt-6" href={contact}>
              Preparar correo sobre el piloto
            </a>
            <p className="text-sm text-ink-muted mt-4">
              Se abrirá tu aplicación de correo con un borrador editable. Tú decides cuándo enviarlo. Si no tienes una configurada, escribe
              a{' '}
              <a href="mailto:cumbreal.cc@gmail.com" className="underline text-teal-deep">
                cumbreal.cc@gmail.com
              </a>
              .
            </p>
            <p className="text-sm text-ink-muted mt-4">
              Para esta primera conversación, comparte información general del programa, sin nombres ni expedientes de estudiantes.
            </p>
            <Link href="/privacy" className="inline-flex items-center min-h-[44px] text-teal-deep underline mt-3">
              Privacidad del prototipo
            </Link>
          </section>
        </div>
        <PricingSection contactHref={contact} />
      </main>
      <Footer />
    </>
  );
}
