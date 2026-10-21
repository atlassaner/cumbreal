# Cumbreal

Spanish-language educational guidance prototype for students and institutions in El Salvador. The corrected V2 design uses a cream editorial interface and Cumbi mountain-explorer artwork reconstructed from the supplied v2.1 references.

## Run locally

```powershell
npm install
npm run dev
```

Open [the local app](http://localhost:3000). For a production-mode preview, run `npm run build` then `npm start`.

## Validation

```powershell
npm run build
npm run lint
npm run typecheck
npm run test:diagnosis
node unslop/v2-contrast-stress.cjs
```

Additional repeatable browser checks are in `unslop/v2-browser-stress.cjs` and `unslop/verify-pass.cjs`. They use Playwright supplied by the Codex runtime and installed Microsoft Edge; no browser dependency was added to the project. Set NODE_PATH to the bundled module directory in this environment before running them. Their production preview uses port 3100.

## Vocational interest assessment

The onboarding questionnaire now has 18 RIASEC-based items, six interest scores, cosine matching against eight Salvadoran trajectories, transparent results, educational sources and a selectable starter project. Answers and results persist separately for each local profile. Uniform or low-interest answers do not receive a forced ranking. This custom adaptation is not psychometrically validated. See [method, source review and persistence details](docs/vocational-diagnosis.md).

The older visual/stress scripts below predate the new questionnaire and three-to-eight trajectory expansion; their previous onboarding expectations are historical. Use the diagnosis tests above for current scoring checks.

## Occupational exploration available now

Each of the eight trajectories includes three static occupation examples, preparation to explore, and a link to a Salvadoran institution's graduate profile or curriculum. The panel appears on the homepage, in the selected questionnaire result, and in the dashboard's trajectory explorer. Where relevant, it also describes a self-employment or entrepreneurship possibility.

Occupation examples belong to the selected educational trajectory. They do not introduce another RIASEC-to-job scoring algorithm or claim that an interest profile establishes suitability for a profession. Preparation is an editorial summary of training profiles, not a verified set of employer hiring requirements. There are no live vacancies, salary forecasts, employer integrations, applications or placement guarantees. Starter projects and XP do not certify occupational competence.

The catalog is in `lib/occupations.ts`; the shared interface is `components/cumbreal/occupation-panel.tsx`. Sources were consulted on October 20, 2026. The ENA occupational reference is explicitly labeled as a historical 2023 catalog. The institutions cited are information sources, not Cumbreal partners. See [occupational sources and scope](docs/occupational-exploration.md).

## Future direction: preparation and connection to employment

The longer-term proposal is to accompany students from interest exploration through practical projects to employment preparation, including students in higher education, egresados and graduates. Future links to El Salvador's education and employment ecosystem would depend on actual institutional and employer partnerships.

1. **Current prototype — explore occupations.** Connect the existing eight routes to sourced examples and preparation. This phase is implemented; it does not provide job placement.
2. **After a pilot — draft a CV from a portfolio.** Help a student generate an editable CV from their recorded education, projects and explicitly supported skills. Include interests as preferences, separately from demonstrated abilities. Require student review; never invent experience, qualifications or proficiency from a RIASEC score, XP or simulated evidence review. The generation method, including whether AI is needed, remains to be evaluated.
3. **With institutional partners — support preparation.** Explore authorized human review of evidence, CV feedback and interview practice. Establish which institution verifies each claim, how students consent to sharing, and what a reviewer or employer can access before connecting services.
4. **With verified opportunities and employer partners — facilitate placement processes.** Explore internships, supervised referrals and applications to relevant local opportunities. Let students review and authorize each submission. Separate referrals, interviews, offers and sustained employment when reporting outcomes; placement remains an intended service, not a guaranteed result or a present capability.

Employment, independent services and entrepreneurship are possible routes. Their relevance depends on the student's stage, preparation, preferences and available opportunities. No employer partnerships, automatic CV generation or placement pipeline are implemented today.

## Working hypotheses and how to evaluate them

These are product and impact hypotheses, not findings established by this prototype.

| Hypothesis | Mechanism to investigate | Evidence to collect |
| --- | --- | --- |
| H1. Exploring interests alongside educational options and a small project can support a more informed choice. | Students can compare expectations with an actual activity before making a larger commitment. | Before/after understanding of alternatives, ability to explain a choice, project participation and follow-up decisions. Confidence alone is insufficient. |
| H2. Relevant occupation examples can help connect education to possible work. | Students can identify tasks and preparation associated with a route. | Comprehension tasks and usefulness feedback, segmented by general/technical bachillerato and higher-education stage. Check that students distinguish examples from vacancies. |
| H3. A portfolio-based, student-reviewed CV can make achievements easier to communicate. | Concrete project evidence may help students describe work they have actually done. | CV completion time, unsupported-claim rate, reviewer corrections and student/employer feedback, compared with the existing process. |
| H4. Institutional and employer partnerships can improve access to suitable opportunities. | Reviewed evidence and explicit requirements could make referrals more relevant. | Verified opportunity availability, partner participation, eligible referrals, interviews, offers and employment retention. A referral count is not proof of placement. |
| H5. Offering employment, freelancing and entrepreneurship pathways may serve different student goals. | Students are not required to treat salaried employment as their only destination. | Pathway preferences, project follow-through and barriers such as training, equipment, financing and market access. Interest in entrepreneurship is not proof of business viability. |
| H6. Better-informed decisions may reduce avoidable changes of route and associated personal or educational costs. | Early exploration could reveal mismatched expectations sooner. | Longitudinal reasons for changes, completion and costs, with an appropriate comparison. Account for finances, access, academic preparation and family circumstances. Changing a route is not automatically a failure. |
| H7. Institutions may pay for cohort-level guidance support while students access initial exploration freely. | Coordinators may value actionable summaries and professional support. | Buyer interviews, permitted pilot participation, letters of interest and paid commitments. This is a business-model experiment, not an implemented offer or proof of willingness to pay. |

The defensible central proposition is that accessible guidance, practical exploration and clearer connections to education and work may improve decision quality. The current prototype does not establish reductions in dropout, scholarship displacement, public-budget waste, productivity losses or changes in GDP. Not earning a credential does not mean all learning or investment was wasted. National graduation and education-budget figures require properly defined populations, periods and sources before use.

Professional review of the questionnaire, local psychometric validation, usability, market demand and employment outcomes require different evidence. An established RIASEC instrument's evidence does not automatically validate Cumbreal's adapted questions or editorial route mapping. Charging for an assessment or receiving positive demo feedback does not establish assessment validity.

## Prototype boundaries

Profiles and per-profile activities live only in this browser. Passwords are checked against a salted local PBKDF2 verifier; browser storage can be edited and this is not production authentication. Use test data and a disposable test password. Sign out or delete a local profile from the sidebar. New profiles do not import older shared demo records.

Google OAuth, password-reset email, institutional form submission, server persistence, authorized evidence review, and scientifically validated career matching are not connected. The interface explicitly represents these limits. Evidence verification is a clearly labeled local simulation.

## Design and delivery evidence

- `unslop/LANE.md`: authorized corrected design direction and tokens.
- `unslop/V2-REVIEW.md`: Antigravity claims challenged and corrected.
- `unslop/DESIGN-AUDIT.md`: original 43/100 audit, retained for comparison.
- `unslop/RETHEME-REPORT.md`: final checks and remaining limitations.
- `unslop/CLIENT-REPORT.html`: visual before/after report.

No new npm dependencies were introduced for this redesign.

The repository's original New Hemisphere Learning concept is retained in [historical project origins](docs/project-origins.md). Its proposed integrations and AI features describe the earlier vision, not current capabilities.
