import Link from 'next/link';
export default function PrivacyPage() { return <main id="contenido" className="wrap max-w-2xl py-16">
<Link href="/">← Volver a Cumbreal</Link>
<h1 className="text-4xl mt-8">Privacidad del prototipo</h1>
<p className="mt-6">Este prototipo guarda perfiles, respuestas del cuestionario, resultados de intereses, trayectorias elegidas, actividades y evidencias en este navegador. Los resultados se guardan dentro de cada perfil; no se sincronizan entre dispositivos. Los borradores de visitantes se conservan temporalmente en la pestaña hasta crear un perfil. No ofrece autenticación en un servidor ni envía solicitudes institucionales o de recuperación de contraseña.</p>
<p className="mt-4">Usa datos de prueba. No ingreses información sensible ni contraseñas que utilices en otros servicios. Puedes eliminar los datos locales desde Mi espacio.</p>
<p className="mt-4">Los perfiles locales no están protegidos contra otras personas que tengan acceso al mismo dispositivo. Esta explicación no sustituye una política de privacidad para un servicio en producción.</p>
</main>; }
