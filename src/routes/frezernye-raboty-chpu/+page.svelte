<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';
	import { createServiceSchema, serializeSchema } from '#lib/seo/schema';

	const breadcrumbs = [{ name: 'Фрезерные работы с ЧПУ', path: '/frezernye-raboty-chpu/' }];

	const serviceSchema = createServiceSchema({
		name: 'Фрезерные работы с ЧПУ в Калининграде',
		description:
			'Высокоточная 3-осевая и 4-осевая фрезерная обработка корпусов, плит и кронштейнов на центрах с ЧПУ. Поворотный стол, поле 800х500х500 мм, точность ±0.005 мм.',
		serviceType: 'Фрезерная обработка металлов с ЧПУ',
		path: '/frezernye-raboty-chpu/',
		offers: {
			price: 3000,
			minOrderPrice: 5000,
			unitText: 'нормо-час'
		}
	});
</script>

<svelte:head>
	<title
		>Фрезерные работы с ЧПУ в Калининграде: 3D и 4-осевая обработка | {siteConfig.brandName}</title
	>
	<meta
		name="description"
		content="Прецизионная фрезерная обработка на 3- и 4-осевых станках ЧПУ в Калининграде. Зона 800×500×500 мм, точность до ±0.005 мм. Изготовление корпусов и плит за 5-7 дней."
	/>
	{@html serializeSchema(serviceSchema)}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<!-- Header & Direct Summary: 12-Column Asymmetric Hero -->
		<div
			class="mt-4 grid grid-cols-1 items-start gap-8 border-b border-[var(--color-rule)] pb-8 lg:grid-cols-12"
		>
			<div class="lg:col-span-7">
				<h1 class="text-3xl text-[var(--color-ink)] sm:text-4xl">
					Фрезерные работы с ЧПУ в Калининграде
				</h1>
				<p class="lead mt-4 text-sm leading-relaxed sm:text-base">
					Высокоточная 3D и 4-осевая обработка корпусов, плит и кронштейнов на центрах ЧПУ. Серийные
					партии от 5 шт., поле 800×500×500 мм, точность до ±0.005 мм.
				</p>
			</div>
			<div class="well text-xs text-[var(--color-ink-2)] lg:col-span-5">
				<div class="font-normal text-[var(--color-ink)]">Лимиты фрезерного участка:</div>
				<div class="mt-3 grid grid-cols-2 gap-3 text-[var(--color-muted)]">
					<div>
						Зона (X/Y/Z):
						<strong class="num block font-normal text-[var(--color-ink)]"
							>800 × 500 × 500<span class="u">&thinsp;мм</span></strong
						>
					</div>
					<div>
						Поворотная 4-я ось:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>патрон ⌀ 200<span class="u">&thinsp;мм</span></strong
						>
					</div>
					<div>
						Позиционирование:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>±0.005<span class="u">&thinsp;мм</span></strong
						>
					</div>
					<div>
						Масса заготовки:
						<strong class="num block font-normal text-[var(--color-ink)]"
							>до 500<span class="u">&thinsp;кг</span></strong
						>
					</div>
				</div>
			</div>
		</div>

		<!-- Technical Specifications Grid -->
		<section class="mt-10" aria-labelledby="tech-params-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="tech-params-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Паспортные параметры станков
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Вертикальные фрезерные центры со стойками Siemens 828D и оптическими линейками Renishaw.
					</p>
				</div>
				<div class="overflow-x-auto lg:col-span-8">
					<table class="v-table">
						<thead>
							<tr>
								<th>Параметр оборудования</th>
								<th>Значение</th>
								<th>Инженерное назначение</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">Перемещение по осям X / Y / Z</td>
								<td class="num text-[var(--color-ink)]"
									>800 × 500 × 500<span class="u">&thinsp;мм</span></td
								>
								<td class="text-[var(--color-muted)]">
									Обработка плит, остовов редукторов, крупногабаритных крышек
								</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">
									Поворотный стол (4-я координатная ось)
								</td>
								<td class="num text-[var(--color-ink)]">Индексация 360° / 0.001°</td>
								<td class="text-[var(--color-muted)]">
									Сверление радиальных отверстий, обработка граней за один установ
								</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">Частота шпинделя</td>
								<td class="num text-[var(--color-ink)]"
									>до 10&thinsp;000<span class="u">&thinsp;об/мин</span></td
								>
								<td class="text-[var(--color-muted)]">
									Высокоскоростная чистовая обработка алюминия и латуни (HSM)
								</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">Точность позиционирования</td>
								<td class="num text-[var(--color-ink)]">±0.005<span class="u">&thinsp;мм</span></td>
								<td class="text-[var(--color-muted)]">Оптические линейки Renishaw по 3 осям</td>
							</tr>
							<tr>
								<td class="font-normal text-[var(--color-ink)]">Шероховатость поверхности</td>
								<td class="num text-[var(--color-ink)]"
									>Ra 1.6 – 3.2<span class="u">&thinsp;мкм</span></td
								>
								<td class="text-[var(--color-muted)]"
									>Чистовые монолитные фрезы с покрытием AlCrN</td
								>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<!-- Types of Machined Components -->
		<section class="mt-14" aria-labelledby="parts-types-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="parts-types-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Типовая номенклатура
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Серийное изготовление корпусных узлов, оснастки и кронштейнов для машиностроения.
					</p>
				</div>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-8">
					<div class="well">
						<h3 class="text-sm font-normal text-[var(--color-ink)]">Корпуса и приборные блоки</h3>
						<div class="num mt-1 text-xs text-[var(--color-muted)]">Д16Т, АМг6, POM-C</div>
						<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
							Тонкостенные корпуса радиоэлектроники, радиаторы охлаждения, герметичные боксы.
						</p>
					</div>
					<div class="well">
						<h3 class="text-sm font-normal text-[var(--color-ink)]">Плиты и кондукторы</h3>
						<div class="num mt-1 text-xs text-[var(--color-muted)]">Сталь 45, 40Х, У8А</div>
						<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
							Сборочные плиты технологической оснастки, шаблоны, прижимы прессов и сварочные
							кондукторы.
						</p>
					</div>
					<div class="well">
						<h3 class="text-sm font-normal text-[var(--color-ink)]">Кронштейны и рычаги</h3>
						<div class="num mt-1 text-xs text-[var(--color-muted)]">09Г2С, 12Х18Н10Т</div>
						<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
							Силовые узлы крепления гидроцилиндров, петли люковых закрытий, рычаги спецтехники.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Regional Industrial Cases -->
		<section class="mt-14" aria-labelledby="regional-cases-heading">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-12">
				<div class="lg:col-span-4">
					<h2 id="regional-cases-heading" class="text-xl text-[var(--color-ink)] sm:text-2xl">
						Специфика заказов
					</h2>
					<p class="mt-2 text-xs leading-relaxed text-[var(--color-muted)]">
						Обеспечение промышленных предприятий Калининградской области запчастями без задержек.
					</p>
				</div>
				<div class="space-y-4 text-xs leading-relaxed text-[var(--color-muted)] lg:col-span-8">
					<p class="max-w-2xl">
						Фрезерная ЧПУ обработка в нашем цехе ориентирована на оперативное закрытие потребностей
						предприятий региона:
					</p>
					<ul class="max-w-2xl list-inside list-disc space-y-2 text-[var(--color-ink-2)]">
						<li>
							<strong class="font-normal text-[var(--color-ink)]"
								>Предприятия рыбного промысла (Светлый, Пионерский):</strong
							>
							Матрицы, направляющие гребенки и ножевые плиты из нержавеющей стали AISI 304 / 12Х18Н10Т.
						</li>
						<li>
							<strong class="font-normal text-[var(--color-ink)]"
								>Машиностроительные сервисы (Калининград, Гурьевск):</strong
							>
							Фрезерование сопряженных плоскостей гидроблоков и клапанных плит под уплотнители O-Ring.
						</li>
					</ul>
				</div>
			</div>
		</section>

		<!-- Contextual Internal Linking -->
		<section class="mt-14 border-t border-[var(--color-rule)] pt-8">
			<h2 class="text-sm font-normal text-[var(--color-ink)]">
				Сопутствующие услуги механического цеха:
			</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
				<a
					href="/tokarnye-raboty-chpu/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Токарная ЧПУ обработка</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Точение заготовок тел вращения перед фрезеровкой</span
					>
				</a>
				<a
					href="/zuboreznye-i-shlifovalnye-raboty/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Плоское шлифование</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Финишная доводка плоскостей до Ra 0.4 мкм</span
					>
				</a>
				<a
					href="/portfolio/"
					class="well block text-[var(--color-ink-2)] transition-colors hover:border-[var(--color-rule-2)] hover:text-[var(--color-ink)]"
				>
					<span class="block font-normal text-[var(--color-ink)]">Портфолио корпусных деталей</span>
					<span class="mt-1 block text-[var(--color-muted)]"
						>Фотографии фрезерованных корпусов из Д16Т</span
					>
				</a>
			</div>
		</section>

		<!-- Direct CTA Action -->
		<section class="mt-14 border-t border-[var(--color-rule)] pt-12 pb-6 text-center">
			<h2 class="text-lg text-[var(--color-ink)] sm:text-xl">
				Рассчитайте себестоимость фрезерной обработки онлайн
			</h2>
			<p class="lead mx-auto mt-2 max-w-2xl text-xs sm:text-sm">
				Используйте инженерный калькулятор с загрузкой 3D-модели (STEP/STL) или направьте 3D-файлы
				нашему технологу.
			</p>
			<div class="mt-6 flex flex-wrap items-center justify-center gap-3">
				<a href="/kalkulyator-stoimosti-chpu/" class="btn btn--sm">
					Перейти в онлайн-калькулятор
				</a>
				<a href="mailto:{siteConfig.contactEmail}" class="btn btn--sm btn--line">
					Отправить 3D-модели на {siteConfig.contactEmail}
				</a>
			</div>
		</section>
	</div>
</main>
