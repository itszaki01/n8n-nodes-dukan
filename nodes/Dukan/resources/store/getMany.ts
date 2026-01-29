import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreGetMany = {
	operation: ['getMany'],
	resource: ['store'],
};

export const storeGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Page Number',
		name: 'page',
		type: 'number',
		displayOptions: { show: showOnlyForStoreGetMany },
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'The Page Number to retrieve',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: { show: showOnlyForStoreGetMany },
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: { show: showOnlyForStoreGetMany },
		default: '-createdAt',
		description: 'Sort Docs by Fields',
		hint: 'Single field or space separated fields example: "name -createdAt"',
	},
	{
		displayName: 'Populate Fields',
		name: 'populate',
		type: 'string',
		displayOptions: { show: showOnlyForStoreGetMany },
		default: '',
		description: 'Populate Fields to return',
		hint: 'Space separated fields example: "name mainStore"',
	},
	{
		displayName: 'Select Fields',
		name: 'select',
		type: 'string',
		displayOptions: { show: showOnlyForStoreGetMany },
		default: '',
		description: 'Select Fields to return',
		hint: 'Space separated fields example: "name mainStore"',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: { show: showOnlyForStoreGetMany },
		default: 0,
		description: 'Offset to skip',
	},
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'string',
		displayOptions: { show: showOnlyForStoreGetMany },
		default: '{}',
		description: 'A JSON String of a filter object with Mongo Db Query Operations',
		hint: 'A JSON String of a filter object with Mongo Db Query Operations',
	},
];
