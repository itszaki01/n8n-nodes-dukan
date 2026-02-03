import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreStockRemove = {
	operation: ['delete'],
	resource: ['storeStock'],
};

export const storeStockRemoveDescription: INodeProperties[] = [
	{
		displayName: 'Stock Variable ID',
		name: 'stock_variable_id',
		type: 'string',
		displayOptions: { show: showOnlyForStoreStockRemove },
		default: '',
		required: true,
		description: "The stock variable's ID (MongoDB ObjectId) to delete",
	},
];
