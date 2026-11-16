export interface OccupationExample {
  title: string;
  preparation: string;
}

export interface OccupationalContext {
  occupations: OccupationExample[];
  independentPath?: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceNote?: string;
}

export const OCCUPATIONS_REVIEWED_AT = '2026-10-20';

// Editorial examples from Salvadoran graduate profiles, not vacancies or a
// second matching algorithm. Preparation summarizes learning, not hiring rules.
export const OCCUPATIONAL_CONTEXT: Record<string, OccupationalContext | undefined> = {
  software: {
    occupations: [
      {
        title: 'Desarrollo de aplicaciones web',
        preparation: 'Programación, interfaces y bases de datos; practica construyendo y explicando una aplicación.',
      },
      {
        title: 'Desarrollo de sistemas de información',
        preparation: 'Análisis de necesidades, programación y organización de datos para resolver un problema.',
      },
      {
        title: 'Soporte de software',
        preparation: 'Sistemas operativos, diagnóstico de problemas y comunicación con las personas usuarias.',
      },
    ],
    independentPath: 'Explora servicios web para negocios u organizaciones. Define alcance, costos y mantenimiento antes de ofrecerlos.',
    sourceLabel: 'ITCA-FEPADE · Desarrollo de Software',
    sourceUrl: 'https://www.itca.edu.sv/carreras/ingenieria-de-desarrollo-de-software/',
  },
  health: {
    occupations: [
      {
        title: 'Enfermería en hospitales o clínicas',
        preparation: 'Formación en enfermería, práctica clínica supervisada y preparación para el cuidado de pacientes.',
      },
      {
        title: 'Enfermería en centros de atención de personas mayores',
        preparation: 'Cuidado integral, comunicación y trabajo con equipos de salud.',
      },
      {
        title: 'Enfermería en organizaciones comunitarias',
        preparation: 'Promoción de la salud, prevención y educación de personas y familias.',
      },
    ],
    sourceLabel: 'IEPROES · Técnico en Enfermería',
    sourceUrl: 'https://www.ieproes.edu.sv/tecnico-en-enfermeria/',
    sourceNote:
      'Estos ejemplos requieren formación profesional. Una infografía o un perfil de intereses no habilitan para atender pacientes; confirma los requisitos de ejercicio con la institución y la autoridad competente.',
  },
  design: {
    occupations: [
      { title: 'Diseño gráfico', preparation: 'Comunicación visual y herramientas de diseño; reúne piezas y explica tu proceso creativo.' },
      { title: 'Ilustración', preparation: 'Composición, dibujo y desarrollo de propuestas visuales para distintos públicos.' },
      { title: 'Creación de contenidos multimedia', preparation: 'Producción de contenidos digitales y uso de tecnologías de diseño.' },
    ],
    independentPath: 'Explora encargos de identidad visual o contenidos. Un portafolio puede mostrar qué sabes hacer y cómo trabajas.',
    sourceLabel: 'UDB · Técnico en Diseño Gráfico',
    sourceUrl: 'https://www.udb.edu.sv/udb/carreras/carrera/tecnico_en_diseno_grafico',
  },
  energy: {
    occupations: [
      {
        title: 'Instalación y mantenimiento de sistemas solares',
        preparation: 'Formación técnica, medición y aplicación de normas de seguridad en sistemas fotovoltaicos.',
      },
      {
        title: 'Operación de sistemas de energía renovable',
        preparation: 'Funcionamiento de equipos, mantenimiento y seguimiento del rendimiento energético.',
      },
      {
        title: 'Asesoría en eficiencia energética',
        preparation: 'Evaluación del consumo y diseño de propuestas de ahorro con formación especializada.',
      },
    ],
    independentPath:
      'Con formación técnica y las condiciones de seguridad necesarias, explora servicios o proyectos de energías renovables.',
    sourceLabel: 'ITCA-FEPADE · Energías Renovables',
    sourceUrl: 'https://www.itca.edu.sv/portal-nuevo-ingreso/carrerastecnicas/tecnico-renovables.html',
  },
  business: {
    occupations: [
      {
        title: 'Asistencia administrativa',
        preparation: 'Organización de recursos, herramientas de información y comunicación dentro de una organización.',
      },
      {
        title: 'Planificación y ejecución de proyectos',
        preparation: 'Presupuestos, planificación y evaluación de proyectos empresariales o sociales.',
      },
      {
        title: 'Gestión de operaciones',
        preparation: 'Análisis de procesos y coordinación de recursos; la responsabilidad depende de la formación y experiencia.',
      },
    ],
    independentPath: 'Explora un negocio propio: contrasta una necesidad con clientes y prepara un modelo de negocio antes de invertir.',
    sourceLabel: 'UCA · Administración de Empresas',
    sourceUrl: 'https://uca.edu.sv/admisiones/carrera/licenciatura-en-administracion-de-empresas-semipresencial/',
  },
  agriculture: {
    occupations: [
      { title: 'Producción agropecuaria', preparation: 'Formación agronómica y práctica en cultivos, suelos y uso de recursos.' },
      { title: 'Gestión de unidades agropecuarias', preparation: 'Planificación, administración y seguimiento de procesos productivos.' },
      { title: 'Producción agroindustrial', preparation: 'Procesamiento de alimentos y manejo técnico de procesos agroindustriales.' },
    ],
    independentPath: 'Explora un proyecto productivo a pequeña escala, con estimaciones de agua, costos y posibles compradores.',
    sourceLabel: 'ENA · Perfil profesional y plan de estudios',
    sourceUrl: 'https://ena.edu.sv/wp-content/uploads/2022/07/Cat%C3%A1logo-informativo-ENA-2023.pdf',
    sourceNote:
      'Referencia histórica: catálogo 2023, perfil de egreso y plan de estudios. Los ejemplos son una síntesis editorial; confirma la oferta y los requisitos actuales con ENA.',
  },
  tourism: {
    occupations: [
      {
        title: 'Recepción y asistencia hotelera',
        preparation: 'Atención al huésped, organización de servicios y herramientas de gestión turística.',
      },
      { title: 'Asistencia en agencias de viajes', preparation: 'Diseño de itinerarios, comunicación y coordinación de servicios.' },
      { title: 'Organización de eventos turísticos', preparation: 'Logística, presupuesto y atención a participantes.' },
    ],
    independentPath: 'Explora experiencias turísticas locales, considerando patrimonio, accesibilidad, seguridad y costos.',
    sourceLabel: 'ITCA-FEPADE · Hotelería y Turismo',
    sourceUrl: 'https://www.itca.edu.sv/portal-nuevo-ingreso/carrerastecnicas/hoteleria-turismo.html',
  },
  logistics: {
    occupations: [
      {
        title: 'Asistencia de operaciones logísticas',
        preparation: 'Organización del transporte, distribución y seguimiento de mercancías.',
      },
      {
        title: 'Gestión de inventarios y almacenamiento',
        preparation: 'Control de existencias, costos y sistemas de información logística.',
      },
      {
        title: 'Asistencia de importación y exportación',
        preparation: 'Documentación de comercio exterior y aprendizaje de la normativa aplicable.',
      },
    ],
    independentPath:
      'Explora servicios de organización de entregas o inventarios para negocios locales, con costos y responsabilidades definidos.',
    sourceLabel: 'ITCA-FEPADE · Logística Global',
    sourceUrl: 'https://www.itca.edu.sv/portal-nuevo-ingreso/carrerastecnicas/superior-logistica.html',
  },
};
