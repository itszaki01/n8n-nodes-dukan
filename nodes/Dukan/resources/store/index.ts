import type { INodeProperties } from 'n8n-workflow';
import { storeGetManyDescription } from './getMany';
import { storeUpdateDescription } from './update';

const showOnlyForStore = {
	resource: ['store'],
};

export const storeDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForStore,
		},
		options: [
			{
				name: 'Get My Store',
				value: 'getOne',
				action: 'Get current store',
				description: 'Get the current store (from auth)',
				routing: {
					request: {
						method: 'GET',
						url: '/store',
					},
				},
			},
			{
				name: 'Get All My Stores',
				value: 'getMany',
				action: 'Get all stores',
				description: 'Get all stores with pagination',
				routing: {
					request: {
						method: 'GET',
						url: '/store/all',
						qs: {
							page: '={{$parameter.page}}',
							limit: '={{$parameter.limit}}',
							filter: '={{$parameter.filter}}',
							select: '={{$parameter.select}}',
							sort: '={{$parameter.sort}}',
							populate: '={{$parameter.populate}}',
							offset: '={{$parameter.offset}}',
						},
					},
				},
			},
			{
				name: 'Update My Store',
				value: 'update',
				action: 'Update store',
				description: 'Update the current store (body: UpdateStoreDto as JSON) for the current store (from auth)',
				routing: {
					request: {
						method: 'PATCH',
						url: '/store',
					},
				},
			},
		],
		default: 'getOne',
	},
	...storeGetManyDescription,
	...storeUpdateDescription,
];
