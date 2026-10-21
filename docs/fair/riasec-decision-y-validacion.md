# RIASEC: decisión para la feria y ruta de validación

Fecha de revisión documental: **20 de octubre de 2026**. Estado: decisión de alcance preparada; **revisión profesional y estudio local pendientes**.

## Decisión para esta versión

Cumbreal conserva su exploración propia de **18 actividades**, con límites visibles, y ofrece acceso opcional a un instrumento establecido mediante un **enlace externo al Perfil de intereses O*NET® en español**. El enlace permite usar una alternativa documentada ahora, sin sustituir silenciosamente las preguntas ni atribuirle a Cumbreal la evidencia del instrumento externo.

La propuesta de valor de Cumbreal es conectar intereses, alternativas educativas salvadoreñas, ejemplos de ocupaciones y un primer proyecto. No depende de vender un supuesto diagnóstico definitivo. La exploración no debe decidir admisiones, becas, contratación o exclusión de estudiantes.

Esta decisión no convierte los 18 ítems ni sus asociaciones a ocho rutas en una prueba validada. Tampoco constituye aprobación de O*NET, de una institución educativa o de un profesional.

## Instrumento establecido que se puede consultar ahora

- **Destino:** <https://onetinterestprofiler.org/es/>.
- **Etiqueta propuesta:** «Explorar con O*NET® en español · herramienta externa gratuita».
- **Texto de apoyo:** «30 preguntas sobre intereses laborales. Abrís una herramienta externa con información ocupacional de Estados Unidos. Tus respuestas y resultados no se importan a Cumbreal».
- **Ubicación sugerida:** antes del cuestionario y en la explicación de resultados, con apertura en otra pestaña y aviso accesible.

