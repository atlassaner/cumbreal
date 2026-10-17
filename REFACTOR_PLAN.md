# REFACTOR_PLAN.md — Cumbreal SaaS Refactoring & Pipeline Plan

## 1. Executive Summary & Design System Alignment

Cumbreal is an EdTech SaaS platform designed around the **"Midnight Minimal + Editorial"** aesthetic. The goal of this refactoring is to transition the project from a single-page landing showcase into a production-grade, multi-page application with modular routing, client-side session management, an interactive diagnostic onboarding wizard, and an authentic product dashboard.

### Visual Tokens & Guidelines
- **Dark Surfaces:** Obsidian (`#070403`), Charcoal (`#151314`)
- **Light Surfaces:** Ivory (`#F8F6F3`), White (`#FFFEFC` / `#FFFFFF`)
- **Micro-accents (~5% allocation):** Rose (`#DCB5C6`), Deep Rose (`#A66F85`)
- **Muted Text:** Slate (`#817B7A` / `text-slate-cumbreal`)
- **Typography:**
  - Serif headers: DM Serif Display (`font-serif`, `var(--font-dm-serif-display)`)
  - Body & UI: Inter (`font-sans`, `var(--font-inter)`)
- **Core Brand Asset:** 5-Part Aperture Progression SVG (Levels 1 to 5: *Explorador*, *Aprendiz*, *Investigador*, *Especialista*, *Líder*) with dynamic lighting and glow effects.

---

## 2. Codebase Audit & Existing Asset Reuse

### Current State
- **Framework & Router:** Next.js 13.5.1 using the **App Router** (`app/layout.tsx`, `app/page.tsx`).
- **Styling:** Tailwind CSS 3.3.3 + `tailwindcss-animate`, with custom color tokens (`obsidian`, `charcoal`, `ivory`, `rose`, `rose-deep`, `slate-cumbreal`) and keyframe animations (`pulse-glow`, `shimmer`).
- **UI Toolkit:** Complete Radix UI suite (`components/ui/*`), Lucide React icons, Framer Motion 13.2.0.
- **Landing Components:** Encapsulated in `components/cumbreal/`:
  - `aperture.tsx`: SVG aperture renderer supporting levels 1–5, sizing, glow, and labels.
  - `header.tsx`: Navigation bar with sticky blur state and CTA trigger.
  - `hero.tsx`: Editorial hero with primary call-to-action.
  - `dashboard-preview.tsx`: Mock profile card with academic metrics, affinity gauge, and progress bars.
  - `feature-pathways.tsx`: SVG node connector diagram with 3 career pathway cards (*Software*, *Data*, *Robótica*).
  - `feature-evidence.tsx`, `feature-strengths.tsx`, `feature-bridge.tsx`, `footer.tsx`: Marketing story sections.
  - `onboarding-modal.tsx`: Prototype 4-step wizard currently rendered inside a dialog overlay on the home page.

### Recyclable Assets for New Flows
1. **`Aperture` (`components/cumbreal/aperture.tsx`):**
   - Reused across the Auth header/badge, the step-indicator in the Onboarding flow, and the Dashboard profile badge.
2. **`OnboardingModal` Logic (`components/cumbreal/onboarding-modal.tsx`):**
   - Extract the 4-step state machine into a standalone page at `/onboarding`, preserving Framer Motion slide transitions and Step 4 calculation results (Level 3 *Investigador*, 87% Technology Affinity).
3. **`DashboardPreview` & `FeaturePathways`:**
   - Elements will be elevated from static marketing mocks into dynamic, interactive components inside `/dashboard` (greeting, XP counter, progress meters, interactive career nodes).
4. **Shadcn UI Components:**
   - `Input`, `Label`, `Button`, `Card`, `Progress`, `Tabs`, `Separator`, and `DropdownMenu` will power authentication forms and dashboard widgets.

---

## 3. Four-Phase Implementation Plan

