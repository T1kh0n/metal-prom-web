import { describe, it, expect } from 'vitest';
import { DEFAULT_SITE_CONFIG, resolveSiteConfig, getCanonicalUrl, getOgImageUrl } from './site';

describe('Site Configuration & Dynamic Environment Resolution', () => {
	it('uses default values when no environment variables are provided', () => {
		const config = resolveSiteConfig({});
		expect(config.siteDomain).toBe('https://metalprom39.com');
		expect(config.siteHost).toBe('metalprom39.com');
		expect(config.brandName).toBe('МеталлПром39');
		expect(config.brandLegalName).toBe('ИП МеталлПром39');
		expect(config.contactPhone).toBe('+7 (4012) 00-00-00');
		expect(config.addressLocality).toBe('Калининград');
		expect(config.addressRegion).toBe('Калининградская область');
		expect(config.geoLatitude).toBe(54.7104);
		expect(config.geoLongitude).toBe(20.4522);
	});

	it('overrides default values with custom environment variables', () => {
		const customEnv = {
			PUBLIC_SITE_DOMAIN: 'https://custom-cnc39.ru/',
			PUBLIC_SITE_HOST: 'custom-cnc39.ru',
			PUBLIC_BRAND_NAME: 'БалтЧПУМастер',
			PUBLIC_BRAND_LEGAL_NAME: 'ООО БалтЧПУМастер',
			PUBLIC_CONTACT_PHONE: '+7 (4012) 99-88-77',
			PUBLIC_CONTACT_EMAIL: 'cnc@balt-chpu.ru',
			PUBLIC_ADDRESS_LOCALITY: 'Светлый',
			PUBLIC_ADDRESS_REGION: 'Калининградская область',
			PUBLIC_ADDRESS_STREET: 'ул. Заводская, 10',
			PUBLIC_POSTAL_CODE: '238340',
			PUBLIC_GEO_LATITUDE: '54.6750',
			PUBLIC_GEO_LONGITUDE: '20.1340',
			PUBLIC_GA_MEASUREMENT_ID: 'G-1234567890',
			PUBLIC_YM_COUNTER_ID: '98765432'
		};

		const config = resolveSiteConfig(customEnv);
		// Trailing slash should be stripped from domain
		expect(config.siteDomain).toBe('https://custom-cnc39.ru');
		expect(config.siteHost).toBe('custom-cnc39.ru');
		expect(config.brandName).toBe('БалтЧПУМастер');
		expect(config.brandLegalName).toBe('ООО БалтЧПУМастер');
		expect(config.contactPhone).toBe('+7 (4012) 99-88-77');
		expect(config.contactEmail).toBe('cnc@balt-chpu.ru');
		expect(config.addressLocality).toBe('Светлый');
		expect(config.geoLatitude).toBe(54.675);
		expect(config.geoLongitude).toBe(20.134);
		expect(config.gaMeasurementId).toBe('G-1234567890');
		expect(config.ymCounterId).toBe('98765432');
	});

	describe('getCanonicalUrl', () => {
		it('generates canonical root URL with trailing slash', () => {
			expect(getCanonicalUrl('/', 'https://metalprom39.com')).toBe('https://metalprom39.com/');
			expect(getCanonicalUrl('', 'https://metalprom39.com/')).toBe('https://metalprom39.com/');
		});

		it('appends trailing slash to inner routes', () => {
			expect(getCanonicalUrl('tokarnye-raboty-chpu', 'https://metalprom39.com')).toBe(
				'https://metalprom39.com/tokarnye-raboty-chpu/'
			);

			expect(getCanonicalUrl('/frezernye-raboty-chpu/', 'https://metalprom39.com')).toBe(
				'https://metalprom39.com/frezernye-raboty-chpu/'
			);
		});
	});

	describe('getOgImageUrl', () => {
		it('returns default og image url', () => {
			expect(getOgImageUrl('default', 'https://metalprom39.com')).toBe(
				'https://metalprom39.com/og/default.webp'
			);
		});

		it('returns slug-specific og image url', () => {
			expect(getOgImageUrl('tokarnye-raboty-chpu', 'https://metalprom39.com')).toBe(
				'https://metalprom39.com/og/tokarnye-raboty-chpu.webp'
			);
		});
	});
});
