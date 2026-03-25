import type { TablesDB } from 'appwrite';
import type * as Types from './appwrite';
import { Table } from './table';

export function Tables(tablesDB: TablesDB) {
	return {
		abbreviations: Table<Types.Abbreviation>(tablesDB, 'abbreviations'),
		abbreviation_translations: Table<Types.AbbreviationTranslation>(tablesDB, 'abbreviation_translations'),
		patterns: Table<Types.Pattern>(tablesDB, 'patterns'),
		pattern_ratings: Table<Types.PatternRating>(tablesDB, 'pattern_ratings'),
		pattern_reviews: Table<Types.PatternReview>(tablesDB, 'pattern_reviews'),
		pattern_translations: Table<Types.PatternTranslation>(tablesDB, 'pattern_translations'),
		profiles: Table<Types.Profile>(tablesDB, 'profiles'),
	};
}
