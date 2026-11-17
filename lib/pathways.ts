import { hollandCode, RIASECVector } from './riasec';
export interface EducationalOption {
  level: 'BTV' | 'Técnico' | 'Universidad';
  program: string;
  institution: string;
  sourceUrl: string;
  note?: string;
}
export interface Pathway {
  id: string;
  title: string;
  domain: string;
  hollandCode: string;
  riasecVector: RIASECVector;
  description: string;
  educationalOptions: EducationalOption[];
  starterProject: string;
  evidence: string;
  skills: string[];
}
export const CATALOG_VERSION = 'sv-2026-10-15-v1';
export const CATALOG_REVIEWED_AT = '2026-10-15';
const mined = 'https://www.mined.gob.sv/0000/00/00/oferta-academica-del-bachillerato-tecnico-vocacional/';
const itca = 'https://www.itca.edu.sv/portal-nuevo-ingreso/carreras-tecnicas.html';
const ues = 'https://eel.ues.edu.sv/ingreso/ingreso/index/categoria/415';
const uca = 'https://uca.edu.sv/charlas-informativas-de-carreras/';
const udb = 'https://www.udb.edu.sv/udb/pagina/nuevoingreso/programa_orientacion_carrera';
const btv = (program: string): EducationalOption => ({
  level: 'BTV',
  program,
  institution: 'MINED · consultar centros educativos',
  sourceUrl: mined,
  note: 'Catálogo publicado en 2020. Confirma la oferta actual y el centro con MINED.',
});
const option = (
  level: 'Técnico' | 'Universidad',
  program: string,
  institution: string,
  sourceUrl: string,
  note?: string,
): EducationalOption => ({ level, program, institution, sourceUrl, note });
// Editorial centroids supplied in the specification, not occupational norms.
const catalog: Omit<Pathway, 'hollandCode'>[] = [
  {
    id: 'software',
    title: 'Desarrollo de software y web',
    domain: 'Tecnología',
    riasecVector: [0.2, 0.9, 0.4, 0.1, 0.3, 0.8],
    description: 'Construye herramientas digitales para escuelas, negocios y organizaciones de tu comunidad.',
    educationalOptions: [
      btv('Desarrollo de Software'),
      option('Técnico', 'Técnico en Ingeniería de Desarrollo de Software', 'ITCA-FEPADE', itca),
      option('Universidad', 'Ingeniería de Sistemas Informáticos', 'UES', ues),
    ],
    starterProject: 'Crea una página web informativa para un negocio o escuela de tu municipio.',
    evidence: 'Una página funcional, capturas y una explicación de las decisiones que tomaste.',
    skills: ['Lógica', 'Programación', 'Diseño de interfaces'],
  },
  {
    id: 'health',
    title: 'Salud comunitaria y enfermería',
    domain: 'Salud',
    riasecVector: [0.3, 0.7, 0.1, 0.9, 0.3, 0.5],
    description: 'Explora el cuidado de las personas, la prevención y la educación en salud de tu comunidad.',
    educationalOptions: [
      btv('Atención Primaria en Salud'),
      option('Técnico', 'Técnico en Enfermería', 'IEPROES', 'https://www.ieproes.edu.sv/cursos/tecnico-en-enfermeria/'),
      option('Universidad', 'Licenciatura en Enfermería', 'UES', ues),
    ],
    starterProject:
      'Diseña una infografía sobre prevención y un directorio de servicios de salud de tu comunidad; revisa las fuentes con tu docente.',
    evidence: 'Infografía, fuentes consultadas y comentarios de la revisión; no necesitas atender pacientes.',
    skills: ['Escucha', 'Educación en salud', 'Trabajo en equipo'],
  },
  {
    id: 'design',
    title: 'Diseño digital y comunicación multimedia',
    domain: 'Diseño y comunicación',
    riasecVector: [0.1, 0.3, 0.9, 0.4, 0.6, 0.2],
    description: 'Da forma visual y narrativa a las ideas de marcas, colectivos y causas locales.',
    educationalOptions: [
      btv('Diseño Gráfico · opción articulada'),
      option('Técnico', 'Técnico en Diseño Gráfico', 'UDB', udb),
      option('Universidad', 'Licenciatura en Comunicación Social', 'UCA', uca),
    ],
    starterProject: 'Diseña la identidad visual, con logotipo y colores, para una marca o causa local.',
    evidence: 'Bocetos, propuesta visual y una explicación de a quién se dirige.',
    skills: ['Creatividad', 'Comunicación visual', 'Narrativa'],
  },
  {
    id: 'energy',
    title: 'Electrotecnia, mecatrónica y energías renovables',
    domain: 'Industria y energía',
    riasecVector: [0.9, 0.7, 0.1, 0.1, 0.3, 0.6],
    description: 'Comprende sistemas eléctricos y automatizados, y explora el uso eficiente de la energía.',
    educationalOptions: [
      btv('Sistemas Eléctricos'),
      option('Técnico', 'Técnico en Energías Renovables', 'ITCA-FEPADE', itca),
      option('Universidad', 'Ingeniería Eléctrica', 'UDB', 'https://www.udb.edu.sv/udb/carreras/carrera/ingenieria_electrica'),
    ],
    starterProject: 'Dibuja o simula un circuito con sensor para ahorrar luz, sin intervenir instalaciones eléctricas.',
    evidence: 'Diagrama o simulación, lista de componentes y registro de pruebas.',
    skills: ['Electrónica', 'Experimentación', 'Resolución de problemas'],
  },
  {
    id: 'business',
    title: 'Administración, finanzas y emprendimiento',
    domain: 'Negocios',
    riasecVector: [0.1, 0.3, 0.2, 0.6, 0.9, 0.8],
    description: 'Planifica recursos y convierte una idea de negocio o iniciativa comunitaria en un proyecto organizado.',
    educationalOptions: [
      btv('Administrativo Contable'),
      option('Técnico', 'Técnico en Mercadeo o Técnico en Contaduría', 'UCA', uca),
      option(
        'Universidad',
        'Licenciatura en Administración de Empresas',
        'UCA',
        'https://uca.edu.sv/admisiones/carrera/licenciatura-en-administracion-de-empresas-semipresencial/',
      ),
    ],
    starterProject: 'Crea un presupuesto y una estructura de precios para un producto emprendedor con cifras simuladas.',
    evidence: 'Hoja de cálculo con costos, precios y supuestos explicados.',
    skills: ['Planificación', 'Análisis de costos', 'Liderazgo'],
  },
  {
    id: 'agriculture',
    title: 'Agroindustria sostenible y ciencias ambientales',
    domain: 'Agricultura y ambiente',
    riasecVector: [0.9, 0.7, 0.1, 0.3, 0.4, 0.4],
    description: 'Explora soluciones para cultivar, transformar alimentos y cuidar los recursos naturales.',
    educationalOptions: [
      btv('Agropecuario o Agroindustria'),
      option(
        'Técnico',
        'Agrónomo en el Grado de Técnico',
        'ENA · Ciudad Arce',
        'https://ena.edu.sv/wp-content/uploads/2025/07/CATALOGO-INFORMATIVO-NUEVO-INGRESO-A%C3%91O-2026-ACTUALIZADO-11062025.pdf',
        'El catálogo 2026 indica 3 años; no todos los técnicos duran 2 años.',
      ),
      option('Universidad', 'Ingeniería Agronómica', 'UES', ues),
    ],
    starterProject: 'Formula una propuesta de riego eficiente para un huerto casero y compara el consumo de agua.',
    evidence: 'Diseño del huerto, mediciones o estimaciones y propuesta de mejora.',
    skills: ['Observación', 'Gestión ambiental', 'Experimentación'],
  },
  {
    id: 'tourism',
    title: 'Turismo sostenible y gestión cultural',
    domain: 'Turismo y cultura',
    riasecVector: [0.4, 0.2, 0.6, 0.9, 0.7, 0.3],
    description: 'Crea experiencias que conecten a las personas con la cultura y los paisajes de El Salvador.',
    educationalOptions: [
      btv('Servicios Turísticos'),
      option('Técnico', 'Técnico en Hotelería y Turismo', 'ITCA-FEPADE', itca),
      option(
        'Universidad',
        'Licenciatura en Administración y Gestión de Destinos Turísticos',
        'UFG',
        'https://ufg.edu.sv/carreras/licenciatura-en-administracion-y-gestion-de-destinos-turisticos',
      ),
    ],
    starterProject: 'Diseña un itinerario ecológico y cultural de un día en tu región, con presupuesto y accesibilidad.',
    evidence: 'Mapa, itinerario, presupuesto estimado y fuentes locales consultadas.',
    skills: ['Comunicación', 'Organización', 'Interpretación cultural'],
  },
  {
    id: 'logistics',
    title: 'Logística, aduanas y análisis operativo',
    domain: 'Logística',
    riasecVector: [0.4, 0.5, 0.1, 0.2, 0.7, 0.9],
    description: 'Organiza inventarios, información y rutas para que los productos lleguen a su destino.',
    educationalOptions: [
      btv('Logística y Aduanas'),
      option('Técnico', 'Técnico Superior en Logística Global', 'ITCA-FEPADE', itca),
      option('Universidad', 'Ingeniería Industrial', 'UCA', uca),
    ],
    starterProject: 'Simula una ruta de distribución y un control de inventarios para una tienda de tu municipio.',
    evidence: 'Tabla de inventario, mapa de ruta y comparación de dos alternativas.',
    skills: ['Organización', 'Análisis operativo', 'Precisión'],
  },
];
export const PATHWAYS: Pathway[] = catalog.map((path) => ({ ...path, hollandCode: hollandCode(path.riasecVector) }));
