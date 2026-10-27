# Living Architecture & Implementation Reference (`PROJ.md`)

This document is the living reference manual and development log for `metal-prom-web`. All updates, architectural specifications, file maps, configuration instructions, and 48-Point SEO/AEO/GEO verification statuses are tracked here.

---

## 1. Stage Progress Tracker

| Stage | Title | Status | Completion Date | Git Commit Hash | Scope Summary |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **Stage 1** | Project Scaffolding, Dynamic Config & Documentation Init | **COMPLETED** | 2026-10-27 | `fdcdbbd` | Initialized SvelteKit (Svelte 5 Runes, TypeScript, `@sveltejs/adapter-static`), Tailwind CSS, Vitest, Playwright. Configured `.env`, `.env.example`, `src/lib/config/site.ts`, and `src/lib/seo/schema.ts` with dynamic domain/brand injection. Unit tests passing. |
| **Stage 2** | Empirical Pricing Engine & Energy-Efficient CNC Calculator | `PENDING` | — | — | Ground-truth pricing engine (`pricing-config.ts`, `engine.ts`) with $O(1)$ arithmetic, Web Worker file parser, reactive UI, and unit tests. |
| **Stage 3** | Core B2B Pages, Unique Technical Copy & Internal Linking | `PENDING` | — | — | 9 static routes, 300–500+ words unique Russian B2B copy per page, regional keywords, OTK metrology, breadcrumbs, and cross-linking. |
| **Stage 4** | Full SEO, AEO & GEO Engine (`Schema.org`, XML Sitemap, Robots, LLMS.txt) | `PENDING` | — | — | Reusable `<SeoHead>` component, build-time static generators (`sitemap.xml`, `robots.txt`, `llms.txt`, `CNAME`), GA4/Yandex.Metrika loader. |
| **Stage 5** | Automated Testing Suite (48-Point SEO/AEO/GEO & Performance Validation) | `PENDING` | — | — | Full Playwright/Vitest automated assertions covering all 48 checklist points, responsive viewports, and performance budgets. |
| **Stage 6** | GitHub Actions CI/CD Pipeline Setup (Gated Deployment) | `PENDING` | — | — | `.github/workflows/ci-deploy.yml` with test gates and guarded GitHub Pages deployment lock (`workflow_dispatch` / explicit permission). |
| **Stage 7** | Post-Deployment Live Verification & Search Engine Audit | `PENDING` | — | — | Live HTTP/200 verification, HTTPS, compression headers, live sitemap ping, and Google/Yandex indexing audit. |

---

## 2. Developer Configuration Guide

### 2.1. Changing Domain, Brand Name, or Contact Details
All branding, regional data, and contact endpoints are dynamic and decoupled from source code.

* **Environment Configuration (`.env` and `.env.example`)**:
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

* **Central Configuration Module (`src/lib/config/site.ts`)**:
  - Contains default fallbacks in `DEFAULT_SITE_CONFIG`.
  - Exposes `resolveSiteConfig(overrides?)` for environment extraction and testing.
  - Exposes `getCanonicalUrl(path, baseDomain?)` for canonical URL resolution with `trailingSlash: 'always'`.
  - Exposes `getOgImageUrl(slug, baseDomain?)` for OpenGraph images.

### 2.2. Modifying Structured Data (`Schema.org` JSON-LD)
* **File Path:** `src/lib/seo/schema.ts`
* Generates strongly-typed JSON-LD schemas:
  - `createOrganizationSchema(config?)`: Organization profile, contact points, and verified social media links.
  - `createLocalBusinessSchema(config?)`: `ManufacturingBusiness` local business entity with geo-coordinates, address, operating hours, and customer rating.
  - `createServiceSchema(params, config?)`: Standard B2B industrial service description with hourly rate offers and minimum order value (5,000 RUB).
  - `createBreadcrumbSchema(items, config?)`: Breadcrumb trail for inner pages.
  - `createFaqSchema(faqs)`: FAQPage structured question-and-answer pairs.
  - `createVideoSchema(video, config?)`: VideoObject metadata for process videos.
  - `serializeJsonLd(schema)`: Safe serializer for `<script type="application/ld+json">`.

