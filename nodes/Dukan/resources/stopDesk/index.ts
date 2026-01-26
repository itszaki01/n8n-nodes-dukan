import type { INodeProperties } from 'n8n-workflow';
import { stopDeskGetDescription } from './get';
import { stopDeskDeleteDescription } from './delete';
import { stopDeskGetManyDescription } from './getMany';
import { stopDeskUpdateDescription } from './update';
import { stopDeskCreateDescription } from './create';

const showOnlyForStopDesks = {
	resource: ['stopDesk'],
};

export const stopDeskDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForStopDesks,
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Get Many Stop Desks',
				value: 'getMany',
				action: 'Get many stop desks',
				description: 'Get many stop desks with pagination',
				routing: {
					request: {
						method: 'GET',
						url: '/store-location-stopdesk-api',
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
				name: 'Get One Stop Desk',
				value: 'getOne',
				action: 'Get a stop desk',
				description: 'Get the data of a single stop desk',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-location-stopdesk-api/" + $parameter.stopDeskId}}',
					},
				},
			},
			{
				name: 'Create Stop Desk',
				value: 'create',
				action: 'Create a new stop desk',
				description: 'Create a new stop desk',
				routing: {
					request: {
						method: 'POST',
						url: '/store-location-stopdesk-api',
					},
				},
			},
			{
				name: 'Update Stop Desk',
				value: 'update',
				action: 'Update a stop desk',
				description: 'Update an existing stop desk',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-location-stopdesk-api/" + $parameter.stopDeskId}}',
					},
				},
			},
			{
				name: 'Delete Stop Desk',
				value: 'delete',
				action: 'Delete a stop desk',
				description: 'Delete a stop desk',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/store-location-stopdesk-api/" + $parameter.stopDeskId}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...stopDeskGetManyDescription,
	...stopDeskGetDescription,
	...stopDeskCreateDescription,
	...stopDeskUpdateDescription,
	...stopDeskDeleteDescription,
];
