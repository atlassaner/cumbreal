export function progression(xp: number) {
  const names = ['Explorador', 'Aprendiz', 'Investigador', 'Especialista', 'Líder'];
  const level = Math.min(5, Math.floor(xp / 250) + 1) as 1 | 2 | 3 | 4 | 5;
  return {
    level,
    name: names[level - 1],
    percent: level === 5 ? 100 : Math.round(((xp % 250) / 250) * 100),
    next: level === 5 ? null : level * 250,
  };
}
