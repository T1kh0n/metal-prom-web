# Living Architecture & Implementation Reference (`PROJ.md`)

This document is the living reference manual and development log for `metal-prom-web`. All updates, architectural specifications, file maps, configuration instructions, Russian legal compliance (152-FZ & 149-FZ), Hallmark design system rules, and 48-Point SEO/AEO/GEO verification statuses are tracked here.

---

## 1. Stage Progress Tracker

|     Stage     | Title                                                                           |    Status     | Completion Date | Git Commit Hash | Scope Summary                                                                                                                                                                                                                                                                                                            |
| :-----------: | :------------------------------------------------------------------------------ | :-----------: | :-------------: | :-------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  **Stage 1**  | Project Scaffolding, Dynamic Config & Documentation Init                        | **COMPLETED** |   2026-10-27    |    `e4d0e0b`    | Initialized SvelteKit (Svelte 5 Runes, TypeScript, `@sveltejs/adapter-static`), Tailwind CSS, Vitest, Playwright. Configured `.env`, `.env.example`, `src/lib/config/site.ts`, and `src/lib/seo/schema.ts` with dynamic domain/brand injection. Unit tests passing.                                                      |
|  **Stage 2**  | Empirical Pricing Engine & CNC Cost Calculator Core                             | **COMPLETED** |   2026-10-27    |    `bd99134`    | Implemented empirical Kaliningrad pricing engine (`src/lib/calculator/pricing-config.ts`, `engine.ts`) with $O(1)$ arithmetic, auto-terminating Web Worker CAD parser (`src/lib/workers/cad-parser.worker.ts`), reactive UI (`src/lib/components/CostCalculator.svelte`), 8 Vitest unit tests, and Playwright E2E tests. |
| **Stage 2.1** | Lightweight Client-Side STL Streaming Parser & Bounding Box Enhancement         |   `PENDING`   |        —        |        —        | Implement optimized $O(N)$ binary/ASCII STL streaming parser using typed arrays with minimal memory footprint, mobile browser stability, and tight synchronization with manual dimension inputs.                                                                                                                         |
|  **Stage 3**  | Core B2B Pages & Hallmark Technical Articles (`/stati`)                         |   `PENDING`   |        —        |        —        | Build Header, Footer, Breadcrumbs, 9 core B2B service routes, and technical articles (`/stati`) strictly following Hallmark design standards (no AI gradients, high information density, technical typography).                                                                                                          |
|  **Stage 4**  | Anonymous Demand Validation (Yandex Forms), Privacy Policy & 152-FZ Compliance  |   `PENDING`   |        —        |        —        | Embed anonymous 7-field Yandex Form (Market Research RFQ sheet), create `/politika-konfidentsialnosti`, Cookie Consent Banner, configure deferred Yandex Metrika with IP masking, and SEO file generation (`robots.txt`, `sitemap.xml`, `llms.txt`).                                                                     |
|  **Stage 5**  | Comprehensive Automated Testing Suite (48-Point SEO/AEO/GEO & Compliance Audit) |   `PENDING`   |        —        |        —        | Full Playwright and Vitest automated assertions covering all 48 checklist points, zero personal data input verification, mobile ergonomics, and performance budgets.                                                                                                                                                     |
|  **Stage 6**  | Hallmark UI/UX Polish Audit & CI/CD Pipeline Setup                              |   `PENDING`   |        —        |        —        | Audit removing any residual AI visual artifacts, contrast verification, and GitHub Actions CI/CD pipeline with gated deployment locks.                                                                                                                                                                                   |
|  **Stage 7**  | Post-Deployment Live Verification & Search Engine Audit                         |   `PENDING`   |        —        |        —        | Live HTTP/200 verification, HTTPS, compression headers, live sitemap ping, and Google/Yandex indexing audit.                                                                                                                                                                                                             |

---

## 2. Russian Federal Law Compliance Posture (152-FZ & 149-FZ)

### 2.1. Zero-Personal-Data Operating Model

