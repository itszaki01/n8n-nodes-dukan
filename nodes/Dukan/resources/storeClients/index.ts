import type { INodeProperties } from 'n8n-workflow';
import { storeClientsCreateDescription } from './create';
import { storeClientsGetManyDescription } from './getMany';
import { storeClientsUpdateDescription } from './update';
import { storeClientsBanByPhoneDescription } from './banByPhone';

const showOnlyForStoreClients = {
	resource: ['storeClients'],
};

export const storeClientsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForStoreClients,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many store clients',
				description: 'Get store clients with pagination',
				routing: {
					request: {
						method: 'GET',
						url: '/store-clients-api',
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
				name: 'Create',
				value: 'create',
				action: 'Create a store client',
				description: 'Create a new store client',
				routing: {
					request: {
						method: 'POST',
						url: '/store-clients-api',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a store client',
				description: 'Update a store client by ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-clients-api/" + $parameter.clientId}}',
					},
				},
			},
			{
				name: 'Ban by Phone',
				value: 'banByPhone',
				action: 'Ban client by phone number',
				description: 'Ban a client from ordering by their phone number',
				routing: {
					request: {
						method: 'POST',
						url: '={{"/store-clients-api/ban-by-phone/" + $parameter.phoneNumber}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...storeClientsGetManyDescription,
	...storeClientsCreateDescription,
	...storeClientsUpdateDescription,
	...storeClientsBanByPhoneDescription,
];
