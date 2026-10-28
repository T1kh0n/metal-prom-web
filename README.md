# Technical Specification & Master Development Plan: B2B CNC Machining Web Platform (`metal-prom-web`)

**Language Directive:** All code comments, commit messages, documentation (`PROJ.md`), test descriptions, and AI agent reasoning must be written **exclusively in English**. All user-facing website content must be written in **professional industrial Russian** tailored for B2B engineering and procurement clients in Kaliningrad Oblast.

---

## 1. Project Overview & Core Objectives

### 1.1. Business Purpose

Build a high-converting, ultra-fast, static B2B web platform for a precision CNC machining workshop in Kaliningrad Oblast. The platform showcases **CNC Turning (`Токарные работы с ЧПУ`)**, **CNC Milling (`Фрезерные работы с ЧПУ`)**, and high-margin cooperative finishing operations (**Precision Grinding $IT6\text{–}IT7$, Gear Cutting, Coordinate Boring, and Heat Treatment**), featuring an **energy-efficient, 100% client-side interactive CNC Cost Calculator** grounded in empirical regional market research (`../market_summary_and_recommendations.md` and `../competitors_flat.csv`).

### 1.2. Target Audience (Kaliningrad Oblast B2B Buyers)

The platform is engineered for Chief Engineers (`Главные инженеры`), Chief Mechanics (`Главные механики`), Technologists, and Procurement Officers (`Отдел снабжения / ОМТС`) across four primary regional sectors:

1. **Shipbuilding, Ship Repair & Port Infrastructure** (Kaliningrad, Svetly, Baltiysk): shafts, Goodrich bushings, flanges, stainless/bronze fittings, rudder pins.
2. **Agro-Industrial Holdings & Food Processing Plants**: emergency replacement parts for imported packaging, bottling, and conveyor lines (gears, sprockets, rollers, caprolon/POM-C guides).
3. **Construction & Heavy Machinery Fleets**: boom pins, hardened bushings, hydraulic cylinder rods, axle thread restoration, line boring.
4. **Industrial Automation, Instrumentation & Electronics R&D**: milled aluminum enclosures (D16T, AMg6), custom heatsinks, precision brackets, rapid functional prototypes.

### 1.3. Key B2B Value Propositions & Legal Posture (Zero Personal Data / 152-FZ Compliance)

- **Batch Focus:** Serial and small-batch manufacturing from **5 to 1,000+ pcs** within **3–5 days** (plus 48-hour emergency breakdown response).
- **Minimum Order Value (MOV):** Strictly **5,000 RUB** for legal entities (filtering out low-margin garage jobs).
- **Full B2B Compliance:** Cashless payments (`Безналичный расчет с НДС / УСН`), Electronic Document Management (`ЭДО`), official Quality Control Passports (`Паспорт качества ОТК`), certified metrology (`Mitutoyo` micrometers, bore gauges, profilometers), raw material melt certificates (`Сертификаты качества на металл`), free DFM (Design for Manufacturing) audit, and contractual SLA penalty guarantees for on-time delivery.
- **Zero Personal Data / No Roskomnadzor Operator Status (Federal Law No. 152-FZ):**
  - The business explicitly does **NOT** collect personal leads and does **NOT** intend to become a registered Personal Data Operator with Roskomnadzor (РКН).
  - Under no circumstances shall the website or any embedded form contain fields for Full Name (`ФИО`), Personal Phone Number (`Телефон`), Personal Email, or Passport/Identity credentials.
  - Any contact option is purely passive: static voluntary email links (`mailto:order@metalprom39.com`) and direct phone numbers for inbound corporate inquiries.

---

## 2. Workspace Topology & Git / Deployment Rules

### 2.1. Directory Separation

- **Root Workspace (`../` — `in_work/machining_workshop_research/`)**:
  - Houses all analytical reports (`market_summary_and_recommendations.md`, `CNC_Workshop_Master_Plan.md`, `variant1..4*.md`), raw CSV datasets (`competitors_flat.csv`, `competitors.csv`, `listings.csv`, `capabilities.csv`), SQLite database (`competitors.db`), and Python scripts.
  - All non-website scripts, external verification logs, or data analysis artifacts must remain in `../`.
- **Web Repository (`./metal-prom-web/`)**:
  - Dedicated Git repository for the SvelteKit static application.
  - Must remain clean, containing only application source code, static assets, automated tests, CI/CD workflows, `README.md`, and `PROJ.md`.

### 2.2. Git & Deployment Policy