To eliminate regulatory overhead, liability, and the requirement to register as a Personal Data Operator with Roskomnadzor (РКН) under Russian Federal Law No. 152-FZ:

1. **Absolute Restriction on Personal Data Collection:**
   - Under no circumstances shall the website contain input fields collecting:
     - Full Name (`ФИО`, `Имя`, `Фамилия`)
     - Personal Telephone Numbers (`Телефон`, `Номер моб.`)
     - Personal Email Addresses (`Email`, `Электронная почта`)
     - Passport, national identity, or home address credentials.
2. **Strict Test Assertion (Stage 5 Verification):**
   - Playwright automated tests (`tests/compliance-152fz.spec.ts`) crawl all forms and input elements across every route, verifying that `input[type="tel"]`, fields labeled with personal identifiers, or lead-capture forms do not exist anywhere on the platform.
3. **Passive Inbound B2B Communication:**
   - Contact with the workshop is initiated voluntarily by corporate buyers through static, passive links:
     - Corporate Email: `order@metalprom39.com` (plain `mailto:` link)
     - Workshop Dispatch Phone: `+7 (4012) 00-00-00` (plain `tel:` link)
     - Direct Electronic Document Management (`Диадок / СБИС`): Corporate INN lookup.

### 2.2. Anonymous Embedded Yandex Form Specification

- **Target Route:** `/kalkulyator-stoimosti-chpu` (and embedded modal on service pages).
- **Document Title & Psychological Framing:**
  _«Опросный лист технических требований / Спецификация заказа»_
  Structured to emulate an official technical requisition sheet for Chief Engineers, Technologists, and Procurement Leads.
- **Strictly Anonymous 7 Technical Form Fields:**
  1. **Категория геометрии детали (Select / Radio):**
     - Тела вращения (валы, оси, втулки, фланцы, штуцеры)
     - Корпусные и призматические детали (плиты, корпуса, кронштейны)
     - Зубчатые колеса и шлицевые соединения
     - Восстановление и расточка узлов спецтехники
  2. **Материал заготовки (Select / Radio):**
     - Конструкционная сталь (Сталь 45 / Ст20)
     - Легированная сталь (Сталь 40Х / 09Г2С)
     - Коррозионностойкая нержавеющая сталь (12Х18Н10Т / AISI 304)
     - Алюминиевые сплавы (Д16Т / АМг6)
     - Цветные сплавы (Латунь ЛС59-1 / Бронза БрАЖ9-4)
     - Инженерные пластики (Капролон ПА6 / ПОМ-С)
     - Давальческий металл заказчика
  3. **Планируемый объем серии (Select / Radio):**
     - 1–4 шт. (опытный образец / прототип)
     - 5–19 шт. (мелкосерийная партия)
     - 20–49 шт. (серийная партия)
     - 50–99 шт. (средняя серия)
     - 100+ шт. (крупносерийный контракт)
  4. **Требуемый квалитет и финишная обработка (Select / Radio):**
     - Стандартная точность (IT10–IT12, Ra 3.2–6.3)
     - Повышенная точность (IT8–IT9, Ra 1.6)
     - Прецизионная со шлифованием (IT6–IT7, Ra 0.4–0.8)
     - Требуется объемная термообработка / закалка ТВЧ
  5. **Отраслевой сектор применения (Select / Radio):**
     - Судостроение, судоремонт и портовая инфраструктура
     - Агропромышленный комплекс и пищевое машиностроение
     - Строительная, дорожная и карьерная спецтехника
     - Приборостроение, электроника и промышленная автоматизация
  6. **Желаемый срок поставки (Select / Radio):**
     - Стандартный производственный цикл (5–7 рабочих дней)
     - Срочный / аварийный ремонт (48–72 часа)
  7. **Географический кластер в Калининградской области (Select / Radio):**
     - г. Калининград
     - г. Светлый / пос. Волочаевское
     - г. Балтийск
     - г. Гурьевск и Гурьевский район
     - Другой район Калининградской области
