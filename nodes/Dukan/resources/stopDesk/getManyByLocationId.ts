import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStopDeskGetManyByLocation = {
	operation: ['getManyByLocation'],
	resource: ['stopDesk'],
};

export const stopDeskGetManyByLocationIdDescription: INodeProperties[] = [
	{
		displayName: 'Location ID',
		name: 'locationId',
		type: 'string',
		default: '',
		displayOptions: { show: showOnlyForStopDeskGetManyByLocation },
		required: true,
		description: 'The ID of the location to get the stop desks for',
	},
	{
		displayName: 'Page Number',
		name: 'page',
		type: 'number',
		displayOptions: { show: showOnlyForStopDeskGetManyByLocation },
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
		displayOptions: { show: showOnlyForStopDeskGetManyByLocation },
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: { show: showOnlyForStopDeskGetManyByLocation },
		default: `-createdAt`,
		description: 'Sort Docs by Fields',
		hint: 'Single field or space separated fields example: "name -createdAt"',
	},
	//Populate Fields
	{
		displayName: 'Populate Fields',
		name: 'populate',
		type: 'string',
		displayOptions: { show: showOnlyForStopDeskGetManyByLocation },
		default: ``,
		description: 'Populate Fields to return',
		hint: 'Space separated fields example: "name state.name"',
	},
	//Select Fields
	{
		displayName: 'Select Fields',
		name: 'select',
		type: 'string',
		displayOptions: { show: showOnlyForStopDeskGetManyByLocation },
		default: ``,
		description: 'Select Fields to return',
		hint: 'Space separated fields example: "name state"',
	},
	//Offset
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: { show: showOnlyForStopDeskGetManyByLocation },
		default: 0,
		description: 'Offset to skip',
	},
	{
		displayName: 'Filter',
		hint: 'A JSON String of a filter object with Mongo Db Query Operations: <a href="https://www.mongodb.com/docs/manual/tutorial/query-documents/" target="_blank">https://www.mongodb.com/docs/manual/tutorial/query-documents/</a>',
		name: 'filter',
		type: 'string',
		displayOptions: { show: showOnlyForStopDeskGetManyByLocation },
		default: `{}`,
		description: 'A JSON String of a filter object with Mongo Db Query Operations: <a href="https://www.mongodb.com/docs/manual/tutorial/query-documents/" target="_blank">https://www.mongodb.com/docs/manual/tutorial/query-documents/</a>',
	},
];
