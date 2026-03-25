import { PUBLIC_APPWRITE_DATABASE } from '$env/static/public';

import type { Models } from 'appwrite';
import { ID, Permission, Query, Role, TablesDB } from 'appwrite';

export function Table<Row extends Models.Row = Models.DefaultRow>(
	tablesDB: TablesDB,
	tableId: string,
	databaseId: string = PUBLIC_APPWRITE_DATABASE,
) {
	return {
		async getRow(params: {
			rowId: Parameters<typeof tablesDB.getRow<Row>>[2];
			queries?: (query: typeof Query) => Parameters<typeof tablesDB.getRow<Row>>[3];
			transactionId?: Parameters<typeof tablesDB.getRow<Row>>[4];
		}): ReturnType<typeof tablesDB.getRow<Row>> {
			return await tablesDB.getRow<Row>({
				databaseId: databaseId,
				tableId: tableId,
				rowId: params.rowId,
				queries: params.queries?.(Query),
				transactionId: params.transactionId,
			});
		},
		async listRows(params?: {
			queries?: (query: typeof Query) => Parameters<typeof tablesDB.listRows<Row>>[2];
			transactionId?: Parameters<typeof tablesDB.listRows<Row>>[3];
			total?: Parameters<typeof tablesDB.listRows<Row>>[4];
		}): ReturnType<typeof tablesDB.listRows<Row>> {
			return await tablesDB.listRows<Row>({
				databaseId: databaseId,
				tableId: tableId,
				queries: params?.queries?.(Query),
				transactionId: params?.transactionId,
				total: params?.total,
			});
		},
		async createRow(params: {
			rowId?: Parameters<typeof tablesDB.createRow<Row>>[2];
			data: Parameters<typeof tablesDB.createRow<Row>>[3];
			permissions?: (
				permission: typeof Permission,
				role: typeof Role,
			) => Parameters<typeof tablesDB.createRow<Row>>[4];
			transactionId?: Parameters<typeof tablesDB.createRow<Row>>[5];
		}): ReturnType<typeof tablesDB.createRow<Row>> {
			return tablesDB.createRow<Row>({
				databaseId: databaseId,
				tableId: tableId,
				rowId: params.rowId ?? ID.unique(),
				data: params.data,
				permissions: params.permissions?.(Permission, Role),
				transactionId: params.transactionId,
			});
		},
		async updateRow(params: {
			rowId: Parameters<typeof tablesDB.updateRow<Row>>[2];
			data: Parameters<typeof tablesDB.updateRow<Row>>[3];
			permissions?: (
				permission: typeof Permission,
				role: typeof Role,
			) => Parameters<typeof tablesDB.updateRow<Row>>[4];
			transactionId?: Parameters<typeof tablesDB.updateRow<Row>>[5];
		}): ReturnType<typeof tablesDB.updateRow<Row>> {
			return tablesDB.updateRow<Row>({
				databaseId: databaseId,
				tableId: tableId,
				rowId: params.rowId,
				data: params.data,
				permissions: params.permissions?.(Permission, Role),
				transactionId: params.transactionId,
			});
		},
		async upsertRow(params: {
			rowId: Parameters<typeof tablesDB.upsertRow<Row>>[2];
			data?: Parameters<typeof tablesDB.upsertRow<Row>>[3];
			permissions?: (
				permission: typeof Permission,
				role: typeof Role,
			) => Parameters<typeof tablesDB.upsertRow<Row>>[4];
			transactionId?: Parameters<typeof tablesDB.upsertRow<Row>>[5];
		}): ReturnType<typeof tablesDB.upsertRow<Row>> {
			return tablesDB.upsertRow<Row>({
				databaseId: databaseId,
				tableId: tableId,
				rowId: params.rowId,
				data: params.data,
				permissions: params.permissions?.(Permission, Role),
				transactionId: params.transactionId,
			});
		},
		async deleteRow(params: {
			rowId: Parameters<typeof tablesDB.deleteRow>[2];
			transactionId?: Parameters<typeof tablesDB.deleteRow>[3];
		}): ReturnType<typeof tablesDB.deleteRow> {
			return await tablesDB.deleteRow({
				databaseId: databaseId,
				tableId: tableId,
				rowId: params.rowId,
				transactionId: params.transactionId,
			});
		},
	};
}
