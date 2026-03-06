/**
 * Converts raw minutes into human strings.
 */
export function formatDuration(minutes: number, compact = true): string {
	if (minutes < 1) return 'Just started! 🌱';

	const hours = minutes / 60;

	// Mode A: The "2.5h" Compact Style (Great for small cards)
	if (compact && hours < 24) {
		const rounded = Math.round(hours * 10) / 10;
		return `${rounded} hours`;
	}

	// Mode B: (Days + Hours)
	const d = Math.floor(hours / 24);
	const h = Math.floor(hours % 24);
	const m = Math.floor(minutes % 60);

	if (d > 0) {
		return `${d}d ${h}h ${m}m`;
	}

	return `${h}h ${m}m`;
}
