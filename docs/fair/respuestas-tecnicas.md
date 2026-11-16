# Respuestas técnicas para el jurado

Revisión de código: 20 de octubre de 2026. Respuestas breves para explicar el prototipo; ampliar solo si el jurado lo pide. Los comandos reproducibles están al final.

## Ficha para memorizar

**Hoy:** aplicación web en español; 18 preguntas de intereses basadas en RIASEC; ocho trayectorias educativas salvadoreñas; 24 ejemplos estáticos de ocupaciones; proyectos iniciales, evidencia textual y progreso guardado por perfil en el navegador.

**Alcance:** no mide aptitud ni establece un diagnóstico psicológico validado. No ofrece vacantes, envío de postulaciones, CV automático ni colocación laboral. La revisión de evidencia es una simulación. Las instituciones citadas son fuentes de información; no se deben presentar como aliadas.

**Próximo paso:** revisión profesional del cuestionario y piloto de uso, comprensión y disposición de pago. Estas comprobaciones son diferentes entre sí y de una validación psicométrica.

## Preguntas y respuestas de 20–30 segundos

**¿Con qué está construido?**

> Usamos TypeScript con Next.js y React para la aplicación web, y Tailwind CSS para la interfaz. La lógica del cuestionario y el catálogo están en el proyecto. En esta versión, perfiles, respuestas y actividades se guardan en el navegador; no hay una base de datos remota conectada al recorrido.

Referencia: `package.json` declara Next.js `^14.2.35`, React `18.2.0`, TypeScript `5.2.2` y Tailwind `3.3.3`. La presencia de una dependencia como Supabase no significa que el servicio esté integrado. Evitar atribuir al prototipo una infraestructura que el recorrido no usa.

**¿Cómo llegan de las preguntas a las rutas? ¿Usan inteligencia artificial?**

> La lógica actual es determinista: agrupamos las respuestas en seis dimensiones de intereses y comparamos ese perfil con ocho vectores editoriales de trayectorias mediante similitud coseno. No necesitamos IA generativa para esa comparación. El resultado orienta qué explorar; no decide qué carrera debe estudiar alguien.

Referencia: `lib/riasec.ts`, `lib/diagnosis.ts`, `lib/pathways.ts`. El alumno puede elegir una ruta distinta de la primera sugerencia.

**¿Qué significa el porcentaje que aparece?**

> Es similitud entre la dirección del perfil de intereses y el vector de una trayectoria. No es probabilidad de éxito, empleabilidad ni porcentaje de aptitud. Las barras muestran intereses declarados, no percentiles frente a la población salvadoreña.

La clasificación utiliza valores sin redondear y un desempate reproducible; redondear para mostrar no debe cambiar el orden interno.

**¿Qué pasa si todas las respuestas son iguales o hay poco interés?**

> No forzamos una recomendación personal. Si las seis áreas quedan iguales o ninguna supera el punto neutral, mostramos esa situación y permitimos explorar las ocho rutas. También señalamos los empates para no presentar una precisión que las respuestas no sostienen.

**¿La prueba RIASEC está validada?**

> RIASEC es el marco de referencia. Nuestras 18 preguntas y los vectores de rutas son una adaptación propia que todavía no está validada psicométricamente en El Salvador. Por eso la presentamos como exploración de intereses. Necesitamos revisión profesional y un estudio local antes de sostener afirmaciones más fuertes.

La evidencia publicada para otro inventario RIASEC no valida automáticamente esta adaptación. Como alternativa establecida, Cumbreal incluye un enlace al Perfil de intereses O*NET® en español: herramienta externa gratuita de 30 preguntas con contexto ocupacional estadounidense; no importa resultados a Cumbreal ni establece validación salvadoreña. Consultar [el método actual](../vocational-diagnosis.md), [la decisión de alcance](riasec-decision-y-validacion.md) y [el encargo profesional](revision-profesional.md).

**¿Ya hicieron pruebas?**

> En esta entrega pasan la compilación, los tipos, lint, once pruebas del cuestionario y 54 comprobaciones de navegador en Edge, con anchos de 375 y 1440 píxeles y sin errores ni advertencias de consola. Eso revisa funcionamiento y consistencia en el entorno probado. No demuestra validez psicométrica, reducción del abandono o demanda pagada.

El registro de esta versión figura al final. Las 54 comprobaciones son verificaciones de software, no 54 estudiantes participantes ni una tasa de eficacia del producto.

**¿Qué revisan las pruebas del cuestionario?**

> Hay once casos automatizados definidos. Revisan que existan 18 ítems, tres por dimensión, normalización, respuestas inválidas, similitud, empates, perfiles uniformes o de bajo interés, recuperación de resultados y orden estable. Uno recorre mil perfiles generados para verificar invariantes; esos perfiles no son mil estudiantes participantes.

Referencia: `tests/diagnosis.test.cjs`. Las comparaciones confirman reglas del programa, no la validez científica de las preguntas o de los vectores editoriales.

