import type { INodeProperties } from 'n8n-workflow';
import { storeStockCreateDescription } from './create';
import { storeStockGetManyDescription } from './getMany';
import { storeStockGetOneDescription } from './getOne';
import { storeStockUpdateDescription } from './update';
import { storeStockUpdateQuantityDescription } from './updateQuantity';
import { storeStockRemoveDescription } from './remove';

const showOnlyForStoreStock = {
	resource: ['storeStock'],
};

export const storeStockDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForStoreStock,
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many store stock variables',
				description: 'Get store stock with pagination for a target store',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-stock-api/find-all/" + $parameter.targeted_store_id}}',
						qs: {
							page: '={{$parameter.page}}',
							limit: '={{$parameter.limit}}',
							filter: '={{$parameter.filter}}',
							select: '={{$parameter.select}}',
							sort: '={{$parameter.sort}}',
							populate: '={{$parameter.populate}}',
							offset: '={{ $parameter.offset === 0 ? undefined : $parameter.offset }}',
						},
					},
				},
			},
			{
				name: 'Get One',
				value: 'getOne',
				action: 'Get a stock variable by ID',
				description: 'Get a single store stock variable by ID',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-stock-api/" + $parameter.stock_variable_id}}',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a store stock variable',
				description: 'Create a new store stock variable',
				routing: {
					request: {
						method: 'POST',
						url: '/store-stock-api',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a store stock variable',
				description: 'Update a store stock variable by ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-stock-api/" + $parameter.stock_variable_id}}',
					},
				},
			},
			{
				name: 'Update Quantity',
				value: 'updateQuantity',
				action: 'Increase or decrease quantity',
				description: 'Add or subtract quantity from a stock variable',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-stock-api/quintitiy/" + $parameter.stock_variable_id}}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a store stock variable',
				description: 'Delete a store stock variable by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/store-stock-api/" + $parameter.stock_variable_id}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...storeStockGetManyDescription,
	...storeStockGetOneDescription,
	...storeStockCreateDescription,
	...storeStockUpdateDescription,
	...storeStockUpdateQuantityDescription,
	...storeStockRemoveDescription,
];
