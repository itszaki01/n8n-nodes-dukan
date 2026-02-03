import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStoreClientsCreate = {
	operation: ['create'],
	resource: ['storeClients'],
};

export const storeClientsCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStoreClientsCreate,
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
				...showOnlyForStoreClientsCreate,
				useJson: [true],
			},
		},
		description: 'JSON object. Fields: clientPhoneNumber (string), clientName (string), isBanned (boolean, optional).',
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
		displayName: 'Client Phone Number',
		name: 'clientPhoneNumber',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreClientsCreate,
				useJson: [false],
			},
		},
		description: 'Phone number of the client',
		routing: {
			send: {
				type: 'body',
				property: 'clientPhoneNumber',
				value: '={{$parameter.clientPhoneNumber !== "" ? $parameter.clientPhoneNumber : undefined}}',
			},
		},
	},
	{
		displayName: 'Client Name',
		name: 'clientName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreClientsCreate,
				useJson: [false],
			},
		},
		description: 'Name of the client',
		routing: {
			send: {
				type: 'body',
				property: 'clientName',
				value: '={{$parameter.clientName !== "" ? $parameter.clientName : undefined}}',
			},
		},
	},
	{
		displayName: 'Is Banned',
		name: 'isBanned',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStoreClientsCreate,
				useJson: [false],
			},
		},
		description: 'Whether the client is banned from ordering',
		routing: {
			send: {
				type: 'body',
				property: 'isBanned',
				value: '={{$parameter.isBanned}}',
			},
		},
	},
];
