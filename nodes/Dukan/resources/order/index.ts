import type { INodeProperties } from 'n8n-workflow';
import { orderCreateDescription } from './create';
import { orderGetManyDescription } from './getMany';
import { orderGetOneDescription } from './getOne';

const showOnlyFororders = {
	resource: ['order'],
};

export const orderDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyFororders,
		},
		options: [
			{
				name: 'Get Many Orders',
				value: 'getMany',
				action: 'Get many',
				description: 'Get Data of all Orders',
				routing: {
					request: {
						method: 'GET',
						url: '/store-order-cart',
						qs: {
							page: '={{$parameter.page}}',
							limit: '={{$parameter.limit}}',
							filter: '={{$parameter.filter}}',
						},
					},
				},
			},
			{
				name: 'Get One Order',
				value: 'getOne',
				action: 'Get a order',
				description: 'Get the data of a single order',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-order-cart/" + $parameter.orderUid}}',
					},
				},
			},
			{
				name: 'Create an Order',
				value: 'createOne',
				action: 'Create a new order',
				description: 'Create a new order',
				routing: {
					request: {
						method: 'POST',
						url: '/store-order-cart',
					},
				},
			},
			{
				name: 'Update an Order Status',
				value: 'updateOrderStatus',
				action: 'Update an existing order',
				description: 'Update an existing order',
				routing: {
					request: {
						method: 'PUT',
						url: '/store-order-cart',
					},
				},
			},
		],
		default: 'getMany',
	},
	...orderGetManyDescription,
	...orderGetOneDescription,
	...orderCreateDescription,
];