**¿Dónde quedan mis datos? ¿Puedo entrar desde otro teléfono?**

> Los datos del prototipo quedan en el almacenamiento de ese navegador, separados por perfil local. Un perfil creado en otro teléfono no recupera automáticamente lo guardado aquí. Borrar los datos del sitio elimina esa información. La sincronización entre dispositivos requiere un servicio posterior.

Referencia: `lib/auth-context.tsx` y `lib/progress-context.tsx`. Los borradores de invitado y el traspaso al registro usan `sessionStorage` en la pestaña; los perfiles, resultados guardados y actividades usan `localStorage`.

**¿El inicio de sesión es seguro?**

> El prototipo comprueba la contraseña mediante un derivado PBKDF2 con sal; no guarda la contraseña en texto claro. Aun así, todo funciona localmente y no sustituye autenticación de producción. Alguien con acceso al navegador puede modificar los datos. Para la demo usamos datos ficticios y una contraseña que no se reutilice.

Referencia técnica si la piden: Web Crypto, PBKDF2 SHA-256, 100.000 iteraciones, derivado de 256 bits y sal por cuenta. No afirmar protección del servidor, permisos institucionales o verificación de identidad que no existen.

**¿Cómo verifican las evidencias y las habilidades?**

> Hoy se registra una nota textual como evidencia y se puede simular su revisión. La aceptación en esta demo no es una revisión autorizada de un profesional ni certifica competencia laboral. Los puntos XP muestran avance de la experiencia; no equivalen a una credencial. La revisión humana con permisos y criterios pertenece a una fase posterior.

Referencia: `lib/progress-context.tsx`; `submitEvidence` recibe texto y `reviewEvidence` modifica el estado local. No decir que ya hay evaluación automática fiable ni archivos subidos a un servidor.

**¿Ya conectan con trabajos?**

> Mostramos tres ejemplos de ocupaciones por cada una de las ocho rutas, con preparación y fuentes educativas salvadoreñas. Son ejemplos para explorar, no vacantes. Más adelante queremos ayudar a redactar un CV revisado por el estudiante y facilitar procesos con instituciones y empleadores, una vez existan acuerdos y oportunidades verificadas.

Referencia: `lib/occupations.ts` y [fuentes ocupacionales](../occupational-exploration.md). No inferir habilidad demostrada a partir de intereses, XP o evidencias simuladas; no prometer colocación.

**¿Por qué Cumbreal si ya existen orientadores y pruebas?**

> Proponemos conectar la exploración de intereses con opciones educativas locales, ejemplos de ocupaciones y un primer proyecto dentro de una misma experiencia. El estudiante puede salir con una actividad concreta y algo que conversar con su orientador. Esa es nuestra diferencia propuesta; todavía debemos comprobar su valor con usuarios e instituciones.

No afirmar ser la única, la mejor o la primera opción nacional sin una comparación que lo respalde. La plataforma puede apoyar la orientación profesional.

**¿Cuánto cuesta al estudiante y cuánto cuesta operar?**

> El prototipo es gratuito. Proponemos que una institución patrocine hasta cien estudiantes por quinientos dólares al mes, con un piloto de doscientos cincuenta dólares por cuatro semanas para hasta cien estudiantes y una opción individual de cinco dólares al mes sin patrocinio, con alcance por definir. Son precios a validar. El presupuesto histórico calcula doscientos cuarenta y cinco dólares con cincuenta centavos para cien estudiantes, pero todavía faltan soporte y revisión profesional por medir y cotizar.

Referencia: [precios, costos y experimento comercial](precios-y-costos.md). La demo no procesa cobros. El piloto de cuatro semanas es una propuesta sujeta a acuerdo, no un servicio activo para contratar en la app. El escenario histórico no es gasto real ni prueba de rentabilidad. No mezclar precios antiguos del Excel, hipótesis del pitch y gastos reales. No decir que existe una suscripción contratada o pago integrado.

**¿La solicitud institucional se envía desde la aplicación?**

> El contacto prepara un borrador editable en la aplicación de correo del usuario. La persona revisa y envía el mensaje. No hay envío desde un servidor ni una solicitud recibida automáticamente por llenar un formulario. La app tampoco procesa contratación ni cobros.

**¿Cómo van a demostrar que ayuda?**

> Primero observaremos si los estudiantes entienden el recorrido, las alternativas y los límites del resultado. Después mediremos proyectos iniciados y completados, retorno y si pueden explicar mejor una decisión. La permanencia educativa y el empleo requieren seguimiento más largo y comparación adecuada; todavía no son resultados demostrados.

**¿Ya validaron el mercado?**

> Un prototipo, una encuesta de interés o una visita al QR no prueban disposición de pago. Necesitamos conversar con quien decide y financia el servicio, acordar un piloto con alcance concreto y registrar compromisos y continuidad pagada. Presentaremos esos resultados cuando existan.

**¿Cómo escalarían?**

