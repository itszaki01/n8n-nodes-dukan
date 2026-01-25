import type { INodeProperties } from 'n8n-workflow';
import { productCreateDescription } from './create';
import { productGetDescription } from './get';

const showOnlyForProducts = {
	resource: ['product'],
};

export const productDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForProducts,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get products',
				description: 'Get many products',
				routing: {
					request: {
						method: 'GET',
						url: '/products',
					},
				},
			},
			{
				name: 'Get ME',
				value: 'get',
				action: 'Get a product',
				description: 'Get the data of a single product',
				routing: {
					request: {
						method: 'GET',
						url: '=/product-store/getMe',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new product',
				description: 'Create a new product',
				routing: {
					request: {
						method: 'POST',
						url: '/products',
					},
				},
			},

		],
		default: 'getAll',
	},
	...productGetDescription,
	...productCreateDescription,
];
