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

### 1.3. Key B2B Value Propositions (Anti-Garage Positioning)

- **Batch Focus:** Serial and small-batch manufacturing from **5 to 1,000+ pcs** within **3–5 days** (plus 48-hour emergency breakdown response).
- **Minimum Order Value (MOV):** Strictly **5,000 RUB** for legal entities (filtering out low-margin garage jobs).
- **Full B2B Compliance:** Cashless payments (`Безналичный расчет с НДС / УСН`), Electronic Document Management (`ЭДО`), official Quality Control Passports (`Паспорт качества ОТК`), certified metrology (`Mitutoyo` micrometers, bore gauges, profilometers), raw material melt certificates (`Сертификаты качества на металл`), free DFM (Design for Manufacturing) audit, and contractual SLA penalty guarantees for on-time delivery.

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

## 3. Technical Stack & Dynamic Environment Architecture

### 3.1. Core Stack

- **Framework:** SvelteKit (Svelte 5 / Runes or clean Svelte 4 reactive stores) with `@sveltejs/adapter-static`.
- **Styling:** Tailwind CSS (purged and minified at build time) or zero-runtime scoped CSS with industrial dark/high-contrast B2B engineering aesthetics.
- **Package Manager:** `pnpm` (or `npm`).
- **Testing Suite:**
  - **Vitest** for unit testing pricing calculation formulas, environment variable resolution, and JSON-LD schema generators.
  - **Playwright** for end-to-end (E2E) testing, DOM SEO/AEO/GEO validation, accessibility checks, and mobile responsiveness.

### 3.2. Environment-Driven Domain & Branding (`metalprom39.com`)

Because the final company name and domain are still under selection, **zero hardcoded domains or brand names** are allowed in components or static files.

- Define in `.env` and `.env.example`:
  ```env
  PUBLIC_SITE_DOMAIN=[https://metalprom39.com](https://metalprom39.com)
  PUBLIC_SITE_HOST=metalprom39.com
  PUBLIC_BRAND_NAME=МеталлПром39
  PUBLIC_BRAND_LEGAL_NAME=ИП МеталлПром39
  PUBLIC_CONTACT_PHONE=+7 (4012) 00-00-00
  PUBLIC_CONTACT_EMAIL=order@metalprom39.com
  PUBLIC_ADDRESS_LOCALITY=Калининград
  PUBLIC_ADDRESS_REGION=Калининградская область
  PUBLIC_ADDRESS_STREET=ул. Промышленная, 1
  PUBLIC_POSTAL_CODE=236000
  PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  PUBLIC_YM_COUNTER_ID=00000000
  ```
- Create a central configuration module `src/lib/config/site.ts` that reads these variables and exposes helper functions (`getCanonicalUrl(path)`, `getOgImageUrl(slug)`, `getOrganizationSchema()`, etc.).
- Implement a Vite build plugin or pre-build script (`scripts/generate-seo-files.js`) that dynamically generates `static/robots.txt`, `static/sitemap.xml`, `static/llms.txt`, and `static/CNAME` using `PUBLIC_SITE_DOMAIN` and `PUBLIC_SITE_HOST`.

---

## 4. Energy-Efficient Client-Side CNC Cost Calculator Specification

### 4.1. Energy Efficiency & Green Computing Principles

The cost calculator must execute **100% on the user's device** with near-zero CPU/battery overhead:

1. **$O(1)$ Algebraic Evaluation:** Instant reactive computation using pure arithmetic functions. No server round-trips, no polling intervals, no heavy runtime libraries.
2. **Zero Idle CPU Usage:** Event-driven updates triggered strictly on user input (`input`/`change` events), debounced at `150ms` for text fields.
3. **Optional Lightweight File Parsing:** If the user attaches a `.STL` or `.STEP` file for bounding-box estimation, parse file headers/vertices asynchronously inside a dedicated Web Worker (`src/lib/workers/cad-parser.worker.ts`) that terminates immediately after returning dimensions `(X, Y, Z, volumeCm3)`, preventing main-thread blocking and battery drain.
4. **System Font Stack & SVG Icons:** Use inline SVGs and optimized WOFF2/system fonts to minimize network transfer and GPU rasterization energy.

### 4.2. Empirical Pricing Algorithm (Derived from Kaliningrad Market Research)

