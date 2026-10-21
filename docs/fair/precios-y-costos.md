# Precios, costos y experimento comercial de Cumbreal

Revisión: 20 de octubre de 2026. Moneda: dólares estadounidenses. Este documento separa el prototipo disponible, los precios propuestos y los costos que todavía necesitan medición o cotización. No acredita ventas, contratos ni gastos efectivamente pagados.

## Respuesta para el pitch

> Hoy el prototipo se puede explorar sin pago. Nuestro modelo propuesto es institucional: la institución patrocinaría el acceso de hasta cien estudiantes por quinientos dólares mensuales. Para probar esa oferta, proponemos un piloto de doscientos cincuenta dólares; su duración y alcance deben acordarse antes de contratarlo. También contemplamos cinco dólares mensuales para estudiantes sin patrocinio. Son precios a validar, no ventas logradas. El presupuesto histórico estima doscientos cuarenta y cinco dólares con cincuenta centavos al mes para cien estudiantes, pero todavía debemos medir el soporte y cotizar la revisión profesional antes de afirmar rentabilidad.

Si solo hay tiempo para una frase: **«El prototipo es gratuito; proponemos acceso patrocinado por instituciones, desde un piloto de $250, para comprobar uso y disposición real de pago».** En preguntas, aclarar periodicidad y condiciones propuestas. No presentar «desde» como un catálogo de servicios ya disponibles para contratar.

## Qué se ofrece hoy y qué se propone cobrar

| Modalidad | Precio | Estado y alcance |
| --- | ---: | --- |
| Prototipo de feria | Sin cobro en la aplicación | Exploración de intereses, ocho rutas, ejemplos ocupacionales, selección de proyecto y registro local de actividades. Sin pasarela de pago ni servicio contratado. |
| Estudiante patrocinado | $0 para el estudiante | Propuesta: la institución cubre el acceso. No cobrar además la tarifa individual por el mismo acceso patrocinado. |
| Acceso individual sin patrocinio | $5/mes | Precio propuesto para evaluar. Definir prestaciones y soporte antes de vender. |
| Plan institucional estándar | $500/mes, hasta 100 estudiantes | Precio propuesto. Las funciones institucionales, reportes y operación de datos deben estar listas antes de incluirlas en una oferta. |
| Piloto institucional | $250 por mes piloto, hasta 100 estudiantes | Propuesta comercial pendiente de acuerdo. Como diseño de experimento se recomienda una cohorte durante cuatro semanas; confirmar el período exacto, entrega, soporte y precio total en una propuesta escrita. No hay renovación automática acordada. |
| Cobertura superior a 100 | Propuesta ajustada | Ampliaciones hasta 200 estudiantes se presupuestan según necesidades y costos. No prometer 200 al precio de 100. |

Estos precios mantienen el modelo previo del equipo. La sugerencia «mini-inventario gratuito y prueba completa pagada» queda como una alternativa de investigación. No se ha definido ni implementado una prueba completa pagada, ni se ha acordado sustituir el modelo institucional por ella. Cobrar por un test no acredita su validez psicométrica.

La oportunidad comercial por investigar es el acompañamiento de una cohorte: facilitar exploración, seguimiento y decisiones útiles para estudiantes y coordinadores. Antes de cobrar por reportes, comprobar que existen, que son comprensibles y que se pueden producir con datos autorizados. La aplicación actual conserva perfiles y actividades en el navegador; no reúne una cohorte en un servidor ni ofrece un panel institucional real.

## Costos del prototipo actual

El código revisado ejecuta el cuestionario y sus recomendaciones sin llamadas a un servicio de IA. No se encontraron llamadas de pago en `app/`, `components/`, `lib/` o `hooks/`. La presencia de `@supabase/supabase-js` en `package.json` no demuestra que exista un servicio de base de datos contratado o conectado. El repositorio contiene configuración de Netlify; esto tampoco demuestra qué plan o proveedor utiliza el despliegue público.