La página oficial de [Interest Profiler](https://www.onetcenter.org/IP.html) identifica el Mini-IP de 30 preguntas, su versión en español, el acceso sin costo y las opciones de integración. El enlace español de esa página conduce al destino anterior. Su fundamento RIASEC y documentación publicada lo hacen una alternativa establecida; no equivalen a evidencia específica sobre estudiantes salvadoreños.

El sitio del instrumento necesita JavaScript. La consulta documental confirmó su URL oficial; la comprobación de funcionamiento en el teléfono y la red de la feria corresponde al control operativo de enlaces. El usuario puede volver a Cumbreal para explorar rutas por su cuenta; esta versión no importa resultados externos ni afirma equivalencia entre escalas.

## Qué existe en Cumbreal

Referencia técnica de esta revisión: `lib/diagnosis.ts`, `lib/riasec.ts`, `lib/pathways.ts` y [vocational-diagnosis.md](../vocational-diagnosis.md).

| Elemento | Implementación actual | Interpretación defendible |
| --- | --- | --- |
| Preguntas | 18 actividades propias; tres por dimensión R, I, A, S, E y C | Preferencias declaradas ante esas actividades |
| Respuesta | Cinco opciones, de desagrado a entusiasmo | Autoinforme; no ejercicio de desempeño |
| Dimensiones | `(suma de tres respuestas - 3) / 12` | Escala interna 0–1; no percentil poblacional |
| Asociación con rutas | Similitud coseno frente a ocho vectores editoriales | Proximidad matemática al catálogo limitado |
| Porcentaje mostrado | Similitud redondeada para visualización | No probabilidad de éxito, aptitud o empleo |
| Perfiles uniformes o sin interés por encima del punto neutral | Sin ranking personalizado ni código Holland | Evita forzar una recomendación; permite explorar libremente |
| Empates | Orden reproducible y aviso de empate | El desempate técnico no demuestra preferencia |
| Ocupaciones | Ejemplos estáticos asociados con las rutas | Opciones para investigar; no vacantes, demanda medida ni colocación |
| Evidencia y revisión | Actividades del prototipo; revisión simulada | Interacción demostrable; no certificación de competencias |

El nombre interno `diagnosis` pertenece al código; la explicación pública debe hablar de **exploración de intereses**. La puntuación no observa desempeño, condiciones económicas, accesibilidad, requisitos de ingreso, valores personales ni disponibilidad local de empleo. Una dimensión emprendedora alta no demuestra capacidad de crear una empresa; una baja no excluye esa posibilidad.

## Licencias e integración: opciones distintas

La [página oficial de licencias](https://www.onetcenter.org/license_tools.html) distingue reproducción sin cambios bajo **CC BY-ND 4.0** y adaptación bajo **O*NET Tools Developer License**. La primera exige atribución y no permite redistribuir una versión modificada. La segunda añade obligaciones para adaptaciones. Esas condiciones se refieren al contenido cubierto por las licencias; no basta con usar la palabra RIASEC para afirmar que se está utilizando el instrumento oficial.

| Alternativa | Qué preparar antes de usarla | Decisión actual |
| --- | --- | --- |
| Enlace al sitio oficial | Nombre de origen, aviso de salida y contexto geográfico | Recomendada para la feria |
| Widget oficial | Registro de desarrollador y código oficial; revisión de términos y experiencia móvil | Posponer hasta comprobar integración |
| API oficial | Cuenta, condiciones de acceso, gestión segura de credenciales, atribución y pruebas de integración | No conectada en esta versión |
| Copiar el instrumento íntegro sin cambios | Comprobar licencia aplicable, conservar contenido y atribución | No implementado |
| Recortar, traducir de nuevo o cambiar ítems oficiales | Estudio exigido para la adaptación y avisos correspondientes | No presentar como atajo de validación |

Los [servicios oficiales](https://services.onetcenter.org/ip) ofrecen enlace, widget y API. El widget y la API requieren el registro indicado por el proveedor. La disponibilidad de documentación o de una cuenta no prueba que la integración de Cumbreal esté completada.

Los [términos de Web Services](https://services.onetcenter.org/terms), consultados en su página con actualización indicada del 25 de junio de 2019, requieren registro y atribución. Su apartado 9.3 exige permiso para incluir la información en una aplicación de pago o que requiere registro, salvo que también esté disponible en un área gratuita y pública sin registro. Esta condición es específica del servicio: no debe confundirse con la licencia de contenido. Por ahora, el acceso externo gratuito evita diseñar el negocio alrededor de cobrar por ese servicio.

La [licencia de desarrolladores](https://www.onetcenter.org/license_toolsdev.html), sección 3(b), exige un estudio para modificaciones de contenido o finalidad, y avisos de modificación y ausencia de aprobación. La integración exclusivamente técnica recibe un tratamiento distinto en esa cláusula. Antes de distribuir una adaptación concreta se debe documentar qué se reutiliza y qué se cambia; un aviso de «no validado» no reemplaza una obligación de estudio.

No se han copiado aquí los ítems oficiales ni se ha integrado su API. Los ítems propios requieren documentar su procedencia; si una revisión de autoría detecta material derivado de un instrumento, habrá que resolver sus condiciones antes de redistribuirlo como tal.

## Tres trabajos que deben mantenerse separados

| Trabajo | Pregunta que responde | Evidencia esperada | Lo que no demuestra |
| --- | --- | --- | --- |
| Revisión profesional de contenido | ¿La redacción, cobertura y explicación son apropiadas para el uso propuesto? | Informe fechado, versión revisada, observaciones, cambios y alcance firmado | Fiabilidad, estructura factorial o eficacia local |
| Estudio psicométrico local | ¿Qué interpretaciones de las puntuaciones están respaldadas para esta población y finalidad? | Protocolo, muestra descrita, análisis, incertidumbre y limitaciones | Impacto causal sobre deserción, salarios o PIB |
| Prueba de usabilidad y software | ¿Se comprende y completa el flujo? ¿El cálculo implementa su especificación? | Observación de tareas, errores, tiempos, comprensión y pruebas técnicas | Validez psicológica o demanda comercial |

El [manual técnico de O*NET de 2021](https://www.onetcenter.org/reports/IP_Manual.html) trata construcción, fiabilidad, validez y asociación con ocupaciones. El [informe Mini-IP de 2016](https://www.onetcenter.org/reports/Mini-IP.html) documenta el desarrollo de su forma breve. Son antecedentes del instrumento correspondiente, no resultados de una evaluación de Cumbreal.

## Respuesta lista para el jurado

> Nuestra versión actual usa una exploración propia de 18 actividades inspirada en RIASEC. Sirve para abrir opciones y proponer un primer proyecto; no mide aptitud ni determina una carrera. También damos acceso gratuito al Perfil de intereses O*NET en español como herramienta externa documentada. La revisión profesional y el estudio local del cuestionario propio siguen pendientes y tienen un protocolo preparado. La evidencia de software confirma el funcionamiento del prototipo, no su validez psicométrica.

No describirlo como «validado por O*NET», «test certificado», «diagnóstico profesional», «90 % de probabilidad de éxito» o «prueba que evita la deserción». Si alguien pregunta por resultados reales, presentar únicamente pruebas y participantes registrados, con fecha, versión y alcance.

## Próximas decisiones y criterio de cierre

1. **Antes de la feria:** publicar el alcance limitado de forma coherente; comprobar el enlace oficial; congelar la versión del cuestionario y del catálogo; entregar al equipo el guion anterior.
2. **Revisión profesional:** completar [el paquete de revisión](revision-profesional.md) con un profesional cualificado. Cierre: informe recibido y cambios trazables; no una firma vacía ni una promesa de contacto.
3. **Elección de instrumento:** comparar conservar y estudiar la adaptación propia frente a integrar sin cambios el instrumento establecido. Decidir por finalidad, evidencia, condiciones de uso, carga de respuesta y pertinencia local.
4. **Estudio local:** ejecutar un protocolo dirigido por quien tenga competencia psicométrica. Cierre: resultados y limitaciones publicados para una versión y un uso definidos; no un umbral aislado de consistencia interna.
5. **Modelo comercial:** evaluar cobro por acompañamiento, proyectos o servicios institucionales con alcance definido. La disposición a pagar y la calidad de las puntuaciones se investigan por separado.

La fecha de esta nota identifica la consulta documental. No se ha realizado contacto, revisión profesional, validación local ni contratación de servicios.
