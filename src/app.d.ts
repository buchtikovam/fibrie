// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		session: SetIntervalAsyncTimer<unknown[]> | undefined;
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
