class UIState {
	#showDock = $state(true);

	get showDock() {
		return this.#showDock;
	}

	set showDock(value: boolean) {
		this.#showDock = value;
	}

	// Helper for pages to toggle easily
	toggleDock(visible: boolean) {
		this.#showDock = visible;
	}
}

export const ui = new UIState();
