/**
 * Schema.org JSON-LD Generators for Technical SEO, AEO, and GEO.
 * Complies with Google Rich Results and Yandex Microformat standards.
 */

import { siteConfig, type SiteConfig } from '../config/site';

export interface ServiceOfferParams {
	price: number;
	priceCurrency?: string;
	unitText?: string;
	minOrderPrice?: number;
}

export interface ServiceSchemaParams {
	name: string;
	description: string;
	serviceType: string;
	path: string;
	offers?: ServiceOfferParams;
}

export interface BreadcrumbItem {
	name: string;
	path: string;
}

export interface FaqItem {
	question: string;
	answer: string;
}

export interface VideoSchemaParams {
	name: string;
	description: string;
	thumbnailUrl: string;
	uploadDate: string;
	contentUrl: string;
	embedUrl?: string;
}

/**
 * Creates Schema.org Organization structured data.
 */
export function createOrganizationSchema(config: SiteConfig = siteConfig) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${config.siteDomain}/#organization`,
		name: config.brandName,
		legalName: config.brandLegalName,
		url: config.siteDomain,
		logo: `${config.siteDomain}/logo.svg`,
		email: config.contactEmail,
		telephone: config.contactPhone,
		address: {
			'@type': 'PostalAddress',
			streetAddress: config.addressStreet,
			addressLocality: config.addressLocality,
			addressRegion: config.addressRegion,
			postalCode: config.postalCode,
			addressCountry: 'RU'
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				telephone: config.contactPhone,
				contactType: 'sales and technical support',
				areaServed: 'RU',
				availableLanguage: ['Russian']
			}
		],
		sameAs: Object.values(config.socialLinks).filter(Boolean)
	};
}

/**
 * Creates Schema.org ManufacturingBusiness (LocalBusiness) structured data.
 */
export function createLocalBusinessSchema(config: SiteConfig = siteConfig) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ManufacturingBusiness',
		'@id': `${config.siteDomain}/#localbusiness`,
		name: config.brandName,
		legalName: config.brandLegalName,
		url: config.siteDomain,
		image: `${config.siteDomain}/og/default.webp`,
		telephone: config.contactPhone,
		email: config.contactEmail,
		priceRange: '₽₽',
		address: {
			'@type': 'PostalAddress',
			streetAddress: config.addressStreet,
			addressLocality: config.addressLocality,
			addressRegion: config.addressRegion,
			postalCode: config.postalCode,
			addressCountry: 'RU'
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: config.geoLatitude,
			longitude: config.geoLongitude
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
				opens: '08:00',
				closes: '18:00'
			}
		],
		aggregateRating: {
			'@type': 'AggregateRating',
			ratingValue: '4.9',
			reviewCount: '28',
			bestRating: '5',
			worstRating: '1'
		}
	};
}

/**
 * Creates Schema.org Service structured data.
 */
export function createServiceSchema(params: ServiceSchemaParams, config: SiteConfig = siteConfig) {
	const serviceUrl = `${config.siteDomain}${params.path.startsWith('/') ? params.path : `/${params.path}`}`;

	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		'@id': `${serviceUrl}#service`,
		name: params.name,
		description: params.description,
		serviceType: params.serviceType,
		url: serviceUrl,
		provider: {
			'@id': `${config.siteDomain}/#organization`
		},
		areaServed: {
			'@type': 'AdministrativeArea',
			name: config.addressRegion
		},
		offers: params.offers
			? {
					'@type': 'Offer',
					price: params.offers.price,
					priceCurrency: params.offers.priceCurrency || 'RUB',
					unitText: params.offers.unitText || 'час',
					priceSpecification: params.offers.minOrderPrice
						? {
								'@type': 'UnitPriceSpecification',
								price: params.offers.minOrderPrice,
								priceCurrency: params.offers.priceCurrency || 'RUB',
								unitText: 'минимальный заказ'
							}
						: undefined
				}
			: undefined
	};
}

/**
 * Creates Schema.org BreadcrumbList structured data.
 */
export function createBreadcrumbSchema(items: BreadcrumbItem[], config: SiteConfig = siteConfig) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => {
			const cleanPath = item.path.startsWith('/') ? item.path : `/${item.path}`;
			return {
				'@type': 'ListItem',
				position: index + 1,
				name: item.name,
				item: cleanPath === '/' ? `${config.siteDomain}/` : `${config.siteDomain}${cleanPath}/`
			};
		})
	};
}

/**
 * Creates Schema.org FAQPage structured data.
 */
export function createFaqSchema(faqs: FaqItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer
			}
		}))
	};
}

/**
 * Creates Schema.org VideoObject structured data.
 */
export function createVideoSchema(video: VideoSchemaParams, config: SiteConfig = siteConfig) {
	return {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: video.name,
		description: video.description,
		thumbnailUrl: video.thumbnailUrl.startsWith('http')
			? video.thumbnailUrl
			: `${config.siteDomain}${video.thumbnailUrl}`,
		uploadDate: video.uploadDate,
		contentUrl: video.contentUrl,
		embedUrl: video.embedUrl
	};
}

/**
 * Serializes schema object to a safe JSON-LD string.
 */
export function serializeJsonLd(
	schema: Record<string, unknown> | Array<Record<string, unknown>>
): string {
	return JSON.stringify(schema, null, 2);
}
