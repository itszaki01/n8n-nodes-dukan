import type { INodeProperties } from 'n8n-workflow';
import { storeShippingAccountsGetDescription } from './get';
import { storeShippingAccountsDeleteDescription } from './delete';
import { storeShippingAccountsGetManyDescription } from './getMany';
import { storeShippingAccountsUpdateDescription } from './update';
import { storeShippingAccountsCreateDescription } from './create';

const showOnlyForStoreShippingAccounts = {
	resource: ['storeShippingAccounts'],
};

export const storeShippingAccountsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForStoreShippingAccounts,
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many store shipping accounts',
				description: 'Get many store shipping accounts with pagination',
				routing: {
					request: {
						method: 'GET',
						url: '/store-shipping-comapanies',
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
				name: 'Get One',
				value: 'getOne',
				action: 'Get a store shipping account',
				description: 'Get the data of a single store shipping account',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-shipping-comapanies/" + $parameter.shippingCompanyId}}',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a store shipping account',
				description: 'Create a new store shipping account',
				routing: {
					request: {
						method: 'POST',
						url: '/store-shipping-comapanies',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a store shipping account',
				description: 'Update an existing store shipping account',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-shipping-comapanies/" + $parameter.shippingCompanyId}}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a store shipping account',
				description: 'Delete a store shipping account',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/store-shipping-comapanies/" + $parameter.shippingCompanyId}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...storeShippingAccountsGetManyDescription,
	...storeShippingAccountsGetDescription,
	...storeShippingAccountsCreateDescription,
	...storeShippingAccountsUpdateDescription,
	...storeShippingAccountsDeleteDescription,
];