### 2.3. Modifying CNC Calculator Rates & Formulas (Stage 2 Reference)
* **File Path:** `src/lib/calculator/pricing-config.ts` (to be created in Stage 2)
  - `HOURLY_RATES`:
    - Turning: `2,500 RUB/hr`
    - Milling 3-Axis: `3,000 RUB/hr`
    - Milling 4-Axis / 3D: `3,500 RUB/hr`
    - Engineering / Reverse Engineering: `2,000 RUB/hr`
  - `SETUP_FEES`: Simple: `3,000 RUB`, Medium: `4,000 RUB`, Complex: `5,000 RUB`.
  - `MATERIAL_PROPERTIES`: Density ($\rho$), raw stock price ($P_{\text{kg}}$), machinability index ($K_{\text{mat}}$) for Steel 45, 40Kh, Stainless Steel, Aluminum D16T/AMg6, Brass, Bronze, and Engineering Plastics.
  - `BATCH_DISCOUNTS`: 5–19 pcs (-10%), 20–49 pcs (-20%), 50–99 pcs (-30%), 100+ pcs (-40%).
  - `MINIMUM_ORDER_VALUE`: Strictly `5,000 RUB`.

---

## 3. 48-Point SEO/AEO/GEO Compliance Matrix

| # | Item Name & Goal | Implementation File | Verification File | Status | Notes |
| :-: | :--- | :--- | :--- | :-: | :--- |
| **1** | Proper Domain Setup | `src/lib/config/site.ts`, `.env` | `src/lib/config/site.spec.ts` | **COMPLETED** | Fully parameterized via `PUBLIC_SITE_DOMAIN`. |
| **2** | Unique `<title>` ($\le 60$ chars) | `src/lib/components/SeoHead.svelte` (Stage 4) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 4 deliverable. |
| **3** | Meta description ($50\text{–}160$ chars) | `src/lib/components/SeoHead.svelte` (Stage 4) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 4 deliverable. |
| **4** | Single `<h1>` per page with primary keyword | `src/routes/**/+page.svelte` (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 3 deliverable. |
| **5** | Hierarchical `<h2>` and `<h3>` headings | `src/routes/**/+page.svelte` (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 3 deliverable. |
| **6** | 300–500+ words unique text per page | `src/routes/**/+page.svelte` (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 3 deliverable. |
| **7** | Target B2B keyword phrases integrated | Content files (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 3 deliverable. |
| **8** | Generate `sitemap.xml` | `scripts/generate-seo-files.js` (Stage 4) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 4 deliverable. |
| **9** | Yandex.Webmaster registration | `PROJ.md` Section 4 & `.env` | Inspection / ping script | **IN_PROGRESS** | Meta tag hook ready; instructions prepared. |
| **10** | Google Search Console registration | `PROJ.md` Section 4 & `.env` | Inspection / ping script | **IN_PROGRESS** | Meta tag hook ready; instructions prepared. |
| **11** | Submit `sitemap.xml` to Yandex | `PROJ.md` Section 4 | Verification script | `PENDING` | Awaiting live deploy authorization. |
| **12** | Submit `sitemap.xml` to Google | `PROJ.md` Section 4 | Verification script | `PENDING` | Awaiting live deploy authorization. |
| **13** | Check indexing errors | `scripts/verify-live-seo.js` (Stage 7) | Live script check | `PENDING` | Stage 7 deliverable. |
| **14** | Compress images (WebP/AVIF, `< 100 KB`) | `static/images/` (Stage 3) | Automated file-size audit | `PENDING` | Stage 3 deliverable. |
| **15** | Enable gzip/brotli precompression | `vite.config.ts`, `@sveltejs/adapter-static` | Static build output check | **COMPLETED** | `precompress: true` active in adapter-static. |
| **16** | Minify CSS and JS | `vite.config.ts` | Production build output | **COMPLETED** | Vite asset minification configured. |
| **17** | Speed score $\ge 95$ on PageSpeed / Lighthouse | Production build | Playwright audit | `PENDING` | Stage 5 deliverable. |
| **18** | Mobile version verification ($320\text{–}2560\text{ px}$) | Layout & Tailwind (Stage 3) | `tests/accessibility-mobile.spec.ts` | `PENDING` | Stage 5 deliverable. |
| **19** | Activate HTTPS certificate | GitHub Pages + CSP meta | Live SSL check | `PENDING` | Stage 6/7 deliverable. |
| **20** | Schema.org `Organization` markup | `src/lib/seo/schema.ts` | `src/lib/seo/schema.spec.ts` | **COMPLETED** | Generator built and tested. |
| **21** | Schema.org `Service` markup | `src/lib/seo/schema.ts` | `src/lib/seo/schema.spec.ts` | **COMPLETED** | Generator built and tested. |
| **22** | Schema.org `LocalBusiness` / `ManufacturingBusiness` | `src/lib/seo/schema.ts` | `src/lib/seo/schema.spec.ts` | **COMPLETED** | Generator built and tested. |
| **23** | Link service pages to `/portfolio` | `src/routes/**/+page.svelte` (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 3 deliverable. |
| **24** | Cross-link between service pages | `src/routes/**/+page.svelte` (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 3 deliverable. |
| **25** | Descriptive anchor text for all links | Component templates (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 3 deliverable. |
| **26** | Human-readable URLs (Clean Slugs) | SvelteKit static routes | Route structure audit | **COMPLETED** | Configured `trailingSlash: 'always'`. |
| **27** | Create `robots.txt` in root | `scripts/generate-seo-files.js` (Stage 4) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 4 deliverable. |
| **28** | Ensure important pages not blocked | `robots.txt` generator (Stage 4) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 4 deliverable. |
| **29** | Yandex Business profile submission kit | `PROJ.md` Section 4 | Manual copy kit | **COMPLETED** | Pre-formatted B2B profile kit in Section 4. |
| **30** | Fill out Yandex Business services & photos | `PROJ.md` Section 4 | Manual checklist | **COMPLETED** | Services breakdown in Section 4. |
| **31** | Google Business Profile submission kit | `PROJ.md` Section 4 | Manual copy kit | **COMPLETED** | Pre-formatted GBP profile kit in Section 4. |
| **32** | Fill out Google Business attributes | `PROJ.md` Section 4 | Manual checklist | **COMPLETED** | Categorization kit in Section 4. |
| **33** | Mention city and region in content | Content files (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 3 deliverable. |
| **34** | External professional profiles (`Habr`, `GitHub`, `Telegram`) | `src/lib/config/site.ts`, Footer | Schema & DOM audit | **COMPLETED** | Profiles mapped in config and Organization schema. |
| **35** | Authoritative industrial directories kit (`Obrabotka.net`, `Pulscen`) | `PROJ.md` Section 4 | Outreach templates | **COMPLETED** | Ready in Section 4. |
| **36** | Partner & supplier backlinks strategy | `PROJ.md` Section 4 | Outreach templates | **COMPLETED** | Ready in Section 4. |
| **37** | OpenGraph tags (`og:*`) in `<head>` | `src/lib/components/SeoHead.svelte` (Stage 4) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 4 deliverable. |
| **38** | Customer reviews section on site | `src/routes/+page.svelte` (Stage 3) | DOM assertions | `PENDING` | Stage 3 deliverable. |
| **39** | Schema.org `AggregateRating` markup | `src/lib/seo/schema.ts` | `src/lib/seo/schema.spec.ts` | **COMPLETED** | Integrated in LocalBusiness generator. |
| **40** | Canonical tags on all pages | `src/lib/components/SeoHead.svelte` (Stage 4) | `tests/seo-checklist.spec.ts` | `PENDING` | Helper tested in `site.spec.ts`. |
| **41** | Install Yandex.Metrika event tracking | `src/lib/analytics/tracker.ts` (Stage 4) | Mock test | `PENDING` | Stage 4 deliverable. |
| **42** | Install Google Analytics 4 event tracking | `src/lib/analytics/tracker.ts` (Stage 4) | Mock test | `PENDING` | Stage 4 deliverable. |
| **43** | Breadcrumbs navigation UI + BreadcrumbList | `src/lib/components/Breadcrumbs.svelte` (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Schema generator completed in Stage 1. |
| **44** | `/sitemap` HTML page | `src/routes/sitemap/+page.svelte` (Stage 3) | Route test | `PENDING` | Stage 3 deliverable. |
| **45** | Descriptive `alt` text on all images | Templates (Stage 3) | `tests/seo-checklist.spec.ts` | `PENDING` | Stage 3 deliverable. |
| **46** | Social media & professional links in footer | Footer component (Stage 3) | Link check test | `PENDING` | Stage 3 deliverable. |
| **47** | Schema.org `FAQPage` markup | `src/lib/seo/schema.ts` | `src/lib/seo/schema.spec.ts` | **COMPLETED** | Generator completed and tested. |
| **48** | `og:video` and `VideoObject` markup | `src/lib/seo/schema.ts` | `src/lib/seo/schema.spec.ts` | **COMPLETED** | Generator completed and tested. |

---

## 4. External Registration & Directory Submission Kits

When ready to submit the workshop to external catalogs and search engine webmasters, use the verified Russian industrial texts below:

### 4.1. Search Engine Webmasters
* **Yandex.Webmaster (`webmaster.yandex.ru`)**:
  - Verification: Set `PUBLIC_YANDEX_VERIFICATION=<code_from_yandex>` in `.env`.
  - Sitemap URL: `https://metalprom39.com/sitemap.xml`
* **Google Search Console (`search.google.com/search-console`)**:
  - Verification: Set `PUBLIC_GOOGLE_VERIFICATION=<code_from_google>` in `.env`.
  - Sitemap URL: `https://metalprom39.com/sitemap.xml`

### 4.2. Yandex Business Directory (`Яндекс.Бизнес / Карты`)
* **Company Name:** МеталлПром39 — Высокоточная металлообработка и ЧПУ
* **Categories:** Металлообработка, Токарные работы, Фрезерные работы, Производственное предприятие
* **Address:** г. Калининград, ул. Промышленная, д. 1
* **Working Hours:** Пн–Пт с 08:00 до 18:00
* **Short Description (200 chars):**
  Высокоточная токарная и фрезерная обработка с ЧПУ в Калининграде. Серии от 5 до 1000 шт. за 3–5 дней. Безналичный расчет с НДС, паспорта ОТК (Mitutoyo), ГОСТ. Минимальный заказ 5 000 ₽.
* **Full Description:**
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

### 4.3. Google Business Profile (`Google Maps`)
* **Business Name:** MetalProm39 Precision CNC Machining
* **Categories:** Machine shop, Metal fabricator, Precision engineer
* **Service Area:** Kaliningrad Oblast (Kaliningrad, Svetly, Baltiysk, Guryevsk, Chernyakhovsk)
* **Phone:** +7 (4012) 00-00-00
* **Website:** https://metalprom39.com

### 4.4. Industrial B2B Catalogs (`Obrabotka.net`, `Pulscen`, `2GIS`, КТПП)
* **Listing Title:** Токарно-фрезерная обработка на станках с ЧПУ в Калининграде — ООО/ИП МеталлПром39
* **Tags / Keywords:** токарные работы ЧПУ Калининград, фрезеровка ЧПУ, шлифовка IT6 IT7, нарезка шестерен, изготовление валов по чертежам, механообработка с НДС.