1. Commit and push (`git push`) changes to the remote repository at the end of every completed stage.
2. Configure GitHub Actions (`.github/workflows/deploy.yml`) to build, test, and package the static site for GitHub Pages.
3. **Publication Lock:** Do **NOT** trigger live publication to GitHub Pages automatically on push until the user gives the explicit command to publish. Use `workflow_dispatch` or a repository variable guard (`vars.ENABLE_PAGES_DEPLOY == 'true'`) so pushes run CI tests and build verification without publishing prematurely.
4. If the site is already published at the configured domain or GitHub Pages URL, verify live HTTP availability (`200 OK`), response headers, and rendered DOM after pushing.

---

## 3. Technical Stack & Hallmark Design System Architecture

### 3.1. Core Stack

- **Framework:** SvelteKit (Svelte 5 / Runes mode) with `@sveltejs/adapter-static`.
- **Styling:** Tailwind CSS (purged and minified at build time) enforcing industrial Hallmark design guidelines.
- **Package Manager:** `pnpm`.
- **Testing Suite:**
  - **Vitest** for unit testing pricing calculation formulas, CAD parsing routines, environment variable resolution, and JSON-LD schema generators.
  - **Playwright** for end-to-end (E2E) testing, DOM SEO/AEO/GEO validation, accessibility audits, zero-personal-data form assertions, and mobile responsiveness.

### 3.2. Environment-Driven Domain & Branding (`metalprom39.com`)

Because the final company name and domain are still under selection, **zero hardcoded domains or brand names** are allowed in components or static files.

- Define in `.env` and `.env.example`:
  ```env
  PUBLIC_SITE_DOMAIN=https://metalprom39.com
  PUBLIC_SITE_HOST=metalprom39.com
  PUBLIC_BRAND_NAME=МеталлПром39
  PUBLIC_BRAND_LEGAL_NAME=ИП МеталлПром39
  PUBLIC_CONTACT_PHONE=+7 (4012) 00-00-00
  PUBLIC_CONTACT_EMAIL=order@metalprom39.com
  PUBLIC_ADDRESS_LOCALITY=Калининград
  PUBLIC_ADDRESS_REGION=Калининградская область
  PUBLIC_ADDRESS_STREET=ул. Промышленная, 1
  PUBLIC_POSTAL_CODE=236000
  PUBLIC_GEO_LATITUDE=54.7104
  PUBLIC_GEO_LONGITUDE=20.4522
  PUBLIC_OPENING_HOURS=Mo-Fr 08:00-18:00
  PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  PUBLIC_YM_COUNTER_ID=00000000
  PUBLIC_YANDEX_VERIFICATION=
  PUBLIC_GOOGLE_VERIFICATION=
  ```
- Central configuration module `src/lib/config/site.ts` reads these variables and exposes helper functions (`getCanonicalUrl(path)`, `getOgImageUrl(slug)`, `getOrganizationSchema()`, etc.).
- Pre-build script (`scripts/generate-seo-files.js`) dynamically generates `static/robots.txt`, `static/sitemap.xml`, `static/llms.txt`, `static/llms-full.txt`, and `static/CNAME` using `PUBLIC_SITE_DOMAIN` and `PUBLIC_SITE_HOST`.

### 3.3. Design System & Visual Standards — Hallmark Principles (`nutlope/hallmark`)

The web platform represents a heavy industrial CNC workshop, not a consumer SaaS startup. It must strictly adhere to the **Hallmark Design System** principles to eliminate AI-generated visual clichés ("AI-slop"):

#### A. Strictly Forbidden AI Clichés:

- ❌ **NO purple / violet / rainbow gradients:** Avoid `bg-gradient-to-r from-purple-500 to-indigo-600` or text gradient clips (`bg-clip-text text-transparent`).
- ❌ **NO neon glowing drop-shadows:** Avoid `shadow-blue-500/50`, `shadow-cyan-400`, or luminous borders.
- ❌ **NO floating background blur blobs:** Avoid large blurred circles (`blur-3xl bg-blue-500/20 rounded-full`).
- ❌ **NO oversized border radiuses everywhere:** Avoid `rounded-3xl` or bubbly `rounded-full` cards.
- ❌ **NO generic cards with colorful icon circles:** Avoid the ubiquitous 3-column card pattern with centered gradient circles and generic marketing platitudes.

#### B. Mandated Authentic Industrial Hallmark Aesthetics:

