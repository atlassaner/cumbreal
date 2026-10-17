export const DIMENSIONS = ['R', 'I', 'A', 'S', 'E', 'C'] as const;
export type HollandType = typeof DIMENSIONS[number];
export type RIASECVector = [number, number, number, number, number, number];
export const HOLLAND_TYPES: Record<HollandType, { name: string; description: string }> = {
  R: { name: 'Realista', description: 'Construir, reparar y trabajar con herramientas o naturaleza.' },
  I: { name: 'Investigador', description: 'Investigar, analizar datos y comprender cómo funcionan las cosas.' },
  A: { name: 'Artístico', description: 'Crear, diseñar y expresar ideas de formas originales.' },
  S: { name: 'Social', description: 'Acompañar, enseñar y contribuir al bienestar de otras personas.' },
  E: { name: 'Emprendedor', description: 'Proponer, liderar, negociar y coordinar iniciativas.' },
  C: { name: 'Convencional', description: 'Organizar información y trabajar con precisión y procesos.' },
};
// Ties keep RIASEC order for reproducibility, never as evidence of preference.
export function rankedDimensions(vector: RIASECVector): HollandType[] {
  return [...DIMENSIONS].sort((a, b) => vector[DIMENSIONS.indexOf(b)] - vector[DIMENSIONS.indexOf(a)]);
}
export function hollandCode(vector: RIASECVector): string {
  return rankedDimensions(vector).slice(0, 3).join('');
}