Based on `../market_summary_and_recommendations.md` and `../competitors_flat.csv` (87 regional competitors, 114 listings, where raw median price is distorted at 500 RUB by clickbait placeholders, cleaned regional median is 2,025 RUB, workshop cleaned median is 1,375 RUB, and commercial hourly rates span 2,500–5,000 RUB/hr):

1. **Base Norm-Hour Rates ($R\_{\text{op}}$)**:
   - **CNC Turning (`lathe_turning`)**: `2,500 RUB / hour`
   - **CNC Milling 3-Axis (`milling_3axis`)**: `3,000 RUB / hour`
   - **CNC Milling 3D / 4-Axis (`milling_4axis`)**: `3,500 RUB / hour`
   - **CAD/CAM Programming & Reverse Engineering (`engineering`)**: `2,000 RUB / hour`
2. **Setup & G-Code Preparation Fee ($C\_{\text{setup}}$)**:
   - Simple geometry: `3,000 RUB` (amortized across batch size $N$).
   - Medium geometry (multi-step turning/milling): `4,000 RUB`.
   - Complex 3D/4-axis contour or custom fixture: `5,000 RUB`.
3. **Material Cost & Machinability Coefficient ($K\_{\text{mat}}$, Blank Density $\rho$, & Regional Price per kg $P\_{\text{kg}}$)**:
   - **Steel 45 / St20 (`Сталь 45 / Ст20`)**: $\rho = 7.85\text{ g/cm}^3$, $P_{\text{kg}} = 140\text{ RUB/kg}$, $K_{\text{mat}} = 1.00$
   - **Alloy Steel 40Kh / 09G2S (`Сталь 40Х / 09Г2С`)**: $\rho = 7.85\text{ g/cm}^3$, $P_{\text{kg}} = 175\text{ RUB/kg}$, $K_{\text{mat}} = 1.15$
   - **Stainless Steel 12Kh18N10T / AISI 304 (`Нержавеющая сталь`)**: $\rho = 7.90\text{ g/cm}^3$, $P_{\text{kg}} = 520\text{ RUB/kg}$, $K_{\text{mat}} = 1.45$
   - **Aluminum D16T / AMg6 (`Алюминий Д16Т / АМг6`)**: $\rho = 2.78\text{ g/cm}^3$, $P_{\text{kg}} = 680\text{ RUB/kg}$, $K_{\text{mat}} = 0.85$
   - **Brass LS59-1 (`Латунь ЛС59-1`)**: $\rho = 8.50\text{ g/cm}^3$, $P_{\text{kg}} = 950\text{ RUB/kg}$, $K_{\text{mat}} = 0.80$
   - **Bronze BrAZh9-4 (`Бронза БрАЖ9-4`)**: $\rho = 7.50\text{ g/cm}^3$, $P_{\text{kg}} = 1,150\text{ RUB/kg}$, $K_{\text{mat}} = 1.10$
   - **Engineering Plastics — Caprolon PA6 / Polyacetal POM-C (`Капролон ПА6 / ПОМ-С`)**: $\rho = 1.15\text{–}1.41\text{ g/cm}^3$, $P_{\text{kg}} = 550\text{ RUB/kg}$, $K_{\text{mat}} = 0.75$
   - _Customer Material Option:_ Users can toggle "Own Material (`Материал заказчика`)", setting $M_{\text{raw}} = 0$.
4. **Tolerance & Surface Finish Multipliers ($K\_{\text{tol}}$)**:
   - Standard ($IT10\text{–}IT12$, $Ra\,3.2\text{–}6.3$): $K_{\text{tol}} = 1.00$
   - Elevated Precision ($IT8\text{–}IT9$, $Ra\,1.6$): $K_{\text{tol}} = 1.25$
   - High Precision + Cooperative Grinding ($IT6\text{–}IT7$, $Ra \le 0.4\text{–}0.8$): $K_{\text{tol}} = 1.50$ (reflecting the 50% high-margin grinding premium identified in regional white-space analysis).
5. **Additional Cooperative Operations ($C\_{\text{extra}}$ per piece)**:
   - Heat Treatment / HFC Hardening (`Термообработка / Закалка ТВЧ`): `+350 RUB/pc` (min `2,500 RUB` batch charge).
   - Gear / Spline Cutting (`Нарезка зуба / шлицев`): `+600 RUB/pc`.
   - Galvanic Coating / Anodizing / Black Oxide (`Воронение / Цинкование / Анодирование`): `+200 RUB/pc`.
