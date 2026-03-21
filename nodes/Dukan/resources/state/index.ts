import type { INodeProperties } from 'n8n-workflow';

import { stateGetDescription } from './get';
import { stateGetManyDescription } from './getMany';
import { stateCreateDescription } from './create';
import { stateDeleteDescription } from './delete';
import { stateUpdateDescription } from './update';


const showOnlyForStates = {
	resource: ['state'],
};

export const stateDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForStates,
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Get Many States',
				value: 'getMany',
				action: 'Get many states',
				description: 'Get many states with pagination (uses the token store)',
				routing: {
					request: {
						method: 'GET',
						url: '/store-location-api',
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
				name: 'Get Many States By Store',
				value: 'getManyByStore',
				action: 'Get many states by store',
				description:
					'Get many states for a given store ID',
				routing: {
					request: {
						method: 'GET',
						url: '/store-location-api/by-store',
						qs: {
							store: '={{$parameter.store}}',
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
				name: 'Get One State',
				value: 'getOne',
				action: 'Get a state',
				description: 'Get the data of a single state',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-location-api/" + $parameter.stateId}}',
					},
				},
			},
			{
				name: 'Create State',
				value: 'create',
				action: 'Create a new state',
				description: 'Create a new state',
				routing: {
					request: {
						method: 'POST',
						url: '/store-location-api',
					},
				},
			},
			{
				name: 'Update State',
				value: 'update',
				action: 'Update a state',
				description: 'Update an existing state',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-location-api/" + $parameter.stateId}}',
					},
				},
			},
			{
				name: 'Delete State',
				value: 'delete',
				action: 'Delete a state',
				description: 'Delete a state',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/store-location-api/" + $parameter.stateId}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...stateGetManyDescription,
	...stateGetDescription,
	...stateCreateDescription,
	...stateUpdateDescription,
	...stateDeleteDescription,
];
