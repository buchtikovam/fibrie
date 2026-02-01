import { AppwriteException } from '$appwrite';

export const helper = {
	error: {
		toString: (error: unknown): string => {
			if (error instanceof AppwriteException) {
				console.log(error.type);
				console.log(error.code);

				return error.message;
			}

			if (error instanceof Error) {
				return error.message;
			}

			if (typeof error === 'string') {
				return error;
			}

			return 'unknown';
		},
		type: (error: unknown): string | undefined => {
			if (error instanceof AppwriteException) {
				return error.type;
			}
		},
	},
};
