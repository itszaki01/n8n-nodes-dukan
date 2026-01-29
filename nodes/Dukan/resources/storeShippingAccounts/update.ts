import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStoreShippingAccountsUpdate = {
	operation: ['update'],
	resource: ['storeShippingAccounts'],
};

export const storeShippingAccountsUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Shipping Account ID',
		name: 'shippingCompanyId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForStoreShippingAccountsUpdate,
		},
		description: "The store shipping account's MongoDB ObjectId to update",
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStoreShippingAccountsUpdate,
		},
		description: 'Whether to use JSON to define the update data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForStoreShippingAccountsUpdate,
				useJson: [true],
			},
		},
		description: 'JSON object with fields to update (aliasName, shipDirectly, isActive, apiEndpoint1-3, apiKey1-6)',
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
		displayName: 'Alias Name',
		name: 'aliasName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStoreShippingAccountsUpdate,
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
				...showOnlyForStoreShippingAccountsUpdate,
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
				...showOnlyForStoreShippingAccountsUpdate,
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