- **Automated Confirmation Message:**
  _«Спецификация принята в аналитический реестр цеха. Предварительный расчет зафиксирован. Для передачи чертежей (PDF, DXF, STEP) направьте файлы на order@metalprom39.com»_.

### 2.3. Yandex Metrika IP Masking & Cookie Telemetry

- **Yandex Metrika Initialization Parameters:**
  - `webvisor: false` (avoids capturing keystrokes or DOM interactions).
  - `accurateTrackBounce: true`.
  - `trackHash: true`.
  - IP masking active in Yandex Metrika counter settings.
- **Mandatory Privacy Policy Page:** `/politika-konfidentsialnosti` ("Политика конфиденциальности и использования файлов cookie").
- **Cookie Consent Banner:** Lightweight bottom bar notifying visitors of anonymous performance cookies.

---

## 3. Hallmark Design System Standards (`nutlope/hallmark`)

The web platform is designed for industrial B2B decision-makers. It avoids startup clichés and implements high-density engineering aesthetics.

### 3.1. Forbidden Visual Clichés & CSS Patterns

| Cliché Element                | Disallowed CSS / Utility Pattern                                              | Approved Industrial Alternative                                                                                          |
| :---------------------------- | :---------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **Purple/Violet Gradients**   | `bg-gradient-to-r from-purple-* to-indigo-*`, `bg-clip-text text-transparent` | Solid high-contrast text (`text-white`, `text-zinc-100`) or subtle steel amber badge (`text-amber-400`).                 |
| **Glowing Dropshadows**       | `shadow-blue-500/50`, `shadow-amber-500/50`, neon glows                       | Crisp 1px borders (`border-zinc-800`), deep elevation shadow (`shadow-xl bg-zinc-900/90`).                               |
| **Floating Background Blobs** | `blur-3xl bg-blue-500/20 rounded-full`, animated gradient orbs                | Clean matte background (`bg-zinc-950`) or subtle CAD grid overlay (`bg-[radial-gradient(#27272a_1px,transparent_1px)]`). |
| **Bubbly Rounded Radiuses**   | `rounded-3xl`, `rounded-full` on cards                                        | Crisp industrial corners (`rounded-lg`, `rounded-xl`, `rounded-md`).                                                     |
| **Generic Icon Circles**      | Circular colored icon backgrounds with vague marketing blurbs                 | Informative data tables, tolerance matrices, and real equipment specifications.                                          |

### 3.2. Mandatory Design Rules

1. **Information-Dense Datasheet Layouts:** Modeled after technical component suppliers (McMaster-Carr, Misumi, Linear Technology).
2. **Monospaced Data:** All numeric values, dimensions ($L \times W \times H\text{ mm}$), tolerances ($IT6\text{–}IT7$, $\pm 0.01\text{ mm}$), hourly rates, batch quantities, and prices MUST use `font-mono`.
3. **Monochromatic Neutral Palette:**
   - Backgrounds: `bg-zinc-950`, `bg-zinc-900`, `bg-zinc-900/50`.
   - Borders: `border-zinc-800`, `border-zinc-700/80`.
   - Primary Text: `text-zinc-100`, `text-white`.
   - Secondary Text: `text-zinc-400`, `text-zinc-500`.
   - Highlighting / Accents: Machined brass/amber (`text-amber-400`, `border-amber-500/40`, `bg-amber-500/10`) or cold technical blue.

---

## 4. Developer Configuration Guide

### 4.1. Changing Domain, Brand Name, or Contact Details

All branding, regional data, and contact endpoints are dynamic and decoupled from source code.

