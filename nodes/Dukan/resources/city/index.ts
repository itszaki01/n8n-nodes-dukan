import type { INodeProperties } from 'n8n-workflow';
import { cityGetDescription } from './get';
import { cityDeleteDescription } from './delete';
import { cityGetManyDescription } from './getMany';
import { cityUpdateDescription } from './update';
import { cityCreateDescription } from './create';

const showOnlyForCities = {
	resource: ['city'],
};

export const cityDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCities,
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Get Many Cities',
				value: 'getMany',
				action: 'Get many cities',
				description: 'Get many cities with pagination',
				routing: {
					request: {
						method: 'GET',
						url: '/store-location-sub-api',
						qs: {
							page: '={{$parameter.page}}',
							limit: '={{$parameter.limit}}',
							filter: '={{$parameter.filter}}',
							select: '={{$parameter.select}}',
							sort: '={{$parameter.sort}}',
							populate: '={{$parameter.populate}}',
						},
					},
				},
			},
			{
				name: 'Get One City',
				value: 'getOne',
				action: 'Get a city',
				description: 'Get the data of a single city',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-location-sub-api/" + $parameter.cityId}}',
					},
				},
			},
			{
				name: 'Create City',
				value: 'create',
				action: 'Create a new city',
				description: 'Create a new city',
				routing: {
					request: {
						method: 'POST',
						url: '/store-location-sub-api',
					},
				},
			},
			{
				name: 'Update City',
				value: 'update',
				action: 'Update a city',
				description: 'Update an existing city',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-location-sub-api/" + $parameter.cityId}}',
					},
				},
			},
			{
				name: 'Delete City',
				value: 'delete',
				action: 'Delete a city',
				description: 'Delete a city',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/store-location-sub-api/" + $parameter.cityId}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...cityGetManyDescription,
	...cityGetDescription,
	...cityCreateDescription,
	...cityUpdateDescription,
	...cityDeleteDescription,
];
