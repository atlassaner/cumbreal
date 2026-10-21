# Cambios y verificación de preparación

Fecha: 20 de octubre de 2026. Alcance: aplicación local y materiales de preparación. Este registro no certifica psicometría, eficacia educativa, demanda ni colocación laboral.

## Cambios implementados

| Superficie | Comportamiento actualizado |
| --- | --- |
| Portada y navegación de estudiante | El cuestionario se presenta como exploración de intereses. El esquema y las respuestas guardadas no se migran ni se sobrescriben por un cambio de nombre. |
| Inicio del cuestionario e interpretación del resultado | Enlace externo al Perfil de intereses O*NET® en español, con sus 30 preguntas claramente separadas de las 18 propias. Sin transferencia de respuestas ni importación. |
| Instituciones | Se eliminó el formulario de demostración desconectado. El contacto prepara un borrador de correo y el visitante decide si enviarlo. Se muestran gratuidad actual, tarifas propuestas y cobertura. |
| Privacidad | Se explica el alcance de los enlaces externos y del correo preparado en la aplicación del visitante. |
| Documentación | Decisión RIASEC, paquete profesional, costos, piloto, plantillas vacías, técnica, calendario, ensayo y estado de cada punto. |
| Recursos de entrega | URL confirmada y QR generado para el mismo destino. El video y ejemplo siguen con Eduardo. |

El Word y las presentaciones previas del usuario no se modificaron. El trabajo adicional en PowerPoint se canceló a su solicitud; sus borradores generados quedaron fuera del repositorio y de la entrega.

## Comprobaciones de software

| Comprobación | Resultado | Alcance |
| --- | --- | --- |
| `npm run build` | Satisfactorio | Compilación de producción, páginas, lint y tipos de Next.js. |
| `npm run lint` | Sin advertencias ni errores | Reglas estáticas del proyecto. |
| `npm run typecheck` | Satisfactorio | Tipos TypeScript. |
| `npm run test:diagnosis` | 11 pruebas satisfactorias | Incluyen 1,000 perfiles deterministas generados, respuestas inválidas, empates, bajo interés, ranking y restauración. No son 1,000 participantes humanos. |
| Edge + Playwright | 54 comprobaciones satisfactorias; cero errores y advertencias de consola | Sitio local en `http://127.0.0.1:3100`, vistas de 1440 y 375 px. |
| `git diff --check` y revisión de enlaces locales | Sin errores al finalizar | Formato de cambios y vínculos de documentación. |
| CSV de investigación | Cinco plantillas con encabezados únicos y sin filas de respuestas | No se inventaron compradores, estudiantes, gastos ni ventas. |

El plugin Browser no está disponible; se utilizó Playwright del runtime de Codex con Microsoft Edge, sin añadir dependencias a la aplicación. La compilación y el navegador necesitaron acceso a sus carpetas generadas y perfiles temporales fuera del entorno restringido. No se modificaron perfiles personales del navegador.

## Recorrido observado

1. Portada con contenido y título correctos, sin pantalla en blanco ni overlay del framework.
2. Selección de las ocho rutas, tres ocupaciones por ruta y enlaces/fuentes. Comprobación en escritorio y móvil, sin desbordamiento horizontal.
3. Selección mediante teclado y límites explícitos para salud y fuentes históricas.
4. Acceso al cuestionario, enlace oficial externo y explicación de ausencia de transferencia.
5. Respuesta a los seis bloques, selección de ruta en resultados, creación de perfil local y acceso al dashboard.
6. Cambio de ruta guardado y persistente después de recargar, con panel ocupacional correspondiente.
7. Página institucional sin formulario que aparente enviar datos; enlace `mailto` al correo del equipo con borrador y campos previstos. La prueba inspeccionó el enlace, sin abrir un cliente ni enviar correo.
8. Texto de prototipo gratuito, cuatro semanas propuestas y ausencia de una tarifa activa del cuestionario; revisión visual de escritorio y móvil.

Las capturas y el JSON de ejecución se guardaron como evidencia local de QA, fuera del repositorio. La ficha técnica registra las mismas cifras. La presencia de una prueba satisfactoria no establece que una recomendación educativa sea válida para una persona.

## URL y QR

Eduardo confirmó `https://cumbreal.vercel.app`. El QR local codifica exactamente esa cadena, usa cuatro módulos de margen y corrección de errores alta. El navegador de QA no dispuso de un decodificador QR, por lo que no se afirma una lectura automática ni una prueba de escaneo en teléfono. Antes de proyectar, el equipo debe comprobar esa imagen final y la distancia real. La disponibilidad de la demo fue declarada por el usuario; este registro local no acredita el despliegue de cada commit nuevo.

## Dependencias que siguen abiertas

- Revisión y firma de un profesional, más cualquier estudio psicométrico local.
- Confirmación de la docente sobre fecha, hora, sede, plazo y recepción de recursos.
- Video y ejemplo del usuario; ensayo completo observado con Febe y Eduardo.
- Entrevistas, piloto, consumo real, honorarios profesionales, ventas y resultados de estudiantes.

Existen protocolos y registros para recoger estas evidencias. No se marcaron como realizadas.
