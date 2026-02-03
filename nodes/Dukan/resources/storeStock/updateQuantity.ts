import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreStockUpdateQuantity = {
	operation: ['updateQuantity'],
	resource: ['storeStock'],
};

export const storeStockUpdateQuantityDescription: INodeProperties[] = [
	{
		displayName: 'Stock Variable ID',
		name: 'stock_variable_id',
		type: 'string',
		displayOptions: { show: showOnlyForStoreStockUpdateQuantity },
		default: '',
		required: true,
		description: "The stock variable's ID (MongoDB ObjectId) to update quantity for",
	},
	{
		displayName: 'Quantity Delta',
		name: 'quentity',
		type: 'number',
		displayOptions: { show: showOnlyForStoreStockUpdateQuantity },
		default: 0,
		required: true,
		description: 'Amount to add (positive) or subtract (negative) from current quantity',
		routing: {
			send: {
				type: 'body',
				property: 'quentity',
				value: '={{$parameter.quentity}}',
			},
		},
	},
];