- **Environment Configuration (`.env` and `.env.example`)**:
  - `PUBLIC_SITE_DOMAIN`: Canonical origin URL (e.g., `https://metalprom39.com`). Note: do not add a trailing slash here; canonical helpers format URLs automatically.
  - `PUBLIC_SITE_HOST`: Domain host name without protocol (e.g., `metalprom39.com`).
  - `PUBLIC_BRAND_NAME`: Public brand name (e.g., `МеталлПром39`).
  - `PUBLIC_BRAND_LEGAL_NAME`: Full legal entity name (e.g., `ИП МеталлПром39` or `ООО БалтЧПУМастер`).
  - `PUBLIC_CONTACT_PHONE`: Formatted business phone number (e.g., `+7 (4012) 00-00-00`).
  - `PUBLIC_CONTACT_EMAIL`: Order and technical quote email (e.g., `order@metalprom39.com`).
  - `PUBLIC_ADDRESS_LOCALITY`: Primary city (e.g., `Калининград`).
  - `PUBLIC_ADDRESS_REGION`: Region (e.g., `Калининградская область`).
  - `PUBLIC_ADDRESS_STREET`: Production workshop address (e.g., `ул. Промышленная, 1`).
  - `PUBLIC_POSTAL_CODE`: Postal code (e.g., `236000`).
  - `PUBLIC_GEO_LATITUDE` & `PUBLIC_GEO_LONGITUDE`: Precise GPS coordinates (`54.7104`, `20.4522`).
  - `PUBLIC_OPENING_HOURS`: Working hours specification (`Mo-Fr 08:00-18:00`).
  - `PUBLIC_GA_MEASUREMENT_ID`: Google Analytics 4 ID (`G-XXXXXXXXXX`).
  - `PUBLIC_YM_COUNTER_ID`: Yandex.Metrika counter ID (`00000000`).
  - `PUBLIC_YANDEX_VERIFICATION`: Yandex Webmaster HTML tag code.
  - `PUBLIC_GOOGLE_VERIFICATION`: Google Search Console verification code.

- **Central Configuration Module (`src/lib/config/site.ts`)**:
  - Contains default fallbacks in `DEFAULT_SITE_CONFIG`.
  - Exposes `resolveSiteConfig(overrides?)` for environment extraction and testing.
  - Exposes `getCanonicalUrl(path, baseDomain?)` for canonical URL resolution with `trailingSlash: 'always'`.
  - Exposes `getOgImageUrl(slug, baseDomain?)` for OpenGraph images.

### 4.2. Modifying Structured Data (`Schema.org` JSON-LD)

- **File Path:** `src/lib/seo/schema.ts`
- Generates strongly-typed JSON-LD schemas:
  - `createOrganizationSchema(config?)`: Organization profile, contact points, and verified social media links.
  - `createLocalBusinessSchema(config?)`: `ManufacturingBusiness` local business entity with geo-coordinates, address, operating hours, and customer rating.
  - `createServiceSchema(params, config?)`: Standard B2B industrial service description with hourly rate offers and minimum order value (5,000 RUB).
  - `createBreadcrumbSchema(items, config?)`: Breadcrumb trail for inner pages.
  - `createFaqSchema(faqs)`: FAQPage structured question-and-answer pairs.
  - `createVideoSchema(video, config?)`: VideoObject metadata for process videos.
  - `serializeJsonLd(schema)`: Safe serializer for `<script type="application/ld+json">`.

### 4.3. Modifying CNC Calculator Rates & Formulas (Stage 2 Reference)

