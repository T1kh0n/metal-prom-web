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
	<title>Фрезерные работы с ЧПУ в Калининграде: 3D и 4-осевая обработка | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Прецизионная фрезерная обработка на 3- и 4-осевых станках ЧПУ в Калининграде. Зона 800×500×500 мм, точность до ±0.005 мм. Изготовление корпусов и плит за 5-7 дней."
	/>
	{@html serializeSchema(serviceSchema)}
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<!-- Header & Direct Summary -->
		<header class="max-w-4xl border-b border-zinc-800 pb-8">
			<div
				class="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-1 font-mono text-xs font-medium text-zinc-300"
			>
				<span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
				Фрезерный участок ЧПУ
			</div>
			<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
				Фрезерные работы с ЧПУ в Калининграде: 3-осевая и 4-осевая прецизионная металлообработка
			</h1>
			<p class="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
				Цех {siteConfig.brandName} выполняет высокоточную 3D и 4-осевую фрезерную обработку корпусных
				деталей, плит, кронштейнов и сложнопрофильных узлов на вертикальных фрезерных центрах с ЧПУ. Изготавливаем
				серийные партии от 5 до 500 штук с гарантией соблюдения геометрических допусков, параллельности
				и перпендикулярности плоскостей. Базовая ставка —
				<strong class="font-mono text-white">3 000 ₽ / нормо-час</strong> (3-оси) и
				<strong class="font-mono text-white">3 500 ₽ / нормо-час</strong> (4-оси).
			</p>
		</header>

		<!-- Direct Answer AEO Block -->
		<div
			class="my-8 rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 text-xs text-zinc-300"
		>
			<div class="font-semibold text-zinc-200">
				Ключевые технологические лимиты фрезерного участка:
			</div>
			<div class="mt-2 grid grid-cols-2 gap-3 text-zinc-400 sm:grid-cols-4">
				<div>Зона обработки (X/Y/Z): <strong class="font-mono text-zinc-100">800×500×500 мм</strong></div>
				<div>Поворотная 4-я ось: <strong class="font-mono text-zinc-100">патрон ⌀ 200 мм</strong></div>
				<div>Позиционирование: <strong class="font-mono text-zinc-100">±0.005 мм</strong></div>
				<div>Макс. масса заготовки: <strong class="font-mono text-zinc-100">до 500 кг</strong></div>
			</div>
		</div>

		<!-- Technical Specifications Grid -->
		<section class="mt-10" aria-labelledby="tech-params-heading">
			<h2 id="tech-params-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Технические характеристики и паспортные параметры станков
			</h2>
			<div class="mt-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950">
				<table class="w-full text-left text-xs text-zinc-300">
					<thead class="border-b border-zinc-800 bg-zinc-900/80 font-mono text-zinc-400 uppercase">
						<tr>
							<th class="px-4 py-3">Параметр оборудования</th>
							<th class="px-4 py-3">Значение</th>
							<th class="px-4 py-3">Инженерное назначение</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800/60">
						<tr>
							<td class="px-4 py-3 font-medium text-zinc-200">
								Перемещение по осям X / Y / Z
							</td>
							<td class="px-4 py-3 font-mono text-zinc-100">800 × 500 × 500 мм</td>
							<td class="px-4 py-3 text-zinc-400">
								Обработка плит, остовов редукторов, крупногабаритных крышек
							</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-medium text-zinc-200">
								Поворотный стол (4-я координатная ось)
							</td>
							<td class="px-4 py-3 font-mono text-zinc-100">Индексация 360° / 0.001°</td>
							<td class="px-4 py-3 text-zinc-400">
								Сверление радиальных отверстий, обработка граней за один установ
							</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-medium text-zinc-200">Частота шпинделя</td>
							<td class="px-4 py-3 font-mono text-zinc-100">до 10 000 об/мин</td>
							<td class="px-4 py-3 text-zinc-400">
								Высокоскоростная чистовая обработка алюминия и латуни (HSM)
							</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-medium text-zinc-200">Точность позиционирования</td>
							<td class="px-4 py-3 font-mono text-emerald-400">±0.005 мм</td>
							<td class="px-4 py-3 text-zinc-400">Оптические линейки Renishaw по 3 осям</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-medium text-zinc-200">Шероховатость поверхности</td>
							<td class="px-4 py-3 font-mono text-emerald-400">Ra 1.6 – 3.2 мкм</td>
							<td class="px-4 py-3 text-zinc-400">Чистовые монолитные фрезы с покрытием AlCrN</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Types of Machined Components -->
		<section class="mt-12" aria-labelledby="parts-types-heading">
			<h2 id="parts-types-heading" class="text-xl font-bold tracking-tight text-white sm:text-2xl">
				Типовая номенклатура фрезерного участка
			</h2>
			<div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
					<h3 class="text-sm font-semibold text-zinc-100">Корпуса и приборные блоки</h3>
					<div class="mt-1 font-mono text-xs text-zinc-300">Д16Т, АМг6, POM-C</div>
					<p class="mt-2 text-xs leading-relaxed text-zinc-400">
						Фрезерование тонкостенных корпусов радиоэлектронной аппаратуры, радиаторов охлаждения,
						герметичных приборных боксов для судовых навигационных систем.
					</p>
				</div>
				<div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
					<h3 class="text-sm font-semibold text-zinc-100">Плиты, кондукторы и матрицы</h3>
					<div class="mt-1 font-mono text-xs text-zinc-300">Сталь 45, 40Х, У8А</div>
					<p class="mt-2 text-xs leading-relaxed text-zinc-400">
						Изготовление сборочных плит технологической оснастки, шаблонов, прижимов для
						гидравлических прессов и сварочных кондукторов с жестким контролем плоскостности.
					</p>
				</div>
				<div class="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
					<h3 class="text-sm font-semibold text-zinc-100">Кронштейны и силовые рычаги</h3>
					<div class="mt-1 font-mono text-xs text-zinc-300">09Г2С, 12Х18Н10Т</div>
					<p class="mt-2 text-xs leading-relaxed text-zinc-400">
						Силовые узлы крепления гидроцилиндров, петли люковых закрытий, переходные кронштейны для
						сельскохозяйственной и портовой перегрузочной техники.
					</p>
				</div>
			</div>
		</section>

		<!-- Regional Industrial Cases -->
		<section class="mt-12" aria-labelledby="regional-cases-heading">
			<h2
				id="regional-cases-heading"
				class="text-xl font-bold tracking-tight text-white sm:text-2xl"
			>
				Специфика фрезерных заказов в Калининградской области
			</h2>
			<div class="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400">
				<p>
					Фрезерная ЧПУ обработка в нашем цехе ориентирована на потребности региональных
					B2B-клиентов, требующих оперативной замены изношенных узлов без ожидания доставки из-за
					пределов эксклава:
				</p>
				<ul class="list-inside list-disc space-y-2 text-zinc-300">
					<li>
						<strong>Предприятия рыбного промысла и переработки (Светлый, Пионерский):</strong>
						Изготовление матриц, направляющих гребенок и ножевых плит из пищевой нержавеющей стали AISI
						304 / 12Х18Н10Т.
					</li>
					<li>
						<strong>Машиностроительные и гидравлические сервисы (Калининград, Гурьевск):</strong>
						Фрезерование сопряженных плоскостей гидроблоков, клапанных плит с прецизионными карманами
						под резиновые уплотнители O-Ring.
					</li>
				</ul>
			</div>
		</section>

		<!-- Contextual Internal Linking -->
		<section class="mt-12 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
			<h2 class="text-base font-bold text-white">Сопутствующие услуги механического цеха:</h2>
			<div class="mt-3 grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
				<a
					href="/tokarnye-raboty-chpu/"
					class="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
				>
					<span class="block font-medium text-zinc-200">Токарная ЧПУ обработка</span>
					<span class="mt-1 block text-zinc-400"
						>Точение заготовок тел вращения перед фрезеровкой</span
					>
				</a>
				<a
					href="/zuboreznye-i-shlifovalnye-raboty/"
					class="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
				>
					<span class="block font-medium text-zinc-200">Плоское шлифование</span>
					<span class="mt-1 block text-zinc-400">Финишная доводка плоскостей до Ra 0.4 мкм</span>
				</a>
				<a
					href="/portfolio/"
					class="rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-zinc-300 transition-colors hover:border-zinc-700 hover:text-white"
				>
					<span class="block font-medium text-zinc-200">Портфолио корпусных деталей</span>
					<span class="mt-1 block text-zinc-400">Фотографии фрезерованных корпусов из Д16Т</span>
				</a>
			</div>
		</section>

		<!-- Direct CTA Action -->
		<section class="mt-12 rounded-xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
			<h2 class="text-lg font-bold text-white sm:text-xl">
				Рассчитайте себестоимость фрезерной обработки онлайн
			</h2>
			<p class="mt-2 text-xs text-zinc-400 sm:text-sm">
				Используйте инженерный калькулятор с загрузкой 3D-модели (STEP/STL) или направьте 3D-файлы
				нашему технологу для точной калькуляции.
			</p>
			<div class="mt-5 flex flex-wrap items-center justify-center gap-3">
				<a
					href="/kalkulyator-stoimosti-chpu/"
					class="rounded-md bg-zinc-100 px-4 py-2.5 text-xs font-medium text-zinc-950 shadow-sm transition-colors hover:bg-white"
				>
					Перейти в онлайн-калькулятор
				</a>
				<a
					href="mailto:{siteConfig.contactEmail}"
					class="rounded-md border border-zinc-700 bg-zinc-900/60 px-4 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
				>
					Отправить 3D-модели на {siteConfig.contactEmail}
				</a>
			</div>
		</section>
	</div>
</main>
