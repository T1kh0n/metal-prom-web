import { describe, it, expect } from 'vitest';
import {
	createOrganizationSchema,
	createLocalBusinessSchema,
	createServiceSchema,
	createBreadcrumbSchema,
	createFaqSchema,
	createVideoSchema,
	serializeJsonLd
} from './schema';
import { DEFAULT_SITE_CONFIG } from '../config/site';

describe('Schema.org JSON-LD Generators', () => {
	it('generates valid Organization schema', () => {
		const org = createOrganizationSchema(DEFAULT_SITE_CONFIG);
		expect(org['@context']).toBe('https://schema.org');
		expect(org['@type']).toBe('Organization');
		expect(org.name).toBe(DEFAULT_SITE_CONFIG.brandName);
		expect(org.legalName).toBe(DEFAULT_SITE_CONFIG.brandLegalName);
		expect(org.url).toBe(DEFAULT_SITE_CONFIG.siteDomain);
		expect(org.contactPoint[0].telephone).toBe(DEFAULT_SITE_CONFIG.contactPhone);
	});

	it('generates valid LocalBusiness / ManufacturingBusiness schema', () => {
		const biz = createLocalBusinessSchema(DEFAULT_SITE_CONFIG);
		expect(biz['@context']).toBe('https://schema.org');
		expect(biz['@type']).toBe('ManufacturingBusiness');
		expect(biz.geo.latitude).toBe(54.7104);
		expect(biz.geo.longitude).toBe(20.4522);
		expect(biz.address.addressLocality).toBe('Калининград');
		expect(biz.priceRange).toBe('₽₽');
		expect(biz.aggregateRating.ratingValue).toBe('4.9');
	});

	it('generates valid Service schema with pricing offers', () => {
		const service = createServiceSchema(
			{
				name: 'Токарные работы с ЧПУ в Калининграде',
				description: 'Высокоточная токарная обработка на станках с ЧПУ',
				serviceType: 'CNC Turning',
				path: '/tokarnye-raboty-chpu',
				offers: {
					price: 2500,
					unitText: 'нормо-час',
					minOrderPrice: 5000
				}
			},
			DEFAULT_SITE_CONFIG
		);

		expect(service['@context']).toBe('https://schema.org');
		expect(service['@type']).toBe('Service');
		expect(service.url).toBe(`${DEFAULT_SITE_CONFIG.siteDomain}/tokarnye-raboty-chpu`);
		expect(service.offers?.price).toBe(2500);
		expect(service.offers?.priceSpecification?.price).toBe(5000);
	});

	it('generates valid BreadcrumbList schema', () => {
		const breadcrumbs = createBreadcrumbSchema(
			[
				{ name: 'Главная', path: '/' },
				{ name: 'Услуги', path: '/tokarnye-raboty-chpu' }
			],
			DEFAULT_SITE_CONFIG
		);

		expect(breadcrumbs['@type']).toBe('BreadcrumbList');
		expect(breadcrumbs.itemListElement).toHaveLength(2);
		expect(breadcrumbs.itemListElement[0].position).toBe(1);
		expect(breadcrumbs.itemListElement[0].item).toBe(`${DEFAULT_SITE_CONFIG.siteDomain}/`);
		expect(breadcrumbs.itemListElement[1].position).toBe(2);
		expect(breadcrumbs.itemListElement[1].item).toBe(
			`${DEFAULT_SITE_CONFIG.siteDomain}/tokarnye-raboty-chpu/`
		);
	});

	it('generates valid FAQPage schema', () => {
		const faq = createFaqSchema([
			{
				question: 'Какая минимальная сумма заказа?',
				answer: 'Минимальная сумма заказа для юридических лиц — 5 000 ₽.'
			}
		]);

		expect(faq['@type']).toBe('FAQPage');
		expect(faq.mainEntity[0].name).toBe('Какая минимальная сумма заказа?');
		expect(faq.mainEntity[0].acceptedAnswer.text).toContain('5 000 ₽');
	});

	it('generates valid VideoObject schema', () => {
		const video = createVideoSchema(
			{
				name: 'Обработка вала на токарном станке с ЧПУ',
				description: 'Процесс точения вала из стали 40Х с допуском IT7',
				thumbnailUrl: '/images/video-thumb.webp',
				uploadDate: '2026-10-27T12:00:00Z',
				contentUrl: 'https://video.metalprom39.com/lathe-demo.mp4'
			},
			DEFAULT_SITE_CONFIG
		);

		expect(video['@type']).toBe('VideoObject');
		expect(video.name).toContain('Обработка вала');
		expect(video.thumbnailUrl).toBe(`${DEFAULT_SITE_CONFIG.siteDomain}/images/video-thumb.webp`);
	});

	it('serializes to valid parseable JSON-LD string', () => {
		const org = createOrganizationSchema(DEFAULT_SITE_CONFIG);
		const jsonString = serializeJsonLd(org);
		const parsed = JSON.parse(jsonString);
		expect(parsed.name).toBe(DEFAULT_SITE_CONFIG.brandName);
	});
});
