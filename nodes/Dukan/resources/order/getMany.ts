import type { INodeProperties } from 'n8n-workflow';

const showOnlyForUserGetMany = {
	operation: ['getMany'],
	resource: ['order'],
};

export const orderGetManyDescription: INodeProperties[] = [
	{
		displayName: 'Page Number',
		name: 'page',
		type: 'number',
		displayOptions: { show: showOnlyForUserGetMany },
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
		displayOptions: { show: showOnlyForUserGetMany },
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filter',
		hint: 'Mongodb Query Object: https://www.mongodb.com/docs/manual/reference/mql/query-predicates',
		name: 'filter',
		type: 'json',
		displayOptions: { show: showOnlyForUserGetMany },
		default: `{
	"$in":{},
	"$or":{},
	"$eq":{},
	"$eq":{}
}`,
		description: 'Filter Docs with Mongo Db Query Opertaions',
	},
];