- ✅ **High-Density Technical Layout:** Clean, structured, information-dense layouts inspired by technical datasheets (McMaster-Carr, Misumi, Linear Technology).
- ✅ **Monochromatic Precision Palette:** Deep slate/zinc neutral foundation (`bg-zinc-950`, `bg-zinc-900`, `text-zinc-100`, `text-zinc-300`), crisp 1px borders (`border-zinc-800`), and subtle high-contrast technical accents (machined steel amber `text-amber-400` / `border-amber-500/40` or titanium blue).
- ✅ **Monospaced Data & Dimensions:** Strict use of `font-mono` for all quantitative measurements (diameters, lengths, tolerances $\pm 0.01\text{ mm}$, norm-hour rates, batch numbers, mass in kg, and prices).
- ✅ **Structured Data Tables & Blueprint Grids:** Technical comparison tables, tolerance matrices, and subtle CAD grid lines instead of decorative stock photos.

---

## 4. Client-Side CNC Calculator & Zero-Personal-Data Demand Validation Form

### 4.1. Energy-Efficient Client-Side Calculator

The cost calculator executes **100% on the user's device** with near-zero CPU/battery overhead:

1. **$O(1)$ Pure Algebraic Evaluation:** Instant reactive computation without server round-trips or heavy math libraries.
2. **Zero Idle CPU Usage:** Event-driven updates triggered strictly on user input.
3. **Client-Side CAD Parser:** Dedicated Web Worker (`src/lib/workers/cad-parser.worker.ts`) that streams vertices and terminates immediately after returning dimensions $(X, Y, Z, \text{volume})$.
4. **Manual Bounding-Box Fallback:** Direct mm inputs for Length, Width/Diameter, and Height.

### 4.2. Empirical Pricing Algorithm (Kaliningrad Market Benchmarks)

Derived from `../market_summary_and_recommendations.md` and `../competitors_flat.csv`:

1. **Base Norm-Hour Rates ($R\_{\text{op}}$)**:
   - CNC Turning (`lathe_turning`): `2,500 RUB / hour`
   - CNC Milling 3-Axis (`milling_3axis`): `3,000 RUB / hour`
   - CNC Milling 4-Axis / 3D (`milling_4axis`): `3,500 RUB / hour`
   - CAD/CAM Engineering & Reverse Engineering (`engineering`): `2,000 RUB / hour`
2. **Setup & G-Code Preparation Fee ($C\_{\text{setup}}$)**:
   - Simple: `3,000 RUB` | Medium: `4,000 RUB` | Complex: `5,000 RUB`
3. **7 Regional Material Groups ($P\_{\text{kg}}$, Density $\rho$, Machinability $K\_{\text{mat}}$)**:
   - Steel 45 / St20: $\rho = 7.85$, $140\text{ RUB/kg}$, $K_{\text{mat}} = 1.00$
   - Alloy Steel 40Kh / 09G2S: $\rho = 7.85$, $175\text{ RUB/kg}$, $K_{\text{mat}} = 1.15$
   - Stainless Steel 12Kh18N10T / AISI 304: $\rho = 7.90$, $520\text{ RUB/kg}$, $K_{\text{mat}} = 1.45$
   - Aluminum D16T / AMg6: $\rho = 2.78$, $680\text{ RUB/kg}$, $K_{\text{mat}} = 0.85$
   - Brass LS59-1: $\rho = 8.50$, $950\text{ RUB/kg}$, $K_{\text{mat}} = 0.80$
   - Bronze BrAZh9-4: $\rho = 7.50$, $1,150\text{ RUB/kg}$, $K_{\text{mat}} = 1.10$
   - Engineering Plastics (Caprolon PA6 / POM-C): $\rho = 1.30$, $550\text{ RUB/kg}$, $K_{\text{mat}} = 0.75$
   - _Customer Material Option:_ Toggle "Own Material (`Материал заказчика`)", setting $M_{\text{raw}} = 0$.
4. **Tolerance & Finishing Multipliers ($K\_{\text{tol}}$)**:
   - Standard ($IT10\text{–}IT12$, $Ra\,3.2\text{–}6.3$): $1.00\times$
   - Elevated ($IT8\text{–}IT9$, $Ra\,1.6$): $1.25\times$
   - High Precision Grinding ($IT6\text{–}IT7$, $Ra\,0.4\text{–}0.8$): $1.50\times$ (+50% white-space premium)
