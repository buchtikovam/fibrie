<script lang="ts">
	import { resolve } from '$app/paths';
	import * as m from '$lib/paraglide/messages';
	import { formatDuration } from '$lib/utils/format';
	import type * as Types from "$appwrite/database/appwrite";
	import { getLocale } from "$lib/paraglide/runtime";

	interface Props {
		pattern: Types.Pattern;
		isDrawerAtTop: boolean;
		activeTab: 'materials' | 'parts' | 'about';
	}

	let { pattern, isDrawerAtTop, activeTab = $bindable() }: Props = $props();

	const TABS = ['about', 'materials', 'parts'] as const;

	let texts = $derived(
		pattern.translations.find((v) => v.locale === getLocale()) ??
		pattern.translations.find((v) => v.locale === 'en') ??
		pattern.translations[0],
	);

	let totalReviews = $derived(
		pattern.pattern_rating.rating_1 +
		pattern.pattern_rating.rating_2 +
		pattern.pattern_rating.rating_3 +
		pattern.pattern_rating.rating_4 +
		pattern.pattern_rating.rating_5
	);

	let avgRating = $derived.by(() => {
		if (totalReviews === 0) return 0;
		const weightedSum =
			(pattern.pattern_rating.rating_1) +
			(2 * pattern.pattern_rating.rating_2) +
			(3 * pattern.pattern_rating.rating_3) +
			(4 * pattern.pattern_rating.rating_4) +
			(5 * pattern.pattern_rating.rating_5);
		return Math.round((weightedSum / totalReviews) * 10) / 10;
	});
</script>

<div
	class="sticky top-0 z-20 bg-base-100 px-8 pt-8 pb-4 transition-[border-radius] duration-300 ease-in-out {isDrawerAtTop
        ? 'rounded-t-none'
        : 'rounded-t-[2.5rem]'}"
>
	<header class="text-center">
		<h1 class="mb-1 text-2xl font-bold text-base-content">{texts?.title}</h1>
		<p class="mb-4 text-sm text-base-content/60">
			{m.routes_patterns_pattern_by()}
			<a href={resolve(`/app/profiles/${pattern.profile.$id}`)} class="link">
				{pattern.profile.public_name}
			</a>
		</p>

		<div class="flex flex-wrap items-center justify-center gap-2 text-sm text-base-content/70">
			<span>{formatDuration(pattern.estimated_minutes, false)}</span>
			<span class="text-base-300">|</span>

			<span>{m.routes_patterns_difficulty({ value: pattern.difficulty })}</span>
			<span class="text-base-300">|</span>

			<span class="flex items-center gap-1 font-medium">
                ⭐ {avgRating}
				<a
					href={resolve(`/app/patterns/${pattern.$id}/reviews`)}
					class="link text-xs font-normal"
				>
                    {`(${totalReviews} ${m.routes_patterns_reviews()})`}
                </a>
            </span>
		</div>
	</header>

	<div class="mt-6 mb-2 flex w-full rounded-full bg-base-200">
		{#each TABS as tab (tab)}
			<button
				class="flex-1 rounded-full py-2.5 text-sm font-medium capitalize transition-all {activeTab ===
                tab
                    ? 'bg-secondary text-secondary-content shadow-sm'
                    : 'text-base-content/60 hover:text-base-content/80'}"
				onclick={() => (activeTab = tab)}
			>
				{tab}
			</button>
		{/each}
	</div>
</div>
