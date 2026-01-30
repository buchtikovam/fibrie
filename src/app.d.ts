// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace Appwrite {
		interface Preferences {
			language: 'cs' | 'sk' | 'en' | 'es' | 'fr' | 'de';
			skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
			preferredCraft: ('knitting' | 'crochet' | 'machine-knitting' | 'tunisian-crochet' | 'tapestry-crochet')[];
			preferredPatternTypes: (
				| 'wearables'
				| 'accessories'
				| 'toys'
				| 'home-and-decor'
				| 'tapestry'
				| 'motifs'
				| 'seasonal'
				| 'niche'
			)[];

			theme?: 'dark' | 'light' | 'autumn' | 'garden';
			measurementSystem?: 'metric' | 'imperial';
			crochetTerms?: 'US' | 'UK';
			leftHandedMode?: boolean;
			preferredYarnWeights?: (
				| 'lace'
				| 'fingering'
				| 'sport'
				| 'dk'
				| 'worsted'
				| 'bulky'
				| 'super-bulky'
				| 'jumbo'
			)[];
			preferredYarnMaterials?: (
				| 'acrylic'
				| 'wool'
				| 'merino'
				| 'cotton'
				| 'linen'
				| 'silk'
				| 'alpaca'
				| 'nylon'
				| 'polyester'
				| 'cashmere'
				| 'mohair'
				| 'bamboo'
				| 'blend'
			)[];
		}
	}
	namespace App {
		interface Error {
			status: number;
			message?: string;
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
