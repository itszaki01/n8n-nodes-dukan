import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStoreStockCreate = {
	operation: ['create'],
	resource: ['storeStock'],
};

export const storeStockCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStoreStockCreate,
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
				...showOnlyForStoreStockCreate,
				useJson: [true],
			},
		},
		description:
			'JSON object. Fields: sku (string), quentity (number), image_url (string, optional), limitAllowedStoresWhiteList (boolean, optional), allowedStoresWhiteList (array of MongoDB ObjectId strings, optional).',
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
		displayName: 'SKU',
		name: 'sku',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreStockCreate,
				useJson: [false],
			},
		},
		description: 'Stock keeping unit (slugified, e.g. underscores)',
		routing: {
			send: {
				type: 'body',
				property: 'sku',
				value: '={{$parameter.sku !== "" ? $parameter.sku : undefined}}',
			},
		},
	},
	{
		displayName: 'Quantity',
		name: 'quentity',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreStockCreate,
				useJson: [false],
			},
		},
		description: 'Initial quantity in stock',
		routing: {
			send: {
				type: 'body',
				property: 'quentity',
				value: '={{$parameter.quentity}}',
			},
		},
	},
	{
		displayName: 'Image URL',
		name: 'image_url',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStoreStockCreate,
				useJson: [false],
			},
		},
		description: 'Optional image URL for the stock variable',
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
		displayOptions: {
			show: {
				...showOnlyForStoreStockCreate,
				useJson: [false],
			},
		},
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
		displayOptions: {
			show: {
				...showOnlyForStoreStockCreate,
				useJson: [false],
			},
		},
		description: 'JSON array of store MongoDB ObjectIds, e.g. ["id1","id2"]. Only used when Limit Allowed Stores White List is true.',
		routing: {
			send: {
				type: 'body',
				property: 'allowedStoresWhiteList',
				value: '={{$parameter.allowedStoresWhiteList !== "" ? JSON.parse($parameter.allowedStoresWhiteList) : undefined}}',
			},
		},
	},
];
