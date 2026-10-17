'use client';
import { useId } from 'react';
import { cn } from '@/lib/utils';
interface ApertureProps {
    level?: 1 | 2 | 3 | 4 | 5;
    size?: number;
    className?: string;
    glow?: boolean;
    showLabels?: boolean;
}
const LEVELS = [
    { id: 1, name: 'Explorador' },
    { id: 2, name: 'Aprendiz' },
    { id: 3, name: 'Investigador' },
    { id: 4, name: 'Especialista' },
    { id: 5, name: 'Líder' },
];
export function Aperture({ level = 1, size = 120, className, glow = false, showLabels = false, }: ApertureProps) {
    const gradientId = useId();
    const litColor = '#28697A';
    const dimColor = '#5A6B75';
    const cx = 60;
    const cy = 60;
    const innerRadius = 18;
    const outerRadius = 52;
    // 5 segments arranged like aperture blades around center
    const segments = Array.from({ length: 5 }, (_, i) => {
        const startAngle = (i * 72 - 90) * (Math.PI / 180);
        const endAngle = ((i + 1) * 72 - 90) * (Math.PI / 180);
        const gap = 0.06;
        const x1 = cx + innerRadius * Math.cos(startAngle + gap);
        const y1 = cy + innerRadius * Math.sin(startAngle + gap);
        const x2 = cx + outerRadius * Math.cos(startAngle + gap);
        const y2 = cy + outerRadius * Math.sin(startAngle + gap);
        const x3 = cx + outerRadius * Math.cos(endAngle - gap);
        const y3 = cy + outerRadius * Math.sin(endAngle - gap);
        const x4 = cx + innerRadius * Math.cos(endAngle - gap);
        const y4 = cy + innerRadius * Math.sin(endAngle - gap);
        return {
            id: i + 1,
            path: `M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1} Z`,
            lit: i < level,
        };
    });
    return (<div className={cn('inline-flex flex-col items-center', className)}>
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(glow && level === 5 && 'drop-shadow-[0_0_12px_rgba(220,181,198,0.5)]')}>
        {glow && (<defs>
            <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#28697A" stopOpacity="0.3"/>
              <stop offset="60%" stopColor="#28697A" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#28697A" stopOpacity="0"/>
            </radialGradient>
          </defs>)}
        {glow && <circle cx={cx} cy={cy} r={58} fill={'url(#' + gradientId + ')'}/>}
        {segments.map((seg) => (<path key={seg.id} d={seg.path} fill={seg.lit ? litColor : dimColor} opacity={seg.lit ? 1 : 0.35} style={{
                transition: 'fill 0.5s ease, opacity 0.5s ease',
            }}/>))}
        <circle cx={cx} cy={cy} r={7} fill={level > 0 ? litColor : dimColor} opacity={level > 0 ? 0.9 : 0.3}/>
      </svg>
      {showLabels && (<div className="mt-3 flex flex-col items-center gap-1">
          {LEVELS.map((l) => (<div key={l.id} className={cn('text-xs tracking-wide transition-colors', l.id === level ? 'text-teal-deep font-medium' : 'text-ink-muted/50')}>
              {l.name}
            </div>))}
        </div>)}
    </div>);
}
export { LEVELS };
