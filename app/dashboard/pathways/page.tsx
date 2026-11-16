import { PathwayExplorer } from '@/components/cumbreal/pathway-explorer';
export default function Pathways() {
  return (
    <>
      <h1 className="text-4xl">Tu trayectoria no está escrita.</h1>
      <p className="text-ink-muted mt-4 max-w-xl">
        Elige una posibilidad y prueba una experiencia concreta. Tú decides qué camino seguir explorando.
      </p>
      <PathwayExplorer dashboard />
    </>
  );
}
