import { HOLLAND_TYPES, HollandType } from './riasec';
import { PATHWAYS } from './pathways';
import type { CumbiState } from '../components/cumbreal/cumbi-artwork';

// shortcut: keyword rules, not a language model; swap reply() for an API call when a real assistant exists.
export interface CumbiContext {
  firstName: string;
  code: string | null;
  selectedPathwayId?: string;
  topThree?: string[];
  activityCount: number;
}
export interface CumbiReply {
  text: string;
  state: CumbiState;
  link?: { href: string; label: string };
}

export const SUGGESTIONS = ['¿Qué significa mi código?', '¿Por dónde empiezo?', '¿Dónde puedo estudiar esto?', 'No sé qué elegir'];

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const has = (q: string, words: string[]) => words.some((w) => q.includes(w));

export function reply(question: string, ctx: CumbiContext): CumbiReply {
  const q = norm(question);
  const path = PATHWAYS.find((p) => p.id === ctx.selectedPathwayId);
  const noDiagnosis = {
    text: 'Todavía no conozco tus intereses. Si respondes las 18 actividades, puedo hablarte de rutas concretas.',
    state: 'Curioso' as const,
    link: { href: '/onboarding', label: 'Comenzar mis 18 actividades' },
  };

  if (has(q, ['hola', 'buenas', 'hey']))
    return { text: 'Hola, ' + ctx.firstName + '. Pregúntame por tus intereses, tu trayectoria o tu siguiente paso.', state: 'Base' };
  if (has(q, ['codigo', 'riasec', 'holland', 'interes', 'perfil', 'significa'])) {
    if (!ctx.code) return noDiagnosis;
    const parts = (ctx.code.split('') as HollandType[]).map((d) => HOLLAND_TYPES[d].name.toLowerCase());
    return {
      text:
        'Tu código es ' + ctx.code + ': lo que más te mueve es lo ' + parts.join(', ') + '. Describe intereses de hoy, no un destino fijo.',
      state: 'Leyendo',
    };
  }
  if (has(q, ['empiezo', 'empezar', 'siguiente', 'proyecto', 'hago', 'paso'])) {
    if (!path) return noDiagnosis;
    if (ctx.activityCount === 0)
      return {
        text: 'Un buen comienzo: ' + path.starterProject,
        state: 'Explorando',
        link: { href: '/dashboard/evidence', label: 'Registrar mi primera actividad' },
      };
    return {
      text:
        'Ya llevas ' +
        ctx.activityCount +
        (ctx.activityCount === 1 ? ' evidencia' : ' evidencias') +
        '. Sigue con ' +
        path.skills.slice(0, 2).join(' y ') +
        '.',
      state: 'Celebrando',
      link: { href: '/dashboard/evidence', label: 'Registrar otra actividad' },
    };
  }
  if (has(q, ['estudiar', 'universidad', 'tecnico', 'carrera', 'donde', 'institucion', 'bachillerato'])) {
    if (!path) return noDiagnosis;
    const o = path.educationalOptions[0];
    return {
      text:
        'Para ' + path.title + ', una opción es ' + o.program + ' en ' + o.institution + '. Confirma la oferta vigente con la institución.',
      state: 'Explorando',
      link: { href: '/dashboard/pathways', label: 'Ver todas las opciones' },
    };
  }
  if (has(q, ['elegir', 'decidir', 'no se', 'duda', 'confund', 'perdid'])) {
    if (!ctx.topThree?.length) return noDiagnosis;
    const names = ctx.topThree.map((id) => PATHWAYS.find((p) => p.id === id)?.title).filter(Boolean);
    return {
      text:
        'No tienes que decidir hoy. Tus tres rutas más cercanas son: ' +
        names.join('; ') +
        '. Prueba un proyecto pequeño de una y mira cómo te sientes.',
      state: 'Curioso',
      link: { href: '/dashboard/pathways', label: 'Comparar trayectorias' },
    };
  }
  if (has(q, ['xp', 'nivel', 'punto', 'evidencia', 'verific']))
    return {
      text: 'Ganas XP cuando registras lo que haces, y más cuando una evidencia se verifica. El nivel sigue tu constancia, no tu talento.',
      state: 'Leyendo',
      link: { href: '/dashboard/evidence', label: 'Mis evidencias' },
    };
  return {
    text: 'Eso aún no lo sé responder. Puedo ayudarte con tu código de intereses, tu trayectoria, dónde estudiar o tu siguiente paso.',
    state: 'Curioso',
  };
}