### Phase 1: Routing Architecture & Layout Restructuring

#### 1.1 Route Directory Structure
We will establish Next.js App Router route groups and explicit paths:
```
app/
├── (marketing)/
│   ├── page.tsx                      # Landing page (Home)
│   └── layout.tsx                    # Marketing layout (Header + Footer)
├── (auth)/
│   ├── layout.tsx                    # Minimal dark auth layout (bg-obsidian, centered card)
│   ├── login/
│   │   └── page.tsx                  # Login form
│   └── signup/
│       └── page.tsx                  # Signup form
├── onboarding/
│   ├── layout.tsx                    # Focused onboarding shell (minimal header with Aperture)
│   └── page.tsx                      # Full 4-step wizard with step query / state machine
├── dashboard/
│   ├── layout.tsx                    # Authenticated dashboard shell (Sidebar, TopNav, AuthGuard)
│   ├── page.tsx                      # Main overview (Stats, Pathways, Academic Progress)
│   └── pathways/
│       └── page.tsx                  # Deep dive career explorer (Interactive node map)
├── globals.css
└── layout.tsx                        # Global root layout (Fonts, AuthProvider, Toaster)
```

#### 1.2 Layout Responsibilities
- **Root Layout (`app/layout.tsx`):** Maintains DM Serif Display & Inter fonts, wraps children with `AuthProvider`.
- **Marketing Layout (`app/(marketing)/layout.tsx`):** Renders updated `Header` (with functional links to `/login`, `/signup`, and `/onboarding`) and `Footer`.
- **Auth Layout (`app/(auth)/layout.tsx`):** Full-screen dark container (`bg-obsidian`), ambient radial glow background, centered aperture brand badge, and sleek container cards.
- **Dashboard Layout (`app/dashboard/layout.tsx`):** Responsive grid with collapsible dark desktop sidebar (`bg-obsidian`), mobile drawer, top header with notification indicator and user avatar menu.

---

### Phase 2: Authentication System (`/signup` & `/login`)

#### 2.1 State Management & Session Architecture
Create `lib/auth-context.tsx`:
- Lightweight React Context persisted to `localStorage` under key `cumbreal_session`.
- **State Schema:**
  ```ts
  interface UserProfile {
    id: string;
    fullName: string;
    email: string;
    level: 1 | 2 | 3 | 4 | 5;
    levelName: string;
    affinity: {
      category: string;
      percentage: number;
    };
    xp: number;
    isOnboarded: boolean;
  }
  ```
- **Context API:**
  - `user: UserProfile | null`
  - `isAuthenticated: boolean`
  - `login: (email: string, password: string) => Promise<boolean>`
  - `signup: (fullName: string, email: string, password: string) => Promise<boolean>`
  - `logout: () => void`
  - `updateProfile: (data: Partial<UserProfile>) => void`
- Default dummy demo profile seeded automatically if logging in with test credentials (e.g. `eduardo@cumbreal.com`).

#### 2.2 UI & Validation Specifications
- **Cards:** `bg-charcoal/90 border border-white/10 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.5)] rounded-2xl p-8`.
- **Inputs:** Dark style with `bg-obsidian border-white/10 text-ivory placeholder:text-slate-cumbreal/40 focus:border-rose/50 focus:ring-rose/20`.
- **Validation:** Controlled inputs with client-side error states for empty fields, invalid email format, and short passwords (< 6 characters).
- **Navigation Links:**
  - Landing page buttons route to `/login` and `/signup`.
  - Auth switcher links: "Ya tienes cuenta? Inicia sesión" <-> "¿No tienes cuenta? Regístrate".
  - Successful signup immediately redirects to `/onboarding`.
  - Successful login immediately redirects to `/dashboard` (or `/onboarding` if profile is not onboarded).

---

### Phase 3: Interactive Onboarding Pipeline (`/onboarding`)

