import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreClientsGetMany = {
	operation: ['getMany'],
	resource: ['storeClients'],
};

export const storeClientsGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Page Number',
		name: 'page',
		type: 'number',
		displayOptions: { show: showOnlyForStoreClientsGetMany },
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
		displayOptions: { show: showOnlyForStoreClientsGetMany },
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: { show: showOnlyForStoreClientsGetMany },
		default: '-createdAt',
		description: 'Sort Docs by Fields',
		hint: 'Single field or space separated fields example: "name -createdAt"',
	},
	{
		displayName: 'Populate Fields',
		name: 'populate',
		type: 'string',
		displayOptions: { show: showOnlyForStoreClientsGetMany },
		default: '',
		description: 'Populate Fields to return',
		hint: 'Space separated fields example: "name state.name"',
	},
	{
		displayName: 'Select Fields',
		name: 'select',
		type: 'string',
		displayOptions: { show: showOnlyForStoreClientsGetMany },
		default: '',
		description: 'Select Fields to return',
		hint: 'Space separated fields example: "name state"',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: { show: showOnlyForStoreClientsGetMany },
		default: 0,
		description: 'Offset to skip',
	},
	{
		displayName: 'Filter',
		hint: 'A JSON String of a filter object with Mongo Db Query Operations: <a href="https://www.mongodb.com/docs/manual/tutorial/query-documents/" target="_blank">https://www.mongodb.com/docs/manual/tutorial/query-documents/</a>',
		name: 'filter',
		type: 'string',
		displayOptions: { show: showOnlyForStoreClientsGetMany },
		default: '{}',
		description: 'A JSON String of a filter object with Mongo Db Query Operations: <a href="https://www.mongodb.com/docs/manual/tutorial/query-documents/" target="_blank">https://www.mongodb.com/docs/manual/tutorial/query-documents/</a>',
	},
];
