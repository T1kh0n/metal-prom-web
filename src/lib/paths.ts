export const base = '/metal-prom-web';

export function pageHref(path: string): string {
	if (path === '/') return base || '/';
	const clean = path.startsWith('/') ? path : `/${path}`;
	return `${base}${clean}`;
}
