import { useId } from 'react';
import { CumbiArtwork, CumbiLevel, CumbiState } from './cumbi-artwork';
export type { CumbiState, CumbiLevel } from './cumbi-artwork';

export function Cumbi({
  state = 'Curioso',
  level = 1,
  className = '',
  size = 200,
  decorative = false,
}: {
  state?: CumbiState;
  level?: CumbiLevel;
  className?: string;
  size?: number;
  decorative?: boolean;
}) {
  const id = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={'cumbi ' + (state === 'Celebrando' ? 'cumbi-celebrate ' : '') + className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-labelledby={decorative ? undefined : id}
    >
      {!decorative && <title id={id}>{'Cumbi ' + state.toLowerCase() + ', tu compañero de exploración'}</title>}
      <CumbiArtwork state={state} level={level} />
    </svg>
  );
}