> El siguiente paso requiere definir el servicio que una institución compraría y probarlo con una cohorte. La operación real necesitará almacenamiento compartido, autenticación y permisos, soporte, revisión del contenido y profesionales según el alcance. Primero mediremos esa carga; no extrapolamos capacidad comercial desde este prototipo local.

## Qué prueba cada tipo de evidencia

| Evidencia | Puede respaldar | No permite concluir por sí sola |
| --- | --- | --- |
| Build, TypeScript y lint | El proyecto compila y pasa comprobaciones estáticas configuradas. | Que todo recorrido funciona o que no hay vulnerabilidades. |
| Pruebas de lógica y perfiles generados | El cálculo respeta reglas e invariantes programadas. | Que el inventario mide intereses de forma fiable o predice resultados reales. |
| Recorrido de navegador | Los pasos y estados observados funcionan en el entorno probado. | Uso satisfactorio por estudiantes diversos o funcionamiento universal. |
| Sesiones con usuarios | Comprensión y usabilidad observadas en esa muestra y tareas. | Eficacia educativa, representatividad nacional o demanda comercial. |
| Revisión profesional de ítems | Juicio experto sobre contenido, lenguaje, riesgos y adecuación. | Validación psicométrica completa o habilitación para diagnosticar. |
| Estudio psicométrico adecuado | Evidencia de fiabilidad y validez para un uso y población definidos. | Validez universal de cualquier adaptación o garantía individual. |
| Piloto y compromisos de compra | Uso, carga operativa y señales de disposición de pago bajo sus condiciones. | Reducción causal del abandono, empleo o rentabilidad a escala. |
| Seguimiento con comparación | Evidencia sobre cambios educativos o laborales según el diseño. | Causalidad sin considerar sesgos, acceso, finanzas y otros factores. |

## Registro de comprobación de la versión

Resultados incorporados de la ejecución final del **20 de octubre de 2026**: build, lint, typecheck y 11 casos de diagnóstico satisfactorios; nueva comprobación de interfaz con `fair-qa.cjs`, **54 verificaciones**, `passed: true`, cero errores y cero advertencias. Navegador: Microsoft Edge con Playwright, con anchos de 375 y 1440 píxeles. Es un control local del software, no una revisión del despliegue público ni una validación educativa.

Archivo de evidencia generado en esta sesión: `C:/Users/Eduardo/.codex/visualizations/2026/10/20/01a15a69-42ab-7f63-bee1-8a501ac5df41/fair-qa.json`. La fuente contiene 54 entradas en `checks`. Las 45 verificaciones de la entrega anterior son un antecedente distinto; no se suman para inflar el alcance de esta ejecución.

| Comprobación | Estado al redactar esta ficha | Evidencia que debe conservar la versión final |
| --- | --- | --- |
| Compilación de producción | **PASS**, `npm run build`, 20 de octubre de 2026. | Salida de ejecución y revisión Git del paquete final. |
| Tipos y lint | **PASS**, `npm run typecheck` y `npm run lint`, 20 de octubre de 2026. | Salidas de ejecución. |
| 11 casos de diagnóstico | **PASS**, `npm run test:diagnosis`; un caso recorre 1.000 perfiles generados. | Salida del runner; no corresponde a 1.000 usuarios. |
| Interfaz y recorrido | **PASS**, 54 verificaciones con Edge/Playwright; 375/1440 px; sin errores ni advertencias. | `fair-qa.json`: rutas, ocupaciones, persistencia, límites visibles, enlace O*NET, contacto y formato responsive. |
| URL/QR | Eduardo confirmó <https://cumbreal.vercel.app>; QR del paquete preparado. | Escaneo y apertura en el teléfono/red final aún pendientes de registro; `qrDecoderAvailable` es `false` en el QA automatizado. |
| Presentación | Fuera del trabajo actual por instrucción del usuario. No se entrega nuevo PPTX ni PDF; los borradores generados se excluyen del paquete. | El PPTX y el Word existentes del usuario permanecen intactos. El equipo gestiona su presentación y el ensayo; no se declara un nuevo deck listo. |
| Eficacia, psicometría y pago | No establecidos por estas comprobaciones. | Estudios y compromisos distintos del control de software. |

Comandos desde la carpeta `project`:

```powershell
npm run build
npm run lint
npm run typecheck
npm run test:diagnosis
```

Ejecutar compilación antes de `typecheck` cuando Next.js necesite generar sus tipos. Los scripts visuales antiguos en `../archive/unslop/` anteceden al nuevo cuestionario y no son evidencia automática de las expectativas actuales; revisar su alcance antes de citarlos. El último control específico de esta entrega es `fair-qa.cjs`, cuya salida se identifica arriba. Las herramientas de QA deben registrar lo probado, sin convertir capturas o salidas de consola en una validación educativa.

## Regla para contestar una pregunta imprevista

Responder en tres pasos: **qué hace hoy**, **qué evidencia lo respalda** y **qué queda por comprobar**. Si falta un dato, decir «No tenemos esa medición todavía; la recogeríamos mediante…». No rellenar la ausencia con una cifra, un convenio o una capacidad futura presentada como actual.
