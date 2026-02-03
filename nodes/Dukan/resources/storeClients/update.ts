import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStoreClientsUpdate = {
	operation: ['update'],
	resource: ['storeClients'],
};

export const storeClientsUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		displayOptions: { show: showOnlyForStoreClientsUpdate },
		default: '',
		required: true,
		description: "The store client's MongoDB ObjectId to update",
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStoreClientsUpdate,
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
				...showOnlyForStoreClientsUpdate,
				useJson: [true],
			},
		},
		description: 'JSON object. Optional fields: clientPhoneNumber (string), clientName (string), isBanned (boolean).',
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
				...showOnlyForStoreClientsUpdate,
				useJson: [false],
			},
		},
		options: [
			{
				displayName: 'Client Name',
				name: 'clientName',
				type: 'string',
				default: '',
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
				displayName: 'Client Phone Number',
				name: 'clientPhoneNumber',
				type: 'string',
				default: '',
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
				displayName: 'Is Banned',
				name: 'isBanned',
				type: 'boolean',
				default: false,
				description: 'Whether the client is banned from ordering',
				routing: {
					send: {
						type: 'body',
						property: 'isBanned',
						value: '={{$parameter.isBanned}}',
					},
				},
			},
		],
	},
];
