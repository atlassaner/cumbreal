import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

type PricingSectionProps = {
  contactHref: string;
};

const plans = [
  {
    id: 'exploracion',
    audience: 'Para estudiantes',
    name: 'Exploración inicial',
    price: 'Gratis',
    period: 'Acceso al prototipo',
    description:
      'Cuestionario exploratorio, ocho trayectorias, ocupaciones relacionadas y un primer proyecto. El acceso patrocinado tampoco supondría un pago individual del estudiante.',
    features: ['Explora tus intereses', 'Descubre ocho trayectorias', 'Empieza un primer proyecto'],
    action: 'Explorar mis intereses',
  },
  {
    id: 'piloto',
    audience: 'Para aprender juntos',
    name: 'Piloto propuesto',
    price: '$250',
    period: 'Cuatro semanas · hasta 100 estudiantes',
    description:
      'Propuesta de cuatro semanas para hasta 100 estudiantes, sujeta a acuerdo. Mediríamos comprensión de opciones, primer proyecto y continuidad de uso. Sin renovación automática.',
    features: ['Alcance sujeto a acuerdo', 'Medición propuesta de comprensión y uso', 'Sin renovación automática'],
    action: 'Conversar sobre el piloto',
  },
  {
    id: 'institucional',
    audience: 'Para instituciones',
    name: 'Plan institucional propuesto',
    price: '$500',
    period: 'Al mes · hasta 100 estudiantes',
    description:
      'Cobertura estándar de hasta 100 estudiantes. El acompañamiento y los reportes por cohorte deben acordarse y probarse; el panel institucional todavía no está implementado.',
    features: ['Cobertura estándar: hasta 100 estudiantes', 'Acompañamiento y reportes por acordar', 'Panel institucional pendiente'],
    action: 'Consultar el alcance',
  },
] as const;

export function PricingSection({ contactHref }: PricingSectionProps) {
  return (
    <section id="precios" className="border-t border-ink/15 pt-10 mt-12 lg:pt-12 lg:mt-16" aria-label="Acceso y tarifas propuestas">
      <div className="max-w-3xl">
        <h2 className="text-3xl sm:text-4xl">Acceso y tarifas propuestas</h2>
        <p className="text-ink mt-5 border-t border-ink/15 pt-4">
          El prototipo se puede explorar gratis y no solicita pagos. Estas condiciones son propuestas para evaluar con instituciones;
          todavía no hay contratación ni cobro en la plataforma.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3 mt-8">
        {plans.map((plan) => (
          <article
            key={plan.id}
            aria-labelledby={`plan-${plan.id}`}
            className={
              'pricing-card flex flex-col border-t-2 pt-6 ' +
              (plan.id === 'piloto' ? 'border-amber-dark' : 'border-ink/25')
            }
          >
            <h3 id={`plan-${plan.id}`} className="text-2xl lg:min-h-[3.45rem]">
              {plan.name}
            </h3>
            <p className="annotation mt-1">{plan.audience}</p>
            <div className="border-t border-ink/15 mt-5 pt-6">
              <p className="text-5xl leading-none tracking-tight tabular-nums">{plan.price}</p>
              <p className="text-sm text-ink-muted mt-3">{plan.period}</p>
            </div>
            <p className="text-sm text-ink-muted mt-5">{plan.description}</p>
            <ul className="mt-6 mb-7 border-t border-ink/15">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 border-b border-ink/15 py-3 text-sm">
                  {plan.id === 'exploracion' ? (
                    <Check size={17} aria-hidden="true" className="text-teal-deep shrink-0 mt-1" />
                  ) : (
                    <ArrowRight size={17} aria-hidden="true" className="text-teal-deep shrink-0 mt-1" />
                  )}
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {plan.id === 'exploracion' ? (
              <Link href="/onboarding" className="button button-secondary mt-auto w-full">
                {plan.action}
                <ArrowRight size={17} aria-hidden="true" className="shrink-0" />
              </Link>
            ) : (
              <a href={contactHref} className={'button mt-auto w-full ' + (plan.id === 'piloto' ? '' : 'button-secondary')}>
                {plan.action}
                <ArrowRight size={17} aria-hidden="true" className="shrink-0" />
              </a>
            )}
          </article>
        ))}
      </div>

      <p className="text-sm text-ink-muted mt-7 max-w-4xl">
        El modelo también contempla una suscripción individual de $5 al mes sin patrocinio, con alcance por definir y validar. No es un
        precio del cuestionario ni una oferta activa. Las ampliaciones de cobertura requieren una propuesta ajustada a las necesidades y
        costos de cada institución.
      </p>
    </section>
  );
}
