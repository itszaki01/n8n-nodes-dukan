import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreStockGetOne = {
	operation: ['getOne'],
	resource: ['storeStock'],
};

export const storeStockGetOneDescription: INodeProperties[] = [
	{
		displayName: 'Stock Variable ID',
		name: 'stock_variable_id',
		type: 'string',
		displayOptions: { show: showOnlyForStoreStockGetOne },
		default: '',
		required: true,
		description: "The stock variable's ID (MongoDB ObjectId) to retrieve",
	},
];
