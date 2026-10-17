import { useId } from 'react';
import { CumbiArtwork } from './cumbi-artwork';

export function CumbiLogo({ size = 36 }: { size?: number }) {
  const id = useId().replace(/:/g, '') + '-avatar';
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width={size} height={size} aria-hidden="true">
    <defs><clipPath id={id}><circle cx="120" cy="120" r="118" /></clipPath></defs>
    <circle cx="120" cy="120" r="118" fill="#3B8078" />
    <g clipPath={'url(#' + id + ')'}><g transform="translate(-32 -20) scale(1.22)"><CumbiArtwork state="Base" /></g></g>
  </svg>;
}