6. **Batch Volume Discount ($D\_{\text{batch}}$ on machining cycle time)**:
   - $1\text{–}4\text{ pcs}$: $D_{\text{batch}} = 1.00$
   - $5\text{–}19\text{ pcs}$: $D_{\text{batch}} = 0.90$ (-10%)
   - $20\text{–}49\text{ pcs}$: $D_{\text{batch}} = 0.80$ (-20%)
   - $50\text{–}99\text{ pcs}$: $D_{\text{batch}} = 0.70$ (-30%)
   - $100+\text{ pcs}$: $D_{\text{batch}} = 0.60$ (-40%)
7. **Urgency Multiplier ($K\_{\text{urg}}$)**:
   - Standard Lead Time (5–7 business days): $K_{\text{urg}} = 1.00$
   - Express / Emergency Breakdown (48–72 hours): $K_{\text{urg}} = 1.50$ (+50%)
8. **Final Mathematical Formula**:
   $$\text{Blank Mass } m_{\text{blank}} = V_{\text{bounding}} \times \rho \times 1.15 \text{ (sawing & allowance factor)}$$
   $$\text{Unit Machining Cost } C_{\text{mach}} = T_{\text{base\_cycle}} \times R_{\text{op}} \times K_{\text{mat}} \times K_{\text{tol}} \times D_{\text{batch}}$$
   $$\text{Raw Total } S_{\text{raw}} = \left[ C_{\text{setup}} + N \times \left( M_{\text{raw}} + C_{\text{mach}} + C_{\text{extra}} \right) \right] \times K_{\text{urg}}$$
   $$\text{Final Quote } S_{\text{final}} = \max(5000, \text{round}(S_{\text{raw}}, 10))$$
   - If $S_{\text{raw}} < 5,000\text{ RUB}$, display the calculated breakdown alongside a clear B2B notice: _"Минимальная сумма заказа для юридических лиц составляет 5 000 ₽ (включает подготовку управляющей программы ЧПУ, настройку станка и контроль ОТК). Рекомендуем увеличить партию до X шт. для снижения цены за деталь до Y ₽."_

---

## 5. Information Architecture & Required Pages (Human-Readable URLs)