Por lo tanto, **el recorrido local no exige un cargo externo por test o por perfil**. Eso es distinto de afirmar que mantener el proyecto cuesta cero: equipo, internet, electricidad, trabajo, herramientas y alojamiento tienen costos posibles. No se revisaron facturas, planes de la cuenta ni consumo del despliegue. La cifra observada de gastos efectivamente pagados queda **sin verificar**.

Para la feria, usar datos ficticios y el proveedor ya preparado por el equipo. No contratar un segundo alojamiento, una API de IA o un backend solo para reproducir costos que aparecen en un presupuesto antiguo.

## Referencias oficiales para actualizar el presupuesto

Precios consultados el 20 de octubre de 2026. Son referencias públicas, no cotizaciones de Cumbreal; pueden cambiar y no incluyen un cálculo de impuestos, comisiones o excesos de consumo.

| Servicio y uso posible | Referencia pública | Consecuencia para el presupuesto |
| --- | --- | --- |
| Netlify: alojamiento del sitio | Free: $0/mes, 300 créditos; Personal: $9/mes, 1,000; Pro desde $20/mes, 3,000 y miembros ilimitados. Los créditos cubren diferentes recursos, incluidos despliegues y tráfico. [Precios](https://www.netlify.com/pricing/) y [planes](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/). | Hay configuración de Netlify en el repositorio. Verificar el plan de la cuenta y su consumo; no convertir créditos en un número garantizado de estudiantes. Las cuentas antiguas pueden tener planes heredados. |
| Vercel: alternativa de alojamiento | Hobby está limitado a uso personal no comercial. Pro: $20/mes de plataforma, un miembro con permiso de desplegar y $20 de crédito de uso; miembros adicionales que despliegan: $20/mes cada uno, más consumo y extras aplicables. [Hobby](https://vercel.com/docs/plans/hobby), [Pro](https://vercel.com/docs/plans/pro-plan). | El presupuesto histórico incluye Vercel; no se comprobó que sea el host actual. Un servicio comercial en Vercel no debe presupuestarse como Hobby gratuito. No sumar Vercel y Netlify si cumplen la misma función. |
| Supabase: base de datos y autenticación futura | Free: $0, 500 MB de base de datos, 1 GB de archivos y 50,000 usuarios activos mensuales; puede pausarse por una semana de inactividad. Pro desde $25/mes, con primer proyecto incluido y consumos adicionales posibles. [Precios](https://supabase.com/pricing). | Es una opción para diseñar persistencia real, no una función ya conectada. Sus límites no garantizan que toda la aplicación soporte 50,000 estudiantes. |
| Railway: backend separado si la arquitectura lo necesita | Hobby: consumo mínimo de $5/mes con $5 de uso incluido; Pro: mínimo de $20/mes con crédito de uso. Los excesos se cobran según recursos. [Precios](https://railway.com/pricing). | No añadirlo automáticamente a Next.js + un servicio de datos. Justificar primero qué proceso requiere otro servidor. El mínimo no es una tarifa plana de recursos ilimitados. |
| Cloudflare R2: alternativa para archivos futuros | Standard: 10 GB-mes gratuitos; luego $0.015/GB-mes, además de operaciones facturables. Un millón de operaciones A y diez millones B incluidos mensualmente; salida directa a internet sin cargo de transferencia de R2. [Precios](https://developers.cloudflare.com/r2/pricing/). | No sumar un supuesto por GB a cada estudiante sin estimar archivos, duración de retención, operaciones y capa gratuita. No hace falta duplicar almacenamiento ya cubierto por el servicio elegido. |
| Dominio propio opcional | Cloudflare publica precios de registro y renovación según extensión y dominio en su buscador. [Registrador](https://www.cloudflare.com/domains/). | Cotizar disponibilidad, primer año y renovación. El supuesto anterior de $0.01/año no es una cotización de renovación válida. Amortización mensual: precio anual / 12. La URL del proveedor puede evitar esta compra para la feria. |

Ejemplo de arquitectura comercial para presupuestar, **no selección aprobada**: alojamiento Pro de $20 + Supabase Pro de $25 = **$45/mes de base tecnológica**, antes de dominio, uso adicional, correo, soporte, trabajo y revisión profesional. No se ha implementado ni contratado esta arquitectura. Tampoco implica que sea la única o la más barata. Si se mantienen los $200 de asignación mensual al equipo del modelo anterior, el subtotal sería $245 antes de esas partidas: no confundirlo con el cálculo histórico de $245.50.

La validación del instrumento, la orientación humana y la revisión de evidencias requieren definir horas, entregables y honorarios con profesionales. **Su precio no se puede deducir de hosting barato ni fijarse en cero por ausencia de cotización.**

## Auditoría del presupuesto histórico

Fuentes internas: `PITCH-CUMBREAL.md`, sección «Comprobación financiera y diferencias con el Excel», y la extracción previa `tmp/pitch/finance-text.txt`. La extracción contiene valores y fórmulas atribuidos a `Cumbreal_LibrodeExcel_FinanzasdelEmprendimiento.xlsx`; en esta revisión no se volvió a abrir el libro original. Estas fuentes están fuera de la carpeta del repositorio de la aplicación. Se transcriben aquí las partidas relevantes para que el razonamiento sea revisable.

| Partida fija histórica | Importe mensual | Qué falta confirmar |
| --- | ---: | --- |
| Railway | $5.00 | Necesidad y consumo del backend. |
| Vercel | $20.00 | Host/plan realmente elegido y miembros que despliegan. |
| Diseño | $6.50 | Plan y factura. El texto explicativo del archivo menciona otra cifra de herramientas. |
| Asignación al equipo, cuatro integrantes | $200.00 | Horas y costo del trabajo real. Son $50 por persona en el supuesto, no una estimación demostrada de remuneración suficiente ni de obligaciones laborales. |
| Dominio | $0.00083 | Corresponde a una promoción supuesta de $0.01/año. Sustituir por una cotización vigente y su renovación. |
| **Total fijo histórico** | **$231.50083** | No representa gasto observado. |

El variable histórico de **$0.14/estudiante-mes** suma $0.13 de IA y $0.01 de almacenamiento. El primer importe no corresponde a una API conectada en el prototipo; el segundo mezcla una tarifa por GB con una tarifa por persona. Solo se pueden sumar si se define y verifica el volumen facturable por estudiante. Conservar $0.14 únicamente para reproducir el escenario anterior; no llamarlo costo real ni tarifa vigente del proveedor.

### Fórmulas reproducibles del escenario anterior

```text
F = 231.50083                  # costo fijo histórico mensual
v = 0.14                       # variable agregado supuesto por estudiante-mes
N = estudiantes atendidos       # incluye patrocinados e individuales, sin duplicarlos
C_historico = F + v * N
R = 500 * I_estandar + 250 * I_piloto + 5 * B
Resultado_simplificado = R - C_historico
Margen_simplificado = Resultado_simplificado / R  # solo si R > 0
```

`I_estandar` e `I_piloto` son contratos de hasta 100 estudiantes cada uno; `B` son suscriptores individuales sin patrocinio. Asegurar que los estudiantes no se cuenten dos veces y que cada contrato respete su cobertura. Un contrato no equivale automáticamente a 100 usuarios activos.

| Escenario mensual histórico | Estudiantes | Ingreso | Costo | Resultado simplificado | Margen |
| --- | ---: | ---: | ---: | ---: | ---: |
| Un piloto con 100 estudiantes | 100 | $250.00 | $245.50 | $4.50 | 1.80% |
| Un contrato estándar con 100 | 100 | $500.00 | $245.50 | $254.50 | 50.90% |
| Dos contratos estándar, 100 por contrato | 200 | $1,000.00 | $259.50 | $740.50 | 74.05% |
| Cien suscriptores individuales sin patrocinio | 100 | $500.00 | $245.50 | $254.50 | 50.90% |

La mejora del último escenario institucional depende de mantener fijos y variable sin cambios; no demuestra que el soporte, revisión o infraestructura escalen así. Los márgenes excluyen partidas todavía no medidas.

- Equilibrio individual simplificado: `techo(F / (5 - v)) = 48` suscriptores, **solo** bajo los supuestos anteriores.
- Un contrato estándar cubriría el costo presupuestado de sus 100 estudiantes. Eso no demuestra que cubra los costos reales de un servicio completo.
- Un piloto con 100 dispone de apenas $4.49917 de holgura: un gasto adicional de $10 lo lleva a una pérdida simplificada de $5.50. Incluso un aumento de 2% en el costo total consume esa holgura.
- Los $1,325.50 de capital inicial del modelo previo incluyen aproximadamente $1,080 de partidas iniciales y $245.50 del primer mes operativo. No volver a sumar ese primer mes al mismo capital. Los montos de formalización y protección de datos siguen siendo estimaciones, no presupuestos profesionales obtenidos.

## Presupuesto que debe reemplazar esos supuestos antes de cobrar

Registrar proveedor, plan, unidad, cantidad, periodicidad, moneda, impuestos, fecha y evidencia para cada partida. Separar efectivo pagado y tiempo aportado por el equipo.

```text
C_mes = hosting + datos/autenticacion + dominio_anual/12 + correo
      + almacenamiento_y_transferencia_no_incluidos + herramientas
      + horas_soporte * tarifa_soporte
      + horas_revision_profesional * tarifa_profesional
      + trabajo_equipo + comisiones_cobro + otros_costos_operativos

C_total_piloto = implementacion_inicial + revision_instrumento
              + costos_del_periodo_piloto + cierre_y_reporte
```

No cobrar dos veces almacenamiento o consumo ya incluido en otro plan. Si se usa IA después, sumar su consumo medido por operación; el cuestionario actual no la necesita. Añadir, cuando corresponda, adquisición de clientes, desplazamientos, accesibilidad, copias de seguridad, incidencias, mantenimiento, impuestos y formalización. Definir los límites de soporte; un precio mensual no implica orientación individual ilimitada.

## Piloto comercial: propuesta y criterios de decisión

El guion de entrevistas, las ofertas A/B/C, la prueba opcional de precios y las plantillas vacías están en [el plan de ejecución del piloto](piloto-y-validacion-comercial.md). Los estímulos de $100/$200/$300 de ese experimento no sustituyen las tarifas propuestas de este documento.

**Diseño recomendado, pendiente de acuerdo:** una institución, una cohorte de 20–30 participantes para el primer aprendizaje y un límite contratado de hasta 100; cuatro semanas de observación. Registrar inicio, fin, total a cobrar, actividades, responsables, prestaciones disponibles y condiciones de cierre. El período de cuatro semanas y el mes de facturación deben reconciliarse en la propuesta, no asumirse equivalentes automáticamente.

Antes de ofertarlo:

1. Realizar 8–10 entrevistas de descubrimiento con instituciones de San Miguel; incluir al menos cuatro personas con autoridad de presupuesto o una ruta clara hacia el decisor. Contrastar problema, proceso actual y qué entrega justificaría el pago. Son metas operativas propuestas, no una muestra representativa del mercado.
2. Presentar una oferta escrita con alcance concreto, precio total, soporte limitado y entregables que el equipo pueda producir. Separar el interés verbal de una carta de interés y de una aceptación pagada.
3. Cotizar la revisión profesional e incluirla en el costo o explicitar que queda fuera del servicio ofertado. No comercializar la prueba como validada si no existe la evidencia correspondiente.
4. Antes de manejar una cohorte real, resolver almacenamiento autorizado, permisos de acceso y recuperación de datos. No prometer seguimiento centralizado a partir de perfiles aislados en cada navegador.

Indicadores sugeridos para acordar **antes** de iniciar; son umbrales de gestión propuestos y se revisan con la institución, no estándares científicos:

| Pregunta | Indicador / registro | Criterio de decisión propuesto |
| --- | --- | --- |
| ¿Se entiende y utiliza el recorrido? | Invitados, quienes empiezan, quienes completan intereses → ruta → proyecto, y causas de abandono. | Buscar que al menos 70% de quienes empiezan complete el recorrido sin asistencia que impida operar a escala; investigar todos los bloqueos. |
| ¿Existe valor después del cuestionario? | Regreso durante la segunda semana y actividad de proyecto. Denominador: quienes iniciaron el piloto. | Objetivos iniciales: 40% vuelve en semana 2 y 30% registra un avance concreto de proyecto. Si no ocurre, investigar valor y barreras antes de ampliar. |
| ¿El estudiante comprende lo que recibe? | Preguntas breves sobre intereses, preparación y ejemplos de ocupaciones. | Corregir cualquier patrón de confusión entre interés, aptitud, certificación y vacante; confianza declarada sola no basta. |
| ¿Hay comprador y disposición de pago? | Oferta, aceptación, monto realmente pagado y condiciones de posible renovación. | Al menos un piloto aceptado y pagado aporta evidencia inicial. La renovación al precio estándar exige una decisión nueva; no contar una carta de interés como ingreso. |
| ¿Es sostenible el servicio? | Facturas, consumo, horas de soporte/revisión, incidencias y costo total por cohorte. | Comparar contra ingreso real; si el costo supera el precio, ajustar alcance, costo o precio antes de repetir. Un piloto de aprendizaje subsidiado debe declararse y financiarse. |

El piloto prueba uso, comprensión y disposición inicial de pago. No establece por sí solo eficacia educativa, reducción de abandono, validez psicométrica ni colocación laboral.

## Preguntas del jurado

**¿Cuánto paga un estudiante?** Hoy no se cobra por el prototipo. El modelo contempla acceso patrocinado sin cargo para el estudiante y $5 mensuales para acceso individual sin patrocinio, sujeto a validar la oferta.

**¿Por qué pagaría una institución si puede encontrar tests gratuitos?** La hipótesis comercial es que valore una experiencia de exploración con proyectos y acompañamiento de cohorte. Debemos demostrar utilidad y capacidad de seguimiento; el precio no se justifica por esconder preguntas detrás de un pago.

**¿Cuánto les cuesta a los fundadores?** El presupuesto previo calcula $245.50 mensuales para cien estudiantes, incluidos $200 asignados al equipo. Es una estimación histórica. El prototipo usa cálculo local sin costo de IA por test; antes de vender mediremos consumo y soporte y cotizaremos revisión profesional. Aún no contamos con un costo total de producción verificado.

**¿El piloto es rentable?** Con el cálculo anterior deja $4.50 antes de omisiones. Esa holgura es insuficiente para absorber costos adicionales sin revisión. Sirve como precio experimental; su viabilidad depende del alcance y costo real.

**¿Ya tienen ventas o instituciones asociadas?** No se acreditan en este documento. Los contratos, cartas de interés y pagos se deben mostrar solo cuando existan; citar una institución como fuente educativa no la convierte en socia.

**¿Cobrarán por generar CV o conseguir empleo?** Esas son posibilidades futuras. No hay generación automática de CV, alianzas de colocación ni tarifa aprobada para ese servicio. Las ocupaciones que aparecen hoy son ejemplos informativos, no vacantes ni promesas de contratación.

## Estado de cierre

- **Preparado:** respuesta de precios consistente, reproducción del presupuesto histórico, referencias públicas actualizadas, fórmulas y diseño de experimento.
- **Pendiente externo:** facturas y plan de la cuenta, cotizaciones de dominio/revisión profesional, acuerdo de duración y alcance del piloto, compradores, pagos y consumo observado.
- **Decisión para la feria:** presentar precios como propuesta y costos como estimación; no afirmar rentabilidad validada ni vender una prueba profesional que aún no existe.