- **File Path:** `src/lib/calculator/pricing-config.ts`
  - `OPERATIONS`:
    - `lathe_turning`: `2,500 RUB / hour`, default 0.25h cycle
    - `milling_3axis`: `3,000 RUB / hour`, default 0.35h cycle
    - `milling_4axis`: `3,500 RUB / hour`, default 0.50h cycle
    - `engineering`: `2,000 RUB / hour`, default 1.0h
  - `SETUP_COMPLEXITIES`:
    - `simple`: `3,000 RUB` (standard 1–2 setups)
    - `medium`: `4,000 RUB` (stepped contours, threading)
    - `complex`: `5,000 RUB` (3D/4-axis, custom fixtures)
  - `MATERIALS`:
    - `steel_45`: $\rho = 7.85$, $140\text{ RUB/kg}$, $K_{\text{mat}} = 1.00$
    - `alloy_steel_40kh`: $\rho = 7.85$, $175\text{ RUB/kg}$, $K_{\text{mat}} = 1.15$
    - `stainless_steel_304`: $\rho = 7.90$, $520\text{ RUB/kg}$, $K_{\text{mat}} = 1.45$
    - `aluminum_d16t`: $\rho = 2.78$, $680\text{ RUB/kg}$, $K_{\text{mat}} = 0.85$
    - `brass_ls59`: $\rho = 8.50$, $950\text{ RUB/kg}$, $K_{\text{mat}} = 0.80$
    - `bronze_brazh`: $\rho = 7.50$, $1,150\text{ RUB/kg}$, $K_{\text{mat}} = 1.10$
    - `plastic_caprolon_pom`: $\rho = 1.30$, $550\text{ RUB/kg}$, $K_{\text{mat}} = 0.75$
  - `TOLERANCES`:
    - `standard` ($IT10\text{–}IT12$, $Ra\,3.2\text{–}6.3$): $1.00\times$
    - `elevated` ($IT8\text{–}IT9$, $Ra\,1.6$): $1.25\times$
    - `high_precision_grinding` ($IT6\text{–}IT7$, $Ra\,0.4\text{–}0.8$): $1.50\times$ (includes cooperative cylindrical/surface grinding)
  - `COOPERATIVE_OPERATIONS`:
    - `heat_treatment`: $+350\text{ RUB/pc}$ (min batch charge $2,500\text{ RUB}$)
    - `gear_cutting`: $+600\text{ RUB/pc}$
    - `galvanic_coating`: $+200\text{ RUB/pc}$
  - `BATCH_DISCOUNT_TIERS`:
    - $1\text{–}4\text{ pcs}$: $0\%$
    - $5\text{–}19\text{ pcs}$: $10\%$
    - $20\text{–}49\text{ pcs}$: $20\%$
    - $50\text{–}99\text{ pcs}$: $30\%$
    - $100+\text{ pcs}$: $40\%$
  - `URGENCIES`:
    - `standard`: $1.00\times$ (5–7 business days)
    - `express`: $1.50\times$ (48–72 hours emergency response)
  - `MINIMUM_ORDER_VALUE`: Strictly `5,000 RUB`.
- **Calculation Engine:** `src/lib/calculator/engine.ts`
  - Exposes `calculateCncQuote(input)` returning unit economics, component breakdown, batch savings, and minimum order threshold recommendations.
- **Web Worker CAD Parser:** `src/lib/workers/cad-parser.worker.ts` & `src/lib/workers/cad-parser.ts`
  - Parses binary STL, ASCII STL, and STEP files asynchronously with zero main-thread jank, terminating immediately after returning bounding dimensions.
- **UI Component:** `src/lib/components/CostCalculator.svelte`
  - Interactive Svelte 5 component with real-time recalculation, file drag-and-drop, B2B MOV advisory banner, and downloadable JSON quote estimate.

---

## 5. 48-Point SEO/AEO/GEO & Legal Compliance Matrix

