import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStoreStockUpdate = {
	operation: ['update'],
	resource: ['storeStock'],
};

export const storeStockUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Stock Variable ID',
		name: 'stock_variable_id',
		type: 'string',
		displayOptions: { show: showOnlyForStoreStockUpdate },
		default: '',
		required: true,
		description: "The stock variable's ID (MongoDB ObjectId) to update",
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStoreStockUpdate,
		},
		description: 'Whether to use JSON to define the payload',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForStoreStockUpdate,
				useJson: [true],
			},
		},
		description:
			'JSON object. Optional fields: sku (string), image_url (string), limitAllowedStoresWhiteList (boolean), allowedStoresWhiteList (array of ObjectId strings), isDeleted (boolean).',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{JSON.parse($parameter.json)}}',
				preSend: [
					async function (this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
						const jsonString = this.getNodeParameter('json', '{}') as string;
						try {
							const parsedBody = JSON.parse(jsonString);
							const cleanedBody = Object.fromEntries(
								Object.entries(parsedBody).filter(([, v]) => v !== ''),
							);
							requestOptions.body = cleanedBody;
						} catch {
							throw new Error('Invalid JSON provided in the JSON field');
						}
						return requestOptions;
					},
				],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				...showOnlyForStoreStockUpdate,
				useJson: [false],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-collection-type-unsorted-items
		options: [
			{
				displayName: 'SKU',
				name: 'sku',
				type: 'string',
				default: '',
				description: 'Stock keeping unit',
				routing: {
					send: {
						type: 'body',
						property: 'sku',
						value: '={{$parameter.sku !== "" ? $parameter.sku : undefined}}',
					},
				},
			},
			{
				displayName: 'Image URL',
				name: 'image_url',
				type: 'string',
				default: '',
				description: 'Image URL for the stock variable',
				routing: {
					send: {
						type: 'body',
						property: 'image_url',
						value: '={{$parameter.image_url !== "" ? $parameter.image_url : undefined}}',
					},
				},
			},
			{
				displayName: 'Limit Allowed Stores White List',
				name: 'limitAllowedStoresWhiteList',
				type: 'boolean',
				default: false,
				description: 'Whether to restrict this stock to a whitelist of stores',
				routing: {
					send: {
						type: 'body',
						property: 'limitAllowedStoresWhiteList',
						value: '={{$parameter.limitAllowedStoresWhiteList}}',
					},
				},
			},
			{
				displayName: 'Allowed Stores White List',
				name: 'allowedStoresWhiteList',
				type: 'string',
				default: '',
				description: 'JSON array of store ObjectIds, e.g. ["id1","id2"]',
				routing: {
					send: {
						type: 'body',
						property: 'allowedStoresWhiteList',
						value: '={{$parameter.allowedStoresWhiteList !== "" ? JSON.parse($parameter.allowedStoresWhiteList) : undefined}}',
					},
				},
			},
			{
				displayName: 'Is Deleted',
				name: 'isDeleted',
				type: 'boolean',
				default: false,
				description: 'Whether to mark the stock variable as deleted',
				routing: {
					send: {
						type: 'body',
						property: 'isDeleted',
						value: '={{$parameter.isDeleted}}',
					},
				},
			},
		],
	},
];