5. **Cooperative Operations ($C\_{\text{extra}}$)**:
   - Heat Treatment / HFC Hardening: `+350 RUB/pc` (min `2,500 RUB` batch charge)
   - Gear / Spline Cutting: `+600 RUB/pc`
   - Galvanic Coating / Anodizing / Black Oxide: `+200 RUB/pc`
6. **Batch Discounts ($D\_{\text{batch}}$)**:
   - 1–4 pcs: 0% | 5–19 pcs: -10% | 20–49 pcs: -20% | 50–99 pcs: -30% | 100+ pcs: -40%
7. **Urgency Multiplier ($K\_{\text{urg}}$)**:
   - Standard (5–7 days): $1.00\times$ | Express (48–72 hours): $1.50\times$
8. **Minimum Order Value Floor**:
   $$S_{\text{final}} = \max(5000, \text{round}(S_{\text{raw}}, 10))$$

### 4.3. Anonymous B2B Market Research Sheet (Embedded Yandex Forms)

To validate equipment utilization and regional B2B demand without triggering Personal Data Operator obligations under Federal Law No. 152-FZ:

- **Psychological Framing:** Framed as an official industrial document: _«Опросный лист технических требований / Спецификация заказа»_. B2B technologists and procurement officers fill it out to check workshop tooling capacity.
- **Zero Personal Data Fields (Strictly Enforced):** Under NO circumstances shall the form contain fields for name, surname, personal phone, personal email, or company registration numbers.
- **7 Anonymous Technical Fields (Concise Dropdowns/Radios):**
  1. _Категория геометрии детали:_ Тела вращения (валы, оси, втулки, фланцы) / Корпусные и призматические детали / Зубчатые колеса и шлицы / Расточка и ремонт узлов.
  2. _Материал заготовки:_ Конструкционная сталь (Ст45) / Нержавеющая сталь (12Х18Н10Т) / Алюминий (Д16Т) / Бронза / Инженерный пластик (Капролон) / Давальческий металл заказчика.
  3. _Планируемый объем серии:_ 1–4 шт. (опытный образец) / 5–20 шт. (мелкая серия) / 20–100 шт. (партия) / 100+ шт. (контрактная серия).
  4. _Требуемый квалитет и финишная чистота:_ Стандартная точность (IT11–IT12) / Повышенная точность (IT8–IT9) / Прецизионная со шлифовкой (IT6–IT7) / Требуется термообработка ТВЧ.
  5. _Отрасль применения:_ Судостроение и судоремонт / Сельское хозяйство и пищепром / Спецтехника, гидравлика, остовы / Приборостроение и электроника.
  6. _Срок готовности:_ Стандартный производственный (5–7 рабочих дней) / Срочный аварийный ремонт (48–72 часа).
  7. _Географический кластер в Калининградской области:_ Калининград / Светлый / Балтийск / Гурьевск / Другой район области.
- **Submission Response:**
  Display automated confirmation: _«Спецификация принята в аналитический реестр цеха. Предварительный расчет зафиксирован. Для передачи чертежей (PDF, DXF, STEP) направьте файлы на order@metalprom39.com»_.

---

## 5. Information Architecture & Required Routes

Every route features a human-readable clean URL, Breadcrumbs, single `<h1>`, semantic `<h2>`/`<h3>`, descriptive internal links, Schema.org JSON-LD, and 300–500+ words of technical copy:

1. `/` — **Home Page**: High-precision CNC machining in Kaliningrad, Hallmark industrial hero, interactive cost calculator, equipment capabilities, and B2B FAQ.
2. `/tokarnye-raboty-chpu` — **CNC Turning Services**: Shafts, pins, bushings, tolerances to IT7, cross-links to `/portfolio` and `/frezernye-raboty-chpu`.
3. `/frezernye-raboty-chpu` — **CNC Milling Services (3 & 4 Axis)**: Prismatic parts, enclosures, brackets, cross-links to `/portfolio` and `/tokarnye-raboty-chpu`.
4. `/zuboreznye-i-shlifovalnye-raboty` — **Cooperative Finishing Operations**: Gear cutting, precision grinding ($IT6\text{–}IT7$, $Ra\,0.4$), coordinate boring, heat treatment.
5. `/kalkulyator-stoimosti-chpu` — **Dedicated CNC Calculator & Technical Specification Sheet**: Full interactive calculator, unit economics breakdown, downloadable JSON estimate, and embedded anonymous Yandex Form.
6. `/portfolio` — **B2B Case Studies & Realized Parts**: Technical specs, tolerances, materials, and batch lead times for regional marine, agricultural, and industrial parts.
7. `/kontrol-kachestva-i-oborudovanie` — **Quality Control (OTK), Metrology & Machine Park**: Mitutoyo metrology lab, GOST compliance, material certificates, SLA guarantees.
8. `/kontakty` — **Contacts, Corporate Requisites & Logistics**: Address in Kaliningrad Oblast, phone, direct email, working hours, and industrial map.
9. `/stati` — **Technical Engineering Knowledge Base**: High-authority technical articles on machining parameters, material selection, and tolerances for AEO/GEO citation.
10. `/politika-konfidentsialnosti` — **Privacy & Cookie Policy**: Explicit 152-FZ compliance statement declaring zero personal data collection, anonymous cookie usage, and IP-masked Yandex Metrika auditing.
11. `/sitemap` — **HTML Sitemap**: Structured human-readable directory of all pages and services.

