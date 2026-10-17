import { CATALOG_VERSION, PATHWAYS, Pathway } from './pathways';
import { DIMENSIONS, hollandCode, HollandType, rankedDimensions, RIASECVector } from './riasec';
export { DIMENSIONS, HOLLAND_TYPES } from './riasec';
export type { RIASECVector } from './riasec';
export const DIAGNOSIS_VERSION = 'riasec-18-v1';
export const GUEST_DIAGNOSIS_KEY = 'cumbreal_diagnosis_guest_v1';
export const LIKERT_OPTIONS = ['Me desagrada mucho', 'No me interesa', 'Me da igual / Neutral', 'Me interesa', 'Me entusiasma mucho'];
const prompts = [
  'Armar, desarmar o reparar aparatos electrónicos, motores o instalaciones eléctricas.',
  'Trabajar en el campo, cultivos agrícolas o con animales y recursos naturales.',
  'Construir maquetas, estructuras físicas o utilizar herramientas de taller.',
  'Investigar el origen de un fenómeno científico o entender cómo funciona una enfermedad.',
  'Analizar datos numéricos, estadísticas o gráficos para resolver un misterio o problema.',
  'Aprender a programar algoritmos o descifrar fórmulas matemáticas complejas.',
  'Diseñar logotipos, publicaciones para redes sociales, ilustraciones o animaciones.',
  'Escribir historias, guiones, artículos de opinión o componer música.',
  'Idear conceptos visuales innovadores para marcas, ropa o espacios arquitectónicos.',
  'Enseñar a otros un tema difícil o apoyar a niños y jóvenes en sus tareas escolares.',
  'Brindar primeros auxilios, cuidar personas enfermas o promover la salud comunitaria.',
  'Escuchar los problemas de las personas y orientarlas para encontrar soluciones.',
  'Liderar un equipo de trabajo, organizar un evento o coordinar un proyecto grupal.',
  'Convencer a otras personas sobre una idea o vender productos y servicios.',
  'Iniciar un negocio propio, calcular ganancias y asumir riesgos financieros.',
  'Llevar un control estricto de presupuestos, facturas, compras y gastos.',
  'Organizar inventarios, clasificar documentos y mantener bases de datos actualizadas.',
  'Seguir manuales, protocolos de seguridad o normas legales con máxima precisión.',
];
export const QUESTIONS = prompts.map((text, i) => ({ id: 'Q' + (i + 1), dimension: DIMENSIONS[Math.floor(i / 3)], text }));
export type Answers = Record<string, number>;
export interface TrajectoryMatchResult {
  pathwayId: string;
  similarity: number;
  matchScore: number;
  sharedDimensions: HollandType[];
}
export interface DiagnosisResult {
  version: typeof DIAGNOSIS_VERSION;
  catalogVersion: string;
  answers: Answers;
  vector: RIASECVector;
  code: string | null;
  tied: boolean;
  status: 'differentiated' | 'flat' | 'no-interest' | 'low-interest';
  matches: TrajectoryMatchResult[];
  topThree: string[];
  wildcardId: string | null;
  wildcardDimension: HollandType | null;
  selectedPathwayId: string;
  completedAt: string;
}
export function calculateRIASEC(answers: Answers): RIASECVector {
  if (!answers || typeof answers !== 'object' || Object.keys(answers).length !== QUESTIONS.length || QUESTIONS.some(q => !Number.isInteger(answers[q.id]) || answers[q.id] < 1 || answers[q.id] > 5)) {
    throw new Error('Responde las 18 actividades con un valor del 1 al 5.');
  }
  return DIMENSIONS.map(d => (QUESTIONS.filter(q => q.dimension === d).reduce((sum, q) => sum + answers[q.id], 0) - 3) / 12) as RIASECVector;
}
export function cosineSimilarity(v1: number[], v2: number[]): number {
  if (!v1.length || v1.length !== v2.length || [...v1, ...v2].some(n => !Number.isFinite(n) || n < 0)) throw new Error('Los vectores deben tener igual longitud y valores finitos no negativos.');
  const norm = (v: number[]) => Math.sqrt(v.reduce((sum, n) => sum + n * n, 0));
  const denominator = norm(v1) * norm(v2);
  if (!denominator) return 0;
  return Math.min(1, Math.max(0, v1.reduce((sum, n, i) => sum + n * v2[i], 0) / denominator));
}
export function matchTrajectories(userVector: RIASECVector, catalog: Pathway[]): TrajectoryMatchResult[] {
  if (userVector.length !== 6 || userVector.some(n => !Number.isFinite(n) || n < 0 || n > 1)) throw new Error('Vector RIASEC inválido.');
  return catalog.map(path => {
    const similarity = cosineSimilarity(userVector, path.riasecVector);
    const sharedDimensions = [...DIMENSIONS].sort((a, b) => userVector[DIMENSIONS.indexOf(b)] * path.riasecVector[DIMENSIONS.indexOf(b)] - userVector[DIMENSIONS.indexOf(a)] * path.riasecVector[DIMENSIONS.indexOf(a)]).filter(d => userVector[DIMENSIONS.indexOf(d)] > 0).slice(0, 2);
    return { pathwayId: path.id, similarity, matchScore: Math.round(similarity * 100), sharedDimensions };
  }).sort((a, b) => b.similarity - a.similarity || a.pathwayId.localeCompare(b.pathwayId));
}
export function createDiagnosis(answers: Answers, selectedPathwayId = '', completedAt = new Date().toISOString()): DiagnosisResult {
  const vector = calculateRIASEC(answers);
  const max = Math.max(...vector), min = Math.min(...vector);
  const status = max === 0 ? 'no-interest' : max === min ? 'flat' : max <= 0.5 ? 'low-interest' : 'differentiated';
  const order = rankedDimensions(vector);
  const sorted = order.map(d => vector[DIMENSIONS.indexOf(d)]);
  const tied = sorted.slice(0, 3).some((v, i) => v === sorted[i + 1]);
  const matches = status === 'differentiated' ? matchTrajectories(vector, PATHWAYS) : [];
  const topThree = matches.slice(0, 3).map(m => m.pathwayId);
  const second = order[1], secondIndex = DIMENSIONS.indexOf(second);
  const remaining = matches.slice(3);
  const wildcard = vector[secondIndex] > 0 ? remaining.find(m => PATHWAYS.find(p => p.id === m.pathwayId)!.hollandCode.includes(second)) || [...remaining].sort((a, b) => PATHWAYS.find(p => p.id === b.pathwayId)!.riasecVector[secondIndex] - PATHWAYS.find(p => p.id === a.pathwayId)!.riasecVector[secondIndex])[0] : undefined;
  if (selectedPathwayId && !PATHWAYS.some(p => p.id === selectedPathwayId)) throw new Error('Selecciona una trayectoria del catálogo.');
  if (!Number.isFinite(Date.parse(completedAt))) throw new Error('Fecha de diagnóstico inválida.');
  return { version: DIAGNOSIS_VERSION, catalogVersion: CATALOG_VERSION, answers: { ...answers }, vector,
    code: status === 'differentiated' ? hollandCode(vector) : null, tied, status, matches, topThree,
    wildcardId: wildcard?.pathwayId || null, wildcardDimension: wildcard ? second : null, selectedPathwayId, completedAt };
}
// Recompute derived fields from validated answers; never trust stored percentages or codes.
export function restoreDiagnosis(value: unknown): DiagnosisResult | null {
  if (!value || typeof value !== 'object') return null;
  const data = value as Partial<DiagnosisResult>;
  if (data.version !== DIAGNOSIS_VERSION || typeof data.selectedPathwayId !== 'string' || typeof data.completedAt !== 'string') return null;
  try { return createDiagnosis(data.answers as Answers, data.selectedPathwayId, data.completedAt); } catch { return null; }
}