#### 3.1 State Machine & Steps Breakdown
Convert the wizard into a dedicated, focused page with progress persistence:
- **Step 1: Goal Selection (`Objetivo`)**
  - Options:
    1. *Descubrir mis fortalezas* (Icon: Compass)
    2. *Explorar carreras* (Icon: Route)
    3. *Mejorar mi rendimiento* (Icon: Gauge)
  - Radio-card selection with active rose outline and check indicator.
- **Step 2: Quick Cognitive Diagnostic (`Diagnóstico`)**
  - Logic reasoning prompt with interactive slider (0–100%) and dynamic level preview.
- **Step 3: Algorithmic Calibration (`Análisis`)**
  - Engaging spinning Aperture (`glow=true`, level 5), multi-stage checklist animations with staggered delays simulating AI profiling.
- **Step 4: Result & Pathway Unlocked (`Resultado`)**
  - Triumphant spring entry with Level 3 Aperture (*Investigador*).
  - Category breakdown: **87% Tecnología Affinity**.
  - Action button: *"Ir a mi Dashboard"* -> commits onboarding state to `AuthContext` and pushes to `/dashboard`.

#### 3.2 Motion & Micro-Interactions
- Framer Motion `AnimatePresence` with horizontal slide variants (`x: 40, opacity: 0` -> `x: 0, opacity: 1`).
- Top stepper bar synced with Aperture micro-badge updating level lighting incrementally.

---

### Phase 4: Full Dashboard Application (`/dashboard`)

#### 4.1 Layout & Navigation Shell
- **Desktop Sidebar:**
  - Aperture logo and brand typography.
  - Links: *Panel General*, *Trayectorias*, *Mis Fortalezas*, *Evidencias*, *Configuración*.
  - User status pill: Level 3 badge with XP progress indicator (`420 XP`).
  - Logout action button.
- **Top Header Bar:**
  - Dynamic greeting based on time and user name (*"Hola, Eduardo"*).
  - Quick action to review onboarding results or take new diagnostic modules.

#### 4.2 Interactive Views & Widgets
1. **Academic Evidence Meter:**
   - Reusable `ProgressBar` with live filters: *Matemáticas (84%)*, *Inglés (76%)*, *Programación (91%)*, with ability to toggle views.
2. **Career Pathway Tree (`FeaturePathways` elevated):**
   - SVG interactive connector network displaying node paths (*Software*, *Data*, *Robótica*).
   - Clickable career cards displaying requirements, job market demand, and match percentages.
3. **Cognitive Strength Radar / Aperture Stage:**
   - Prominently showcases user's current rank (*Nivel 3 · Investigador*) with an interactive Aperture that expands level details on hover/click.
4. **Next Step Banner:**
   - Actionable recommendation card with CTA directing to logic exercises.

#### 4.3 Auth Guard & Middleware
- Client-side auth guard in `app/dashboard/layout.tsx`: checks `isAuthenticated`. If unauthenticated after mounting, redirects to `/login?redirect=/dashboard` with a seamless loading placeholder.

---

## 5. Verification & Testing Strategy

1. **Routing Verification:**
   - Verify `/` loads landing page cleanly.
   - Verify `/login` and `/signup` load dark-themed auth forms.
   - Verify `/onboarding` progresses through all 4 steps and updates session.
   - Verify `/dashboard` renders sidebar, widgets, and pathway maps.
2. **State & Session Persistence:**
   - Test signup -> onboarding completion -> dashboard view.
   - Refresh dashboard to confirm session is retained via `localStorage`.
   - Test logout -> verify redirect to `/login` and dashboard lockout.
3. **Responsive & Visual Checks:**
   - Test on desktop (1440px), tablet (768px), and mobile (375px).
   - Ensure strict adherence to color tokens (Obsidian `#070403`, Charcoal `#151314`, Rose `#DCB5C6`, Ivory `#F8F6F3`).