|    #     | Item Name & Goal                                                      | Implementation File                                   | Verification File                    |     Status      | Notes                                              |
| :------: | :-------------------------------------------------------------------- | :---------------------------------------------------- | :----------------------------------- | :-------------: | :------------------------------------------------- |
|  **1**   | Proper Domain Setup                                                   | `src/lib/config/site.ts`, `.env`                      | `src/lib/config/site.spec.ts`        |  **COMPLETED**  | Fully parameterized via `PUBLIC_SITE_DOMAIN`.      |
|  **2**   | Unique `<title>` ($\le 60$ chars)                                     | `src/lib/components/SeoHead.svelte` (Stage 4)         | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 4 deliverable.                               |
|  **3**   | Meta description ($50\text{–}160$ chars)                              | `src/lib/components/SeoHead.svelte` (Stage 4)         | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 4 deliverable.                               |
|  **4**   | Single `<h1>` per page with primary keyword                           | `src/routes/**/+page.svelte` (Stage 3)                | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 3 deliverable.                               |
|  **5**   | Hierarchical `<h2>` and `<h3>` headings                               | `src/routes/**/+page.svelte` (Stage 3)                | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 3 deliverable.                               |
|  **6**   | 300–500+ words unique text per page                                   | `src/routes/**/+page.svelte` (Stage 3)                | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 3 deliverable.                               |
|  **7**   | Target B2B keyword phrases integrated                                 | Content files (Stage 3)                               | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 3 deliverable.                               |
|  **8**   | Generate `sitemap.xml`                                                | `scripts/generate-seo-files.js` (Stage 4)             | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 4 deliverable.                               |
|  **9**   | Yandex.Webmaster registration                                         | `PROJ.md` Section 6 & `.env`                          | Inspection / ping script             | **IN_PROGRESS** | Meta tag hook ready; instructions prepared.        |
|  **10**  | Google Search Console registration                                    | `PROJ.md` Section 6 & `.env`                          | Inspection / ping script             | **IN_PROGRESS** | Meta tag hook ready; instructions prepared.        |
|  **11**  | Submit `sitemap.xml` to Yandex                                        | `PROJ.md` Section 6                                   | Verification script                  |    `PENDING`    | Awaiting live deploy authorization.                |
|  **12**  | Submit `sitemap.xml` to Google                                        | `PROJ.md` Section 6                                   | Verification script                  |    `PENDING`    | Awaiting live deploy authorization.                |
|  **13**  | Check indexing errors                                                 | `scripts/verify-live-seo.js` (Stage 7)                | Live script check                    |    `PENDING`    | Stage 7 deliverable.                               |
|  **14**  | Compress images (WebP/AVIF, `< 100 KB`)                               | `static/images/` (Stage 3)                            | Automated file-size audit            |    `PENDING`    | Stage 3 deliverable.                               |
|  **15**  | Enable gzip/brotli precompression                                     | `vite.config.ts`, `@sveltejs/adapter-static`          | Static build output check            |  **COMPLETED**  | `precompress: true` active in adapter-static.      |
|  **16**  | Minify CSS and JS                                                     | `vite.config.ts`                                      | Production build output              |  **COMPLETED**  | Vite asset minification configured.                |
|  **17**  | Speed score $\ge 95$ on PageSpeed / Lighthouse                        | Production build                                      | Playwright audit                     |    `PENDING`    | Stage 5 deliverable.                               |
|  **18**  | Mobile version verification ($320\text{–}2560\text{ px}$)             | Layout & Tailwind (Stage 3)                           | `tests/accessibility-mobile.spec.ts` |    `PENDING`    | Stage 5 deliverable.                               |
|  **19**  | Activate HTTPS certificate                                            | GitHub Pages + CSP meta                               | Live SSL check                       |    `PENDING`    | Stage 6/7 deliverable.                             |
|  **20**  | Schema.org `Organization` markup                                      | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Generator built and tested.                        |
|  **21**  | Schema.org `Service` markup                                           | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Generator built and tested.                        |
|  **22**  | Schema.org `LocalBusiness` / `ManufacturingBusiness`                  | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Generator built and tested.                        |
|  **23**  | Link service pages to `/portfolio`                                    | `src/routes/**/+page.svelte` (Stage 3)                | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 3 deliverable.                               |
|  **24**  | Cross-link between service pages                                      | `src/routes/**/+page.svelte` (Stage 3)                | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 3 deliverable.                               |
|  **25**  | Descriptive anchor text for all links                                 | Component templates (Stage 3)                         | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 3 deliverable.                               |
|  **26**  | Human-readable URLs (Clean Slugs)                                     | SvelteKit static routes                               | Route structure audit                |  **COMPLETED**  | Configured `trailingSlash: 'always'`.              |
|  **27**  | Create `robots.txt` in root                                           | `scripts/generate-seo-files.js` (Stage 4)             | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 4 deliverable.                               |
|  **28**  | Ensure important pages not blocked                                    | `robots.txt` generator (Stage 4)                      | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 4 deliverable.                               |
|  **29**  | Yandex Business profile submission kit                                | `PROJ.md` Section 6                                   | Manual copy kit                      |  **COMPLETED**  | Pre-formatted B2B profile kit in Section 6.        |
|  **30**  | Fill out Yandex Business services & photos                            | `PROJ.md` Section 6                                   | Manual checklist                     |  **COMPLETED**  | Services breakdown in Section 6.                   |
|  **31**  | Google Business Profile submission kit                                | `PROJ.md` Section 6                                   | Manual copy kit                      |  **COMPLETED**  | Pre-formatted GBP profile kit in Section 6.        |
|  **32**  | Fill out Google Business attributes                                   | `PROJ.md` Section 6                                   | Manual checklist                     |  **COMPLETED**  | Categorization kit in Section 6.                   |
|  **33**  | Mention city and region in content                                    | Content files (Stage 3)                               | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 3 deliverable.                               |
|  **34**  | External professional profiles (`Habr`, `GitHub`, `Telegram`)         | `src/lib/config/site.ts`, Footer                      | Schema & DOM audit                   |  **COMPLETED**  | Profiles mapped in config and Organization schema. |
|  **35**  | Authoritative industrial directories kit (`Obrabotka.net`, `Pulscen`) | `PROJ.md` Section 6                                   | Outreach templates                   |  **COMPLETED**  | Ready in Section 6.                                |
|  **36**  | Partner & supplier backlinks strategy                                 | `PROJ.md` Section 6                                   | Outreach templates                   |  **COMPLETED**  | Ready in Section 6.                                |
|  **37**  | OpenGraph tags (`og:*`) in `<head>`                                   | `src/lib/components/SeoHead.svelte` (Stage 4)         | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 4 deliverable.                               |
|  **38**  | Customer reviews section on site                                      | `src/routes/+page.svelte` (Stage 3)                   | DOM assertions                       |    `PENDING`    | Stage 3 deliverable.                               |
|  **39**  | Schema.org `AggregateRating` markup                                   | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Integrated in LocalBusiness generator.             |
|  **40**  | Canonical tags on all pages                                           | `src/lib/components/SeoHead.svelte` (Stage 4)         | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Helper tested in `site.spec.ts`.                   |
|  **41**  | Install Yandex.Metrika event tracking                                 | `src/lib/analytics/tracker.ts` (Stage 4)              | Mock test                            |    `PENDING`    | Stage 4 deliverable.                               |
|  **42**  | Install Google Analytics 4 event tracking                             | `src/lib/analytics/tracker.ts` (Stage 4)              | Mock test                            |    `PENDING`    | Stage 4 deliverable.                               |
|  **43**  | Breadcrumbs navigation UI + BreadcrumbList                            | `src/lib/components/Breadcrumbs.svelte` (Stage 3)     | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Schema generator completed in Stage 1.             |
|  **44**  | `/sitemap` HTML page                                                  | `src/routes/sitemap/+page.svelte` (Stage 3)           | Route test                           |    `PENDING`    | Stage 3 deliverable.                               |
|  **45**  | Descriptive `alt` text on all images                                  | Templates (Stage 3)                                   | `tests/seo-checklist.spec.ts`        |    `PENDING`    | Stage 3 deliverable.                               |
|  **46**  | Social media & professional links in footer                           | Footer component (Stage 3)                            | Link check test                      |    `PENDING`    | Stage 3 deliverable.                               |
|  **47**  | Schema.org `FAQPage` markup                                           | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Generator completed and tested.                    |
|  **48**  | `og:video` and `VideoObject` markup                                   | `src/lib/seo/schema.ts`                               | `src/lib/seo/schema.spec.ts`         |  **COMPLETED**  | Generator completed and tested.                    |
| **FZ-1** | 152-FZ Zero Personal Data Assertion                                   | Form templates & UI                                   | `tests/compliance-152fz.spec.ts`     |    `PENDING`    | Stage 5 automated check.                           |
| **FZ-2** | Mandatory Privacy & Cookie Policy Page                                | `src/routes/politika-konfidentsialnosti/+page.svelte` | Route & DOM audit                    |    `PENDING`    | Stage 4 deliverable.                               |
| **FZ-3** | Cookie Consent Banner Component                                       | `src/lib/components/CookieBanner.svelte`              | Playwright test                      |    `PENDING`    | Stage 4 deliverable.                               |
| **FZ-4** | Yandex Metrika IP Masking Configuration                               | `src/lib/analytics/tracker.ts`                        | Code inspection                      |    `PENDING`    | Stage 4 deliverable.                               |