Every page must have a human-readable URL (Checklist #26), Breadcrumbs (Checklist #43), 300–500+ words of unique Russian B2B technical text (Checklist #6), a single `<h1>` with the primary keyword (Checklist #4), structured `<h2>`/`<h3>` subheadings (Checklist #5), internal cross-links with descriptive anchor text (Checklist #23, #24, #25), and full Schema.org + OpenGraph metadata:

1. `/` — **Home Page**: High-precision CNC machining in Kaliningrad, interactive cost calculator preview, B2B industry solutions (shipbuilding, agro, special machinery, instrumentation), equipment & metrology showcase, client reviews, and FAQ.
2. `/tokarnye-raboty-chpu` — **CNC Turning Services**: Shafts, bushings, flanges, threaded adapters, tolerances, materials, link to `/portfolio` and `/frezernye-raboty-chpu`.
3. `/frezernye-raboty-chpu` — **CNC Milling Services (3-Axis & 4-Axis)**: Enclosures, plates, molds, complex 3D surfaces, keyways, link to `/portfolio` and `/tokarnye-raboty-chpu`.
4. `/zuboreznye-i-shlifovalnye-raboty` — **High-Margin Cooperative Operations (Gear Cutting, Precision Grinding $IT6\text{–}IT7$, Heat Treatment, Line Boring)**: Addressing Kaliningrad's biggest capability gap.
5. `/kalkulyator-stoimosti-chpu` — **Dedicated Interactive CNC Cost Calculator & DFM Quote Request Page**: Full multi-parameter calculator, instant unit/batch economics breakdown, printable/downloadable PDF/JSON quote summary, and drawing upload form.
6. `/portfolio` — **Portfolio & B2B Case Studies**: Completed regional projects (shiprepair bronze bushings, agricultural combine shafts, precision aluminum instrument housings) with tolerances, cycle times, and links back to service pages.
7. `/kontrol-kachestva-i-oborudovanie` — **Quality Control (OTK), Metrology & Machine Park**: Mitutoyo metrology lab, GOST compliance, material certificates, SLA guarantees.
8. `/kontakty` — **Contacts, Requisites & Industrial Map**: Address in Kaliningrad Oblast, phone, email, working hours, legal requisites (ИП / УСН / НДС readiness), interactive scheme.
9. `/sitemap` — **HTML Sitemap Page** (Checklist #44): Structured human-readable directory of all sections, services, and technical guides.

---

## 6. Complete 48-Point SEO + AEO + GEO Checklist & Technical Implementation

The AI agent must implement, document in `PROJ.md`, and verify (via automated Playwright/Vitest tests and manual/live checks) all 48 items below, plus AEO/GEO extensions:

### Group A: On-Page SEO & Content Semantics

- [ ] **1. Purchase a proper domain:** Configured dynamically via `PUBLIC_SITE_DOMAIN` (defaulting to `https://metalprom39.com`) and `static/CNAME` generation for seamless switching once purchased.
- [ ] **2. Unique `<title>` for each page (up to 60 characters):** Strictly $\le 60$ characters per route, dynamically incorporating regional & service keywords. Tested via Playwright across all routes.
- [ ] **3. Meta description for each page (up to 160 characters):** Strictly $50\text{–}160$ characters per route with clear B2B call-to-action. Tested via Playwright.
- [ ] **4. Single `<h1>` per page with primary keyword:** Exactly `1` `<h1>` element per page containing the target Russian keyword (e.g., _«Токарные работы на станках с ЧПУ в Калининграде»_). Tested via Playwright (`expect(await page.locator('h1').count()).toBe(1)`).
- [ ] **5. Hierarchical `<h2>` and `<h3>` headings:** Proper semantic nesting without skipping heading levels.
- [ ] **6. 300–500+ words of unique text on each page:** Every indexable page must contain at least 300–500 words of substantive, unique engineering content in Russian (verified by automated word-count test in Playwright/Vitest).
- [ ] **7. Target keyword phrases integrated naturally:** Include regional B2B search queries (_«механообработка ЧПУ Калининград»_, _«токарные работы ЧПУ на заказ»_, _«фрезеровка металла по чертежам»_, _«изготовление валов и шестерен Калининград»_, _«изготовление деталей по образцу с НДС»_).
- [ ] **23. Link from service pages to `/portfolio`:** Every service page (`/tokarnye-raboty-chpu`, `/frezernye-raboty-chpu`, `/zuboreznye-i-shlifovalnye-raboty`) must link directly to relevant case studies on `/portfolio`.
- [ ] **24. Cross-link between service pages:** Mutual contextual links between CNC turning, CNC milling, gear cutting/grinding, and the cost calculator.
- [ ] **25. Descriptive anchor text for all links:** Strictly forbid vague anchors like _"тут"_, _"здесь"_, _"подробнее"_. Use descriptive keyword-rich anchors (e.g., _«рассчитать стоимость токарной обработки ЧПУ»_, _«примеры выполненных фрезерных работ в портфолио»_). Tested via automated DOM link audit.
- [ ] **26. Human-readable URLs (Clean Slugs):** Clean static routes (`/tokarnye-raboty-chpu` instead of `?id=123`), with `trailingSlash: 'always'` or consistent canonical resolution for GitHub Pages.
- [ ] **33. Mention city and region in content:** Explicit mentions of _Калининград_, _Калининградская область_, _Гурьевск_, _Светлый_, _Балтийск_ across all pages.
- [ ] **38. Customer reviews on the site:** Dedicated B2B testimonials section featuring realistic engineering feedback from regional industrial segments (chief mechanics, procurement leads).
- [ ] **43. Breadcrumbs navigation:** Visible UI breadcrumb trail on all inner pages paired with `Schema.org/BreadcrumbList` JSON-LD.
- [ ] **44. `/sitemap` HTML page:** Dedicated `/sitemap` route linking to all primary sections, services, calculator, and legal info.
- [ ] **45. Descriptive `alt` text on all images:** Every `<img>` and inline visual diagram must have a non-empty, descriptive Russian `alt` attribute (e.g., `alt="Токарная обработка вала из стали 45 на станке с ЧПУ с контролем микрометром"`). Tested via Playwright.
- [ ] **46. Social media & professional links in footer:** Footer links to GitHub, LinkedIn, Habr, Medium, Telegram, and industry directories.

### Group B: Technical SEO, Indexing & Performance

- [ ] **8. Generate `sitemap.xml`:** Automated build-time generation of `static/sitemap.xml` listing all canonical URLs with `<lastmod>`, `<changefreq>`, and `<priority>`.
- [ ] **14. Compress images:** Convert all raster images to optimized WebP/AVIF (`< 100 KB` per image) and use lightweight inline SVGs for technical diagrams, with `loading="lazy"`, `width`, and `height` attributes to prevent CLS.
- [ ] **15. Enable gzip/brotli compression on hosting:** GitHub Pages serves gzip/brotli automatically; additionally configure pre-compressed asset generation in Vite/SvelteKit (`vite-plugin-compression`) for maximum transfer efficiency.
- [ ] **16. Minify CSS and JS:** Enforced via Vite production build (`esbuild`/`terser` minification, CSS tree-shaking).
- [ ] **17. Verify speed via PageSpeed Insights / Lighthouse:** Target score $\ge 95/100$ on Performance, Accessibility, Best Practices, and SEO. Include automated Lighthouse CI / Playwright performance budget assertions.
- [ ] **18. Verify mobile version via Mobile-Friendly Test:** Responsive viewport (`320px` to `2560px`), touch targets $\ge 48\times48\text{ px}$, zero horizontal overflow tested in Playwright mobile emulation (`iPhone 14`, `Pixel 7`).
- [ ] **19. Activate HTTPS certificate:** Enforced in GitHub Pages settings and via `<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">` + `https://` canonical URLs.
- [ ] **27. Create `robots.txt` in root:** Dynamically generated at `/robots.txt` pointing to `Sitemap: ${PUBLIC_SITE_DOMAIN}/sitemap.xml` and allowing all search & AI crawlers (`Googlebot`, `Yandex`, `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`).
- [ ] **28. Ensure important pages are not blocked in `robots.txt`:** Automated test verifying that all routes in `sitemap.xml` are explicitly permitted by `robots.txt` rules and have `<meta name="robots" content="index, follow">`.
- [ ] **37. OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`) in `<head>`:** Present on every page along with `og:type`, `og:locale="ru_RU"`, and Twitter Card tags.
- [ ] **40. Canonical tags (`<link rel="canonical">`) on all pages:** Self-referencing canonical URLs using `PUBLIC_SITE_DOMAIN` on every route to prevent duplicate content issues.
- [ ] **48. `og:video` markup (if video is used):** Reusable `<VideoSchema>` component that automatically injects `og:video`, `og:video:type`, `og:video:width`, `og:video:height`, and `Schema.org/VideoObject` whenever a machining process video is embedded.

### Group C: Structured Data (`Schema.org` JSON-LD), AEO & GEO Optimization

- [ ] **20. Schema.org `Organization` markup:** Injected globally in root layout with name, URL, logo, contactPoint, and `sameAs` social/professional profile URLs.
- [ ] **21. Schema.org `Service` markup:** Injected on `/tokarnye-raboty-chpu`, `/frezernye-raboty-chpu`, and `/zuboreznye-i-shlifovalnye-raboty` with serviceType, provider, areaServed (`Калининградская область`), and `offers` price specifications (`2500 RUB/hr`, `3500 RUB/hr`, `minPrice: 5000 RUB`).
- [ ] **22. Schema.org `LocalBusiness` (`ManufacturingBusiness`) markup:** Complete local business entity with Kaliningrad address, geo coordinates (`54.7104, 20.4522`), telephone, openingHoursSpecification (`Mo-Fr 08:00-18:00`), and priceRange (`₽₽`).
- [ ] **39. Schema.org `AggregateRating` markup for reviews:** Embedded within `LocalBusiness` / `Service` schemas reflecting customer review ratings.
- [ ] **47. Schema.org `FAQPage` markup:** Structured Q&A blocks on Home and Service pages answering direct B2B questions (minimum order value, tolerances, lead times, working with VAT, material certificates).
- [ ] **AEO & GEO Extension (`llms.txt` & Answer Blocks):**
  - Generate `/llms.txt` and `/llms-full.txt` in Markdown format summarizing company capabilities, exact CNC machine tolerances ($IT6\text{–}IT7$, $\pm 0.01\text{ mm}$), material table, hourly pricing formulas, and contact endpoints so AI engines (ChatGPT, Claude, Perplexity, Yandex Neuro, Google AI Overviews) cite the workshop as the primary regional authority.
  - Include concise 40–60 word "Direct Answer" summary callouts at the top of each service page for Featured Snippets and voice/AI search extraction.

### Group D: Analytics, Webmaster Tools, Off-Page & Local Directory Readiness

For external registration steps (items 9–13, 29–32, 34–36, 41–42), the agent must implement all required code hooks, verification meta tags, and ready-to-copy submission kits documented in `PROJ.md`:

- [ ] **9 & 11. Yandex.Webmaster registration & `sitemap.xml` submission:** Support `PUBLIC_YANDEX_VERIFICATION` meta tag in `<head>` + automated post-deploy ping/check script and submission instructions in `PROJ.md`.
- [ ] **10 & 12. Google Search Console registration & `sitemap.xml` submission:** Support `PUBLIC_GOOGLE_VERIFICATION` meta tag in `<head>` + submission guide in `PROJ.md`.
- [ ] **13. Check indexing errors:** Automated script (`scripts/verify-live-seo.js`) that crawls the deployed site and checks HTTP status codes, canonical consistency, `X-Robots-Tag`, and live search engine visibility (`site:metalprom39.com`).
- [ ] **29 & 30. Yandex Business Directory (`Яндекс.Бизнес / Справочник`) profile kit:** Pre-formatted NAP (Name, Address, Phone, Description, Categories, YML service feed) generated in `PROJ.md`.
- [ ] **31 & 32. Google Business Profile (`Google My Business`) kit:** Complete structured NAP, business categories, services list, and working hours prepared in `PROJ.md`.
- [ ] **34. External profiles (`Habr`, `Medium`, `LinkedIn`, `GitHub`):** Configured in footer and `Organization.sameAs` schema + profile bio templates in `PROJ.md`.
- [ ] **35 & 36. Authoritative industrial directories & partner backlinks (`Obrabotka.net`, `Pulscen`, `2GIS`, Kaliningrad Chamber of Commerce):** Outreach templates and directory listing cards generated in `PROJ.md`.
- [ ] **41 & 42. Install Yandex.Metrika & Google Analytics 4 + Event Tracking:** Lightweight, consent-friendly / deferred analytics loader tracking key B2B conversion goals (`calculator_used`, `quote_submitted`, `drawing_attached`, `phone_clicked`, `email_clicked`).

---

## 7. Living Documentation Specification (`metal-prom-web/PROJ.md`)

The AI agent must maintain `metal-prom-web/PROJ.md` as the single source of truth for the human developer. It must contain:

1. **Stage Progress Tracker:** Table showing Stages 1–7 with status (`COMPLETED`, `IN_PROGRESS`, `PENDING`), commit hash, and date.
2. **Architecture & Configuration Guide:**
   - Exact file paths for changing the domain/brand (`.env`, `src/lib/config/site.ts`).
   - Exact file paths for modifying SEO titles, descriptions, keywords, and JSON-LD schemas (`src/lib/seo/`).
   - Exact file paths and parameter explanations for tuning CNC Cost Calculator hourly rates, material prices, and batch discounts (`src/lib/calculator/pricing-config.ts`).
3. **48-Point SEO/AEO/GEO Compliance Matrix:** Table mapping all 48 items to their implementation file, automated test file, and verification status.
4. **External Submissions & Directory Kit:** Ready-to-paste texts for Yandex.Webmaster, Google Search Console, Yandex.Business, Google Business Profile, and B2B industrial directories.

---

## 8. Phased Implementation Plan (Stages 1 to 7)

### Stage 1: Project Scaffolding, Dynamic Config & Documentation Init

- Initialize SvelteKit project in `metal-prom-web/` with `@sveltejs/adapter-static`, TypeScript, Tailwind CSS, Vitest, and Playwright.
- Create `.env` and `.env.example` with `PUBLIC_SITE_DOMAIN=https://metalprom39.com` and all B2B metadata variables.
- Implement `src/lib/config/site.ts` and `src/lib/seo/schema.ts`.
- Create `metal-prom-web/PROJ.md` with initial architecture documentation and tracker.
- Write unit tests verifying environment config resolution. Commit and push.

### Stage 2: Empirical Pricing Engine & Energy-Efficient CNC Calculator

- Extract benchmark figures from `../market_summary_and_recommendations.md` and `../competitors_flat.csv` into `src/lib/calculator/pricing-config.ts`.
- Build pure $O(1)$ pricing functions (`src/lib/calculator/engine.ts`) supporting CNC Turning (`2,500 RUB/hr`), CNC Milling (`3,000–3,500 RUB/hr`), CAD/CAM Engineering (`2,000 RUB/hr`), setup amortization (`3,000–5,000 RUB`), 7 material groups, 3 tolerance tiers ($IT10\text{–}IT12$ up to $IT6\text{–}IT7$ grinding), cooperative operations, batch discounts (up to 40%), urgency multipliers, and the `5,000 RUB` Minimum Order Value floor.
- Build the interactive UI component (`src/lib/components/CostCalculator.svelte`) + optional Web Worker for STL/STEP bounding-box estimation.
- Write comprehensive Vitest unit tests validating all pricing edge cases and MOV enforcement. Update `PROJ.md`, commit, and push.

### Stage 3: Core B2B Pages, Unique Technical Copy (300–500+ Words) & Internal Linking

- Implement layout (`Header`, `Footer` with social links, `Breadcrumbs` component).
- Build all 9 required routes (`/`, `/tokarnye-raboty-chpu`, `/frezernye-raboty-chpu`, `/zuboreznye-i-shlifovalnye-raboty`, `/kalkulyator-stoimosti-chpu`, `/portfolio`, `/kontrol-kachestva-i-oborudovanie`, `/kontakty`, `/sitemap`).
- Write 300–500+ words of unique, authoritative Russian B2B engineering copy on every page incorporating Kaliningrad regional keywords, equipment specs, and B2B trust triggers.
- Implement strict cross-linking between service pages and `/portfolio` using descriptive anchor texts (Checklist #23, #24, #25), customer reviews (Checklist #38), and FAQ sections (Checklist #47).
- Update `PROJ.md`, commit, and push.

### Stage 4: Full SEO, AEO & GEO Engine (`Schema.org`, `sitemap.xml`, `robots.txt`, `llms.txt`)

- Implement reusable `<SeoHead>` component enforcing unique `<title>` ($\le 60$ chars), `<meta name="description">` ($\le 160$ chars), canonical URLs, OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`, conditional `og:video`), and verification meta tags.
- Inject structured JSON-LD (`Organization`, `LocalBusiness`, `Service`, `AggregateRating`, `FAQPage`, `BreadcrumbList`).
- Create build-time generator (`scripts/generate-seo-files.js`) producing `static/robots.txt`, `static/sitemap.xml`, `static/llms.txt`, `static/llms-full.txt`, and `static/CNAME` from `PUBLIC_SITE_DOMAIN`.
- Integrate deferred Yandex.Metrika and GA4 event tracking (`src/lib/analytics/tracker.ts`).
- Update `PROJ.md`, commit, and push.

### Stage 5: Automated Testing Suite (48-Point SEO/AEO/GEO & Performance Validation)

- Write automated Playwright and Vitest test suites (`tests/seo-checklist.spec.ts`, `tests/calculator.spec.ts`, `tests/accessibility-mobile.spec.ts`) that programmatically verify every testable item of the 48-point checklist across all 9 routes:
  - Title length $\le 60$, Meta Description length $\le 160$, single `<h1>`, word count $\ge 300$, valid JSON-LD parsing, presence of canonical & OG tags, non-empty `alt` on all images, descriptive anchor texts, working internal links, mobile viewport responsiveness, and valid `robots.txt` / `sitemap.xml` / `llms.txt`.
- Run full static build (`pnpm build`) and execute all tests until 100% green. Update `PROJ.md`, commit, and push.

### Stage 6: GitHub Actions CI/CD Pipeline Setup (Gated Deployment)

- Create `.github/workflows/ci-deploy.yml`:
  - Runs unit tests, Playwright SEO/E2E tests, and static build verification on every push.
  - Configures GitHub Pages deployment job gated behind `workflow_dispatch` or `vars.ENABLE_PAGES_DEPLOY == 'true'` so live publication happens **only** after explicit user command.
- Update `PROJ.md` with deployment activation instructions, commit, and push.

### Stage 7: Post-Deployment Live Verification & Search Engine Audit

- _Executed once the user authorizes live hosting:_
- Run `scripts/verify-live-seo.js` against the live domain (`PUBLIC_SITE_DOMAIN`) to verify HTTP 200 responses, HTTPS certificate validity, gzip/brotli headers, live `robots.txt` and `sitemap.xml` accessibility, PageSpeed/Lighthouse metrics, and live indexing status in Google and Yandex.
- Finalize `PROJ.md` audit report, commit, and push.
