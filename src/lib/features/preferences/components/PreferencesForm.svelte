<!--<script lang="ts">-->
<!--	import { preferences } from '../store';-->
<!--	import type { CraftType, SkillLevel, YarnWeight } from '../types';-->

<!--	// Typed Helpers-->
<!--	const handleToggle = (key: keyof typeof preferences.state) => (e: Event) => {-->
<!--		preferences.update(key, (e.target as HTMLInputElement).checked);-->
<!--	};-->

<!--	const handleSelect = (key: keyof typeof preferences.state) => (e: Event) => {-->
<!--		preferences.update(key, (e.target as HTMLSelectElement).value);-->
<!--	};-->

<!--	// Yarn weights list for rendering checkboxes-->
<!--	const yarnWeights: { val: YarnWeight; label: string }[] = [-->
<!--		{ val: 'lace', label: 'Lace (0)' },-->
<!--		{ val: 'fingering', label: 'Fingering (1)' },-->
<!--		{ val: 'sport', label: 'Sport (2)' },-->
<!--		{ val: 'dk', label: 'DK (3)' },-->
<!--		{ val: 'worsted', label: 'Worsted/Aran (4)' },-->
<!--		{ val: 'bulky', label: 'Bulky (5)' },-->
<!--		{ val: 'super-bulky', label: 'Super Bulky (6)' },-->
<!--	];-->
<!--</script>-->

<!--<div class="flex flex-col gap-8 pb-10">-->
<!--	<section class="card bg-base-100 shadow-xl">-->
<!--		<div class="card-body">-->
<!--			<h2 class="card-title">🧶 Craft Profile</h2>-->

<!--			<div class="form-control w-full">-->
<!--				<label class="label"><span class="label-text">Primary Craft</span></label>-->
<!--				<select-->
<!--					class="select select-bordered"-->
<!--					value={preferences.state.primaryCraft}-->
<!--					onchange={handleSelect('primaryCraft')}-->
<!--				>-->
<!--					<option value="knitting">Knitting Only</option>-->
<!--					<option value="crochet">Crochet Only</option>-->
<!--					<option value="both">Bistitchual (Both)</option>-->
<!--				</select>-->
<!--			</div>-->

<!--			<div class="form-control w-full mt-4">-->
<!--				<label class="label"><span class="label-text">Skill Level</span></label>-->
<!--				<div class="join w-full">-->
<!--					{#each ['beginner', 'intermediate', 'advanced'] as level}-->
<!--						<input-->
<!--							class="join-item btn w-1/3 capitalize"-->
<!--							type="radio"-->
<!--							name="skill"-->
<!--							aria-label={level}-->
<!--							checked={preferences.state.skillLevel === level}-->
<!--							onclick={() => preferences.update('skillLevel', level as SkillLevel)}-->
<!--						/>-->
<!--					{/each}-->
<!--				</div>-->
<!--			</div>-->

<!--			<div class="form-control mt-4">-->
<!--				<span class="label-text mb-2">Favorite Yarn Weights</span>-->
<!--				<div class="grid grid-cols-2 gap-2">-->
<!--					{#each yarnWeights as weight}-->
<!--						<label class="label cursor-pointer justify-start gap-3 border rounded-lg p-2 hover:bg-base-200">-->
<!--							<input-->
<!--								type="checkbox"-->
<!--								class="checkbox checkbox-sm checkbox-primary"-->
<!--								checked={preferences.state.favoriteYarnWeights.includes(weight.val)}-->
<!--								onchange={() => preferences.toggleYarnWeight(weight.val)}-->
<!--							/>-->
<!--							<span class="label-text">{weight.label}</span>-->
<!--						</label>-->
<!--					{/each}-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</section>-->

<!--	<section class="card bg-base-100 shadow-xl">-->
<!--		<div class="card-body">-->
<!--			<h2 class="card-title">📏 Technical Settings</h2>-->

<!--			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">-->
<!--				<div class="form-control">-->
<!--					<label class="label"><span class="label-text">Units</span></label>-->
<!--					<select-->
<!--						class="select select-bordered"-->
<!--						value={preferences.state.measurementSystem}-->
<!--						onchange={handleSelect('measurementSystem')}-->
<!--					>-->
<!--						<option value="metric">Metric (cm/mm)</option>-->
<!--						<option value="imperial">Imperial (in/US)</option>-->
<!--					</select>-->
<!--				</div>-->

<!--				<div class="form-control">-->
<!--					<label class="label"><span class="label-text">Crochet Terms</span></label>-->
<!--					<select-->
<!--						class="select select-bordered"-->
<!--						value={preferences.state.crochetTerms}-->
<!--						onchange={handleSelect('crochetTerms')}-->
<!--					>-->
<!--						<option value="US">US Terms</option>-->
<!--						<option value="UK">UK Terms</option>-->
<!--					</select>-->
<!--				</div>-->
<!--			</div>-->

<!--			<div class="divider"></div>-->

<!--			<div class="form-control">-->
<!--				<label class="label cursor-pointer">-->
<!--					<span class="label-text">Left-Handed Mode</span>-->
<!--					<input-->
<!--						type="checkbox"-->
<!--						class="toggle toggle-accent"-->
<!--						checked={preferences.state.leftHandedMode}-->
<!--						onchange={handleToggle('leftHandedMode')}-->
<!--					/>-->
<!--				</label>-->
<!--			</div>-->

<!--			<div class="form-control">-->
<!--				<label class="label cursor-pointer">-->
<!--					<span class="label-text">Keep Screen Awake</span>-->
<!--					<input-->
<!--						type="checkbox"-->
<!--						class="toggle toggle-secondary"-->
<!--						checked={preferences.state.keepScreenAwake}-->
<!--						onchange={handleToggle('keepScreenAwake')}-->
<!--					/>-->
<!--				</label>-->
<!--			</div>-->
<!--		</div>-->
<!--	</section>-->
<!--</div>-->