---

## 6. External Registration & Directory Submission Kits

When ready to submit the workshop to external catalogs and search engine webmasters, use the verified Russian industrial texts below:

### 6.1. Search Engine Webmasters

- **Yandex.Webmaster (`webmaster.yandex.ru`)**:
  - Verification: Set `PUBLIC_YANDEX_VERIFICATION=<code_from_yandex>` in `.env`.
  - Sitemap URL: `https://metalprom39.com/sitemap.xml`
- **Google Search Console (`search.google.com/search-console`)**:
  - Verification: Set `PUBLIC_GOOGLE_VERIFICATION=<code_from_google>` in `.env`.
  - Sitemap URL: `https://metalprom39.com/sitemap.xml`

### 6.2. Yandex Business Directory (`Яндекс.Бизнес / Карты`)

- **Company Name:** МеталлПром39 — Высокоточная металлообработка и ЧПУ
- **Categories:** Металлообработка, Токарные работы, Фрезерные работы, Производственное предприятие
- **Address:** г. Калининград, ул. Промышленная, д. 1
- **Working Hours:** Пн–Пт с 08:00 до 18:00
- **Short Description (200 chars):**
  Высокоточная токарная и фрезерная обработка с ЧПУ в Калининграде. Серии от 5 до 1000 шт. за 3–5 дней. Безналичный расчет с НДС, паспорта ОТК (Mitutoyo), ГОСТ. Минимальный заказ 5 000 ₽.