---

## 6. Complete 48-Point SEO + AEO + GEO Checklist & Russian Legal Compliance

### Group A: On-Page SEO & Content Semantics

- [ ] **1. Purchase a proper domain:** Parameterized via `PUBLIC_SITE_DOMAIN` (`https://metalprom39.com`).
- [ ] **2. Unique `<title>` ($\le 60$ chars):** Keyword-optimized per route.
- [ ] **3. Meta description ($50\text{–}160$ chars):** Clear B2B call-to-action per route.
- [ ] **4. Single `<h1>` per page with primary keyword:** Exactly 1 `<h1>` element per page.
- [ ] **5. Hierarchical `<h2>` and `<h3>` headings:** Strict semantic hierarchy without skipping levels.
- [ ] **6. 300–500+ words unique text per page:** Verified by automated word-count test.
- [ ] **7. Regional B2B keywords:** Naturally integrated search terms for Kaliningrad Oblast.
- [ ] **23. Link service pages to `/portfolio`:** Contextual cross-links to case studies.
- [ ] **24. Cross-link between service pages:** Mutual links between turning, milling, and grinding.
- [ ] **25. Descriptive anchor text for all links:** Strictly zero vague anchors (_"тут"_, _"подробнее"_).
- [ ] **26. Clean static slugs:** Normalized with `trailingSlash: 'always'`.
- [ ] **33. Regional mentions:** Explicit coverage of Kaliningrad, Guryevsk, Svetly, Baltiysk.
- [ ] **38. B2B customer reviews:** Realistic feedback from regional mechanics and engineers.
- [ ] **43. Breadcrumbs UI + BreadcrumbList:** Visible breadcrumbs with Schema.org markup.
- [ ] **44. `/sitemap` HTML page:** Human-readable directory of all sections.
- [ ] **45. Descriptive `alt` text on images:** Meaningful technical descriptions on all visuals.
- [ ] **46. Social and professional links in footer:** GitHub, Telegram, Habr, B2B directories.

### Group B: Technical SEO, Indexing & Performance

- [ ] **8. Generate `sitemap.xml`:** Automated build-time generation with `<lastmod>` and `<priority>`.
- [ ] **14. Compress images:** Optimized WebP/AVIF (`< 100 KB`) and inline SVGs.
- [ ] **15. Precompression (gzip/brotli):** Built into static build output via `@sveltejs/adapter-static`.
- [ ] **16. Minify CSS and JS:** Enforced in production Vite build.
- [ ] **17. Performance score $\ge 95$:** Verified via Lighthouse / Playwright performance audits.
- [ ] **18. Mobile responsiveness ($320\text{–}2560\text{ px}$):** Zero horizontal overflow, touch targets $\ge 48\text{ px}$.
- [ ] **19. HTTPS certificate enforcement:** Configured via GitHub Pages and upgrade-insecure-requests CSP.
- [ ] **27. Dynamic `robots.txt`:** Points to sitemap and allows search/AI crawlers.
- [ ] **28. No index blocking in `robots.txt`:** Verified by automated crawl tests.
- [ ] **37. OpenGraph and Twitter tags:** Standardized `og:title`, `og:description`, `og:image`, `og:url`.
- [ ] **40. Canonical tags:** Self-referencing canonical URLs on every page.
- [ ] **48. `og:video` and `VideoObject` markup:** Reusable component for machining demo clips.

### Group C: Structured Data (`Schema.org`), AEO & GEO Optimization

