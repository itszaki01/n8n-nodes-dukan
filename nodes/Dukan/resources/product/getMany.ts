import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProductGetMany = {
	operation: ['getMany'],
	resource: ['product'],
};

export const productGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Page Number',
		name: 'page',
		type: 'number',
		displayOptions: { show: showOnlyForProductGetMany },
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
		displayOptions: { show: showOnlyForProductGetMany },
		default: 50,
		description: 'Max number of results to return',
	},


	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: { show: showOnlyForProductGetMany },
		default: `-createdAt`,
		description: 'Sort Docs by Fields',
		hint: 'Single field or space separated fields example: "name -createdAt"',
	},
	//Populate Fields
	{
		displayName: 'Populate Fields',
		name: 'populate',
		type: 'string',
		displayOptions: { show: showOnlyForProductGetMany },
		default: ``,
		description: 'Populate Fields to return',
		hint: 'Space separated fields example: "name state.name"',
	},
	//Select Fields
	{
		displayName: 'Select Fields',
		name: 'select',
		type: 'string',
		displayOptions: { show: showOnlyForProductGetMany },
		default: ``,
		description: 'Select Fields to return',
		hint: 'Space separated fields example: "name state"',
	},
	//Offset
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: { show: showOnlyForProductGetMany },
		default: 0,
		description: 'Offset to skip',
	},
	{
		displayName: 'Filter',
		hint: 'A JSON String of a filter object with Mongo Db Query Operations: <a href="https://www.mongodb.com/docs/manual/tutorial/query-documents/" target="_blank">https://www.mongodb.com/docs/manual/tutorial/query-documents/</a>',
		name: 'filter',
		type: 'string',
		displayOptions: { show: showOnlyForProductGetMany },
		default: `{
	"$or":[],
	"$and":[]
}`,
		description: 'A JSON String of a filter object with Mongo Db Query Operations: <a href="https://www.mongodb.com/docs/manual/tutorial/query-documents/" target="_blank">https://www.mongodb.com/docs/manual/tutorial/query-documents/</a>',
	},
];
