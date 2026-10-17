import Image from 'next/image';

/** Official supplied lockup, cropped without redrawing the mark or wordmark. */
export function CumbrealLogo() {
  return <Image src="/brand/cumbreal-logo.svg" alt="Cumbreal" width={176} height={32} unoptimized className="mix-blend-multiply" />;
}
