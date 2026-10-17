import './globals.css';
import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});
const dmSerif = DM_Serif_Display({
    subsets: ['latin'],
    variable: '--font-dm-serif-display',
    weight: ['400'],
    display: 'swap',
});
export const metadata: Metadata = {
    title: 'Cumbreal — Tu progreso tiene un rumbo',
    description: 'Cumbreal convierte lo que aprendes en evidencia de tus capacidades, descubre hacia dónde puedes llegar y te ayuda a construir tu trayectoria.',
    openGraph: {
        title: 'Cumbreal — Tu progreso tiene un rumbo',
        description: 'Cumbreal convierte lo que aprendes en evidencia de tus capacidades, descubre hacia dónde puedes llegar y te ayuda a construir tu trayectoria.',
    },
    twitter: {
        card: 'summary_large_image',
    },
};
import { AuthProvider } from '@/lib/auth-context';
import { ProgressProvider } from '@/lib/progress-context';
export default function RootLayout({ children, }: {
    children: React.ReactNode;
}) {
    return (<html lang="es" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="font-sans antialiased bg-canvas text-ink">
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <AuthProvider>
          <ProgressProvider>{children}</ProgressProvider>
        </AuthProvider>
      </body>
    </html>);
}
