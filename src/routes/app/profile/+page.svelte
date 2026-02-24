<script lang="ts">
	import { resolve } from '$app/paths';

	import {
		Bell,
		BellRing,
		Download,
		GraduationCap,
		LifeBuoy,
		LockKeyhole,
		LogOut,
		PackageOpen,
		Palette,
		Rabbit,
		Ruler,
		Smartphone,
		Trash2,
		Vibrate,
		Volleyball,
		Volume2,
		Watch,
	} from '$icons';

	import Header from '$ui/blocks/Header.svelte';
	import NavCardSmall from '$ui/components/cards/NavCardSmall.svelte';
	import VerticalSeparator from '$ui/components/separators/VerticalSeparator.svelte';

	import * as m from '$lib/paraglide/messages';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Header title={m.routes_profile_heading()}>
	<button class="btn btn-circle bg-base-300">
		<Bell class="size-5" />
	</button>
</Header>

<div class="flex flex-col gap-6 px-6 pt-0 pb-6">
	<div class="flex flex-col gap-3 rounded-xl border-2 border-base-300 bg-base-100 p-3">
		<a href={resolve('/app/profile/my-profile')} class="flex flex-row items-center gap-4">
			<div class="avatar">
				<div class="w-16 rounded-full">
					<img alt="profile_picture" src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
				</div>
			</div>

			<div class="flex-1 items-start gap-0 text-left">
				<p class="text-lg font-bold">{data.user.name}</p>
				<span class="text-sm font-normal text-base-content/70"> Free account </span>
			</div>
		</a>

		<div class="flex w-full items-center justify-between rounded-xl bg-primary p-3">
			<div class="flex flex-1 flex-col items-center text-primary-content">
				<p class="font-bold">12</p>
				<p class="text-sm">Projects</p>
			</div>

			<VerticalSeparator />

			<div class="flex flex-1 flex-col items-center text-primary-content">
				<p class="font-bold">125k</p>
				<p class="text-sm">Stitches</p>
			</div>

			<VerticalSeparator />

			<div class="flex flex-1 flex-col items-center text-primary-content">
				<p class="font-bold">684</p>
				<p class="text-sm">Minutes</p>
			</div>
		</div>
	</div>

	<div>
		<p class="pb-2 font-bold">Pattern preferences</p>
		<div class="rounded-2xl border-2 border-base-300 bg-base-100 p-2">
			<NavCardSmall title="Primary Craft" icon={Volleyball} />
			<NavCardSmall title="Skill Level" icon={GraduationCap} />
			<NavCardSmall title="Terminology" icon={Ruler} />
			<NavCardSmall title="Screen Wake Lock" icon={Smartphone} separator={false} />
		</div>
	</div>

	<div>
		<p class="pb-2 font-bold">The Burrow</p>
		<div class="rounded-2xl border-2 border-base-300 bg-base-100 p-2">
			<NavCardSmall title="Mascot Settings" icon={Rabbit} />
			<NavCardSmall title="Burrow Audio" icon={Volume2} />
			<NavCardSmall title="Daily Reminders" icon={BellRing} />
			<NavCardSmall title="Reset Layout" icon={PackageOpen} separator={false} />
		</div>
	</div>

	<div>
		<p class="pb-2 font-bold">App & Devices</p>
		<div class="rounded-2xl border-2 border-base-300 bg-base-100 p-2">
			<NavCardSmall title="Smartwatch Sync" icon={Watch} />
			<NavCardSmall title="Haptics" icon={Vibrate} />
			<NavCardSmall title="App Theme" icon={Palette} />
			<NavCardSmall title="Legal & Support" icon={LifeBuoy} separator={false} />
		</div>
	</div>

	<div>
		<p class="pb-2 font-bold">Account & Security</p>
		<div class=" rounded-2xl border-2 border-base-300 bg-base-100 p-2">
			<NavCardSmall title="Password" icon={LockKeyhole} />
			<NavCardSmall title="Export Data" icon={Download} />
			<NavCardSmall title="Delete account" icon={Trash2} />
			<NavCardSmall title="Log out" icon={LogOut} separator={false} />
		</div>
	</div>
</div>
