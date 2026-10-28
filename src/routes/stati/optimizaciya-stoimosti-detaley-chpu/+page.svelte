<script lang="ts">
	import Breadcrumbs from '#lib/components/Breadcrumbs.svelte';
	import { siteConfig } from '#lib/config/site';

	const breadcrumbs = [
		{ name: 'База знаний', path: '/stati/' },
		{ name: 'DFM-оптимизация стоимости ЧПУ', path: '/stati/optimizaciya-stoimosti-detaley-chpu/' }
	];
</script>

<svelte:head>
	<title>DFM-оптимизация: 7 правил снижения себестоимости ЧПУ | {siteConfig.brandName}</title>
	<meta
		name="description"
		content="Как конструктору снизить стоимость изготовления детали на станках с ЧПУ на 25-40%. Радиусы углов, глубина карманов, технологичность резьб и серийность."
	/>
</svelte:head>

<main class="py-10">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<Breadcrumbs items={breadcrumbs} />

		<article>
			<header class="border-b border-zinc-800 pb-8">
				<div class="flex items-center gap-3 font-mono text-xs text-zinc-500">
					<span class="rounded bg-amber-500/10 px-2 py-0.5 text-amber-400"
						>DFM и проектирование</span
					>
					<span>Опубликовано: 27.10.2026</span>
					<span>Время чтения: 8 мин</span>
				</div>
				<h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
					DFM-оптимизация: 7 правил проектирования деталей для снижения себестоимости ЧПУ на 25–40%
				</h1>
				<p class="mt-4 text-base leading-relaxed text-zinc-300">
					Методология <strong class="text-white"
						>DFM (Design for Manufacturability — проектирование с учетом технологичности
						производства)</strong
					>
					позволяет конструкторским бюро и инженерам снижать затраты на контрактную металлообработку без
					ухудшения функциональных характеристик изделия. Большинство скрытых удорожаний в сметах вызвано
					геометрическими элементами, требующими нестандартного инструмента или многократных переустановов.
				</p>
			</header>

			<!-- 7 DFM Principles Grid -->
			<div class="my-8 space-y-6 text-sm leading-relaxed text-zinc-300">
				<!-- Rule 1 -->
				<section class="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
					<div class="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
						<span>Правило 1</span>
						<span class="text-zinc-600">/</span>
						<span>Радиусы внутренних углов карманов</span>
					</div>
					<h2 class="mt-2 text-lg font-bold text-white">
						Увеличивайте радиус угла R относительно диаметра фрезы
					</h2>
					<p class="mt-2 text-xs text-zinc-400">
						Концевая фреза вращается и физически не может сформировать острый угол 90° в
						вертикальном углу кармана. Если в кармане заложен радиус R=5 мм, фреза ⌀10 мм при
						подходе к углу соприкасается с материалом по дуге 90°, что вызывает резкий скачок сил
						резания, вибрацию и поломку инструмента.
					</p>
					<div
						class="mt-3 rounded border border-zinc-800 bg-zinc-900/60 p-3 font-mono text-xs text-emerald-400"
					>
						💡 Рекомендация DFM: Задавайте радиус угла минимум на 10–15% больше радиуса стандартной
						фрезы (например, R=5.5–6.0 мм для фрезы ⌀10 мм). Это позволяет инструменту плавно
						огибать угол по траектории трохоидального фрезерования без снижения подачи.
					</div>
				</section>

				<!-- Rule 2 -->
				<section class="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
					<div class="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
						<span>Правило 2</span>
						<span class="text-zinc-600">/</span>
						<span>Глубина карманов и вылетов инструмента</span>
					</div>
					<h2 class="mt-2 text-lg font-bold text-white">
						Ограничивайте глубину карманов соотношением H/D ≤ 4
					</h2>
					<p class="mt-2 text-xs text-zinc-400">
						Жесткость концевой фрезы обратно пропорциональна кубу ее вылета (<span class="font-mono"
							>L³</span
						>). При соотношении глубины к диаметру инструмента более 4:1 оператор вынужден снижать
						подачу и скорость резания в 3–5 раз для предотвращения вибрационного дробления, а время
						обработки одного кармана возрастает экспоненциально.
					</p>
				</section>

				<!-- Rule 3 -->
				<section class="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
					<div class="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
						<span>Правило 3</span>
						<span class="text-zinc-600">/</span>
						<span>Глубина глухих резьбовых отверстий</span>
					</div>
					<h2 class="mt-2 text-lg font-bold text-white">
						Не закладывайте резьбу глубже 2.5–3 диаметров (L ≤ 3×D)
					</h2>
					<p class="mt-2 text-xs text-zinc-400">
						В машиностроительном крепеже 85% всей осевой нагрузки воспринимают первые 5–6 витков
						резьбы. Нарезание резьбы М6 на глубину 30 мм в стали или нержавейке приводит лишь к
						забиванию канавок метчика стружкой и высокому риску его поломки, что требует трудоемкого
						электроэрозионного прожига обломка.
					</p>
				</section>

				<!-- Rule 4 -->
				<section class="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
					<div class="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
						<span>Правило 4</span>
						<span class="text-zinc-600">/</span>
						<span>Минимальная толщина стенок</span>
					</div>
					<h2 class="mt-2 text-lg font-bold text-white">
						Сохраняйте толщину стенок ≥ 1.5 мм (алюминий) и ≥ 1.0 мм (сталь)
					</h2>
					<p class="mt-2 text-xs text-zinc-400">
						Слишком тонкие стенки отжимаются под давлением режущей кромки фрезы. Это приводит к
						конусности, вибрационной ряби на чистовой поверхности и невозможности удержать линейный
						допуск без специальных поддерживающих кондукторов.
					</p>
				</section>

				<!-- Rule 5 -->
				<section class="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
					<div class="flex items-center gap-2 font-mono text-xs font-bold text-amber-400 uppercase">
						<span>Правило 5</span>
						<span class="text-zinc-600">/</span>
						<span>Минимизация количества установов детали</span>
					</div>
					<h2 class="mt-2 text-lg font-bold text-white">
						Группируйте конструктивные элементы на 1–2 базовых сторонах
					</h2>
					<p class="mt-2 text-xs text-zinc-400">
						Каждый дополнительный переворот заготовки на станке — это остановка цикла, ручная
						переустановка, повторная выкатка индикатором и накопление погрешности базирования.
						Детали, обрабатываемые за 1–2 установа (или на 4-осевом станке с поворотным столом),
						стоят на 30–50% дешевле деталей с отверстиями на всех 6 гранях.
					</p>
				</section>
			</div>

			<!-- Batch Amortization Insight -->
			<div class="mt-8 rounded-xl border border-amber-500/30 bg-zinc-900/60 p-6 font-mono text-xs">
				<div class="font-bold text-amber-400 uppercase">
					Экономика серии: почему партия из 20 шт. выгоднее штучного образца
				</div>
				<p class="mt-2 font-sans text-xs leading-relaxed text-zinc-300">
					Фиксированная стоимость наладки станка и написания программы (3 000 – 5 000 ₽) при
					изготовлении 1 детали ложится на нее целиком. При заказе партии из 50 штук наладка
					распределяется по 60–100 ₽ на деталь, а наша автоматическая серийная скидка (до 40%)
					снижает общие затраты предприятия на закупку.
				</p>
			</div>

			<!-- Contextual Cross Links -->
			<div class="mt-10 rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
				<h3 class="font-bold text-white">Инструменты для проверки DFM:</h3>
				<div class="mt-3 flex flex-wrap gap-4 font-mono text-xs">
					<a
						href="/kalkulyator-stoimosti-chpu/"
						class="text-amber-400 hover:text-amber-300 hover:underline"
					>
						→ Онлайн-калькулятор с мгновенной оценкой сложности
					</a>
					<a
						href="/frezernye-raboty-chpu/"
						class="text-amber-400 hover:text-amber-300 hover:underline"
					>
						→ Возможности 3- и 4-осевого фрезерования
					</a>
					<a href="/portfolio/" class="text-amber-400 hover:text-amber-300 hover:underline">
						→ Примеры оптимизированных корпусных деталей
					</a>
				</div>
			</div>
		</article>
	</div>
</main>