- [ ] **20. Schema.org `Organization` markup:** Injected in root layout with NAP and social links.
- [ ] **21. Schema.org `Service` markup:** Structured offers on all service pages.
- [ ] **22. Schema.org `ManufacturingBusiness` markup:** Local business schema with GPS coordinates and hours.
- [ ] **39. Schema.org `AggregateRating` markup:** Rating metrics embedded in business schema.
- [ ] **47. Schema.org `FAQPage` markup:** Structured Q&A blocks for rich snippets.
- [ ] **AEO & GEO Extension (`llms.txt` & Answer Blocks):**
  - Generate `/llms.txt` and `/llms-full.txt` summarizing capabilities and tolerances for AI citation.
  - Direct Answer summary blocks (40–60 words) at the top of service pages.

### Group D: Russian Legal Compliance (152-FZ & 149-FZ) & Webmaster Kits

- [ ] **Zero Personal Data Guarantee (152-FZ):** Automated test asserting zero input fields collecting full name, phone number, personal email, or passport data.
- [ ] **Mandatory Privacy Policy Page (`/politika-konfidentsialnosti`):** Full legal statement on anonymous operation and cookie analytics.
- [ ] **Non-Intrusive Cookie Consent Banner:** Notice informing users of anonymous telemetry.
- [ ] **Yandex Metrika IP Masking:** Configuration ensuring visitor IP addresses are masked.
- [ ] **9 & 11. Yandex.Webmaster kit:** Verification meta tag and sitemap submission guide.
- [ ] **10 & 12. Google Search Console kit:** Verification tag and submission guide.
- [ ] **13. Indexing verification script:** Post-deployment status and canonical check.
- [ ] **29 & 30. Yandex Business Profile kit:** Ready-to-copy NAP and descriptions.
- [ ] **31 & 32. Google Business Profile kit:** Ready-to-copy profile data.
- [ ] **34–36. External directories & backlink kit:** Outreach cards for Obrabotka.net, Pulscen, 2GIS.
- [ ] **41 & 42. Deferred Analytics Loader:** Consent-aware event tracking for calculator and specification interactions.

---

## 7. Phased Implementation Roadmap (Stages 1 to 7)

- **Stage 1: Project Scaffolding, Dynamic Config & Documentation Init** `[COMPLETED]`
  - SvelteKit + TypeScript + Tailwind CSS + adapter-static setup, `.env` dynamic injection, `site.ts`, `schema.ts`, living documentation init.
- **Stage 2: Empirical Pricing Engine & CNC Cost Calculator Core** `[COMPLETED]`
  - Empirical Kaliningrad rates (`pricing-config.ts`), $O(1)$ pricing engine (`engine.ts`), Web Worker CAD parser (`cad-parser.worker.ts`), Svelte 5 component (`CostCalculator.svelte`), unit & E2E tests.
- **Stage 2.1: Lightweight Client-Side STL Streaming Parser & Bounding Box Enhancement** `[COMPLETED]`
  - Ultra-lightweight $O(N)$ binary/ASCII STL streaming parser using typed arrays, robust mobile parsing, and manual dimension override synchronization.
- **Stage 3: Core B2B Pages & Hallmark Technical Articles (`/stati`)** `[COMPLETED]`
  - Header, Footer, Breadcrumbs, 9 core B2B service pages, and technical articles (`/stati`), designed strictly according to Hallmark rules (no AI gradients, high data density, technical typography).
- **Stage 4: Anonymous Demand Validation (Yandex Forms), Privacy Policy & 152-FZ Compliance** `[PENDING]`
  - Embedded anonymous Yandex Form (7 technical fields), Privacy Policy route (`/politika-konfidentsialnosti`), Cookie Consent Banner, deferred Yandex Metrika with IP masking, and SEO file generator (`robots.txt`, `sitemap.xml`, `llms.txt`).
- **Stage 5: Comprehensive Automated Testing Suite (48-Point SEO/AEO/GEO & Compliance Audit)** `[PENDING]`
  - Playwright and Vitest test suites verifying all 48 checklist points, zero personal data input assertion, mobile ergonomics, and performance budgets.
- **Stage 6: Hallmark UI/UX Polish Audit & CI/CD Pipeline Setup** `[PENDING]`
  - Strict audit removing any residual AI visual artifacts, contrast verification, and GitHub Actions CI/CD pipeline with gated deployment locks.
- **Stage 7: Post-Deployment Live Verification & Search Engine Audit** `[PENDING]`
  - Verification on live host: HTTP 200 checks, HTTPS/CSP headers, live sitemap ping, and indexation checks in Google and Yandex.
