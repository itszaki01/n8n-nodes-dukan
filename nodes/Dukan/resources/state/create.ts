import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStateCreate = {
	operation: ['create'],
	resource: ['state'],
};

export const stateCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStateCreate,
		},
		description: 'Whether to use JSON to define the state data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [true],
			},
		},
		description: 'JSON object containing state data. Required fields: locationName, shippingToHomePrice. Optional fields: locationCustomId, isActive, allowShippingToHomeFakePrice, shippingToHomeFakePrice, allowDefualtShippingAccount, defualtShippingAccount.',
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

							// Optional: Clean empty strings from top-level
							const cleanedBody = Object.fromEntries(
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								Object.entries(parsedBody).filter(([_, v]) => v !== "")
							);

							requestOptions.body = cleanedBody;
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
						} catch (error) {
							throw new Error('Invalid JSON provided in the JSON field');
						}
						return requestOptions;
					},
				],
			},
		},
	},
	{
		displayName: 'State Name',
		name: 'locationName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'State name (required, max 50 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'locationName',
			},
		},
	},
	{
		displayName: 'Shipping To Home Price',
		name: 'shippingToHomePrice',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Shipping price to home (required, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'shippingToHomePrice',
			},
		},
	},
	{
		displayName: 'State Custom ID',
		name: 'locationCustomId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Custom ID for the state (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'locationCustomId',
				value: '={{$parameter.locationCustomId !== "" ? $parameter.locationCustomId : undefined}}',
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
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Whether the state is active (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'isActive',
			},
		},
	},
	{
		displayName: 'Allow Shipping To Home Fake Price',
		name: 'allowShippingToHomeFakePrice',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow fake price for shipping to home (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowShippingToHomeFakePrice',
			},
		},
	},
	{
		displayName: 'Shipping To Home Fake Price',
		name: 'shippingToHomeFakePrice',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
				allowShippingToHomeFakePrice: [true],
			},
		},
		description: 'Fake price for shipping to home (optional, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'shippingToHomeFakePrice',
				value: '={{$parameter.shippingToHomeFakePrice !== undefined ? $parameter.shippingToHomeFakePrice : undefined}}',
			},
		},
	},
	{
		displayName: 'Allow Default Shipping Account',
		name: 'allowDefualtShippingAccount',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow default shipping account (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowDefualtShippingAccount',
			},
		},
	},
	{
		displayName: 'Default Shipping Account',
		name: 'defualtShippingAccount',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForStateCreate,
				useJson: [false],
				allowDefualtShippingAccount: [true],
			},
		},
		description: 'MongoDB ObjectId of default shipping account (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'defualtShippingAccount',
				value: '={{$parameter.defualtShippingAccount !== "" ? $parameter.defualtShippingAccount : undefined}}',
			},
		},
	},
];
