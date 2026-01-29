import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStoreShippingAccountsCreate = {
	operation: ['create'],
	resource: ['storeShippingAccounts'],
};

export const storeShippingAccountsCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStoreShippingAccountsCreate,
		},
		description: 'Whether to use JSON to define the store shipping account data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForStoreShippingAccountsCreate,
				useJson: [true],
			},
		},
		description: 'JSON object containing store shipping account data (shippingCompany, aliasName, shipDirectly, isActive, apiEndpoint1-3, apiKey1-6)',
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
								Object.entries(parsedBody).filter(([, v]) => v !== '')
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
		displayName: 'Platform Shipping Company ID',
		name: 'shippingCompany',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreShippingAccountsCreate,
				useJson: [false],
			},
		},
		description: 'MongoDB ObjectId of the platform shipping company (required)',
		routing: {
			send: {
				type: 'body',
				property: 'shippingCompany',
			},
		},
	},
	{
		displayName: 'Alias Name',
		name: 'aliasName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStoreShippingAccountsCreate,
				useJson: [false],
			},
		},
		description: 'Display name for this shipping account (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'aliasName',
				value: '={{$parameter.aliasName !== "" ? $parameter.aliasName : undefined}}',
			},
		},
	},
	{
		displayName: 'Ship Directly',
		name: 'shipDirectly',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStoreShippingAccountsCreate,
				useJson: [false],
			},
		},
		description: 'Whether to ship directly (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'shipDirectly',
			},
		},
	},
	{
		displayName: 'Is Active',
		name: 'isActive',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				...showOnlyForStoreShippingAccountsCreate,
				useJson: [false],
			},
		},
		description: 'Whether the account is active (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'isActive',
			},
		},
	},
];