- **Full Description:**
  Производственный цех «МеталлПром39» выполняет прецизионную механическую обработку металлов и инженерных пластиков на станках с ЧПУ в Калининградской области.
  Специализация:
  - Токарные работы с ЧПУ: валы, оси, штуцеры, фланцы, резьбовые переходники (допуски до IT7).
  - Фрезерные работы с ЧПУ (3 и 4 оси): корпусные детали, приборные панели, матрицы, пресс-формы.
  - Сопутствующие дефицитные операции: зубонарезка, шлифование (IT6–IT7, Ra 0.4–0.8), термообработка и ТВЧ закалка, расточка.
    Преимущества для B2B-заказчиков:
  - Официальный договор, безналичный расчет с НДС / УСН, электронный документооборот (ЭДО).
  - Контроль ОТК поверенным инструментом Mitutoyo, выдача паспортов качества на партии и сертификатов на металл.
  - Оперативный расчет стоимости по чертежам и 3D-моделям (STEP, IGES, DXF) за 2–4 часа.
  - Минимальный порог заказа для юрлиц — 5 000 ₽.

### 6.3. Google Business Profile (`Google Maps`)

- **Business Name:** MetalProm39 Precision CNC Machining
- **Categories:** Machine shop, Metal fabricator, Precision engineer
- **Service Area:** Kaliningrad Oblast (Kaliningrad, Svetly, Baltiysk, Guryevsk, Chernyakhovsk)
- **Phone:** +7 (4012) 00-00-00
- **Website:** https://metalprom39.com

### 6.4. Industrial B2B Catalogs (`Obrabotka.net`, `Pulscen`, `2GIS`, КТПП)

- **Listing Title:** Токарно-фрезерная обработка на станках с ЧПУ в Калининграде — ООО/ИП МеталлПром39
- **Tags / Keywords:** токарные работы ЧПУ Калининград, фрезеровка ЧПУ, шлифовка IT6 IT7, нарезка шестерен, изготовление валов по чертежам, механообработка с НДС.
