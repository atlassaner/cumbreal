# Vocational interest assessment

Implemented October 15, 2026. Entry point: `/onboarding`; saved results and educational routes: `/dashboard/pathways`.

## Evaluation of the supplied specification

The 18-item, six-dimension structure and the supplied centroid vectors are implemented. This is a custom RIASEC-based interest exploration tool, not a psychometrically validated test. O*NET documents evidence for its own 30/60/180-item instruments; that evidence does not validate Cumbreal's 18 questions or editorial centroids. A Salvadoran validation study and counselor review remain necessary before making stronger assessment claims.

Each dimension uses `(sum of its three answers - 3) / 12`. Matches use cosine similarity multiplied by 100 and rounded for display. Sorting uses unrounded similarity, then pathway ID for reproducibility. A percentage expresses directional similarity, not an admission, career-success, aptitude, or employment probability. The six bars are normalized self-reported interest, not population percentiles.

Supplied Holland codes conflicted with the vectors. Codes are now derived from centroid rankings: software ICA, health SIC, design AES, energy RIC, business ECS, agriculture RIE, tourism SEA, logistics CEI. Equal weights keep RIASEC order; student ties are explicitly labeled.

A zero vector safely yields cosine zero. Equal scores across all six areas, or no dimension above the neutral midpoint, produce no personalized ranking or Holland code. These users may still browse and select any of the eight routes. This intentionally prevents cosine's scale invariance from presenting weak or uniform interests as strong personal recommendations.

Differentiated results include the top three plus one distinct discovery outside that group, using the student's second-ranked area. Prefer a remaining trajectory whose top three dimensions contain that area; otherwise choose the remaining trajectory with the greatest weight for that area. If only one area is positive, no secondary-interest discovery is invented.

## Salvadoran catalog

Each trajectory includes BTV, technical and university alternatives, official source links, a starter project, portfolio evidence and three skills. These are educational alternatives rather than a mandatory ladder or a guaranteed place. Users are asked to confirm campus, availability, costs, scholarships and admissions with institutions. No employment or salary forecasts are inferred.

Sources consulted on October 15, 2026:

- RIASEC framework: https://www.onetcenter.org/reports/IP_Manual.html
- BTV catalog (published in 2020, labeled as historical in the interface): https://www.mined.gob.sv/0000/00/00/oferta-academica-del-bachillerato-tecnico-vocacional/
- ITCA: https://www.itca.edu.sv/portal-nuevo-ingreso/carreras-tecnicas.html
- UES: https://eel.ues.edu.sv/ingreso/ingreso/index/categoria/415
- UCA: https://uca.edu.sv/charlas-informativas-de-carreras/
- UDB: https://www.udb.edu.sv/udb/pagina/nuevoingreso/programa_orientacion_carrera
- IEPROES: https://www.ieproes.edu.sv/cursos/tecnico-en-enfermeria/
- ENA: 2026 admission catalog, linked directly in the agroindustry route. Its technical agronomy program is three years, not a generic two-year program.
- UFG: https://ufg.edu.sv/carreras/licenciatura-en-administracion-y-gestion-de-destinos-turisticos

Unverified program/institution pairings from the original specification were replaced with supported listings. Catalog links are a dated editorial snapshot and are not automatically refreshed.

## Persistence and account boundaries

The completed diagnosis is stored within each existing local account profile: schema/catalog version, 18 answers, normalized vector, Holland code, tie/status flags, eight ranked matches when informative, top-three IDs, discovery ID/dimension, chosen pathway and completion timestamp. Derived fields are recomputed from validated answers when read. The latest result replaces the previous result; longitudinal history is not yet stored.

Signed-in questionnaire drafts are keyed by account ID. Guest drafts and the explicit signup handoff use sessionStorage in the current tab. Only a newly created account consumes the guest result; signing into an existing account discards the guest handoff rather than overwriting that account's results. The handoff is consumed after successful signup. Old placeholder goal/confidence drafts are not imported. Existing users without a RIASEC result see an invitation to complete the new questionnaire.

Retakes and trajectory changes preserve activities, profile level and XP. Completing the first assessment establishes a minimum of 50 base XP; subsequent saves do not add rewards. Deleting a profile also removes that profile's questionnaire draft. Storage errors keep responses visible and show an actionable message.

All storage remains local to the browser, without server authentication, device synchronization or protection against someone with access to that browser. No new dependencies were added.

## Verification

`npm run test:diagnosis` runs the pure-function tests, including 1,000 deterministic generated answer profiles. `npm run build`, `npm run lint` and `npm run typecheck` cover the application.

Browser verification used installed Microsoft Edge through Playwright because the Browser plugin is not installed. Tested guest questionnaire → results → selection → signup → saved dashboard, two distinct accounts, reloads, login restoration, retakes, preserved higher XP/level/progress, native keyboard radio navigation and simulated storage-write failures. Screenshots and the browser QA script are kept outside the repository in the task's visualization directory.
