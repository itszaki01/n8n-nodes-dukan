import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForCityUpdate = {
	operation: ['update'],
	resource: ['city'],
};

export const cityUpdateDescription: INodeProperties[] = [
	{
		displayName: 'City ID',
		name: 'cityId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForCityUpdate,
		},
		description: "The city's MongoDB ObjectId to update",
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForCityUpdate,
		},
		description: 'Whether to use JSON to define the city data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForCityUpdate,
				useJson: [true],
			},
		},
		description: 'JSON object containing product data. See ProductDto.ts for complete structure.',
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
		displayName: 'City Name',
		name: 'subLocationName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForCityUpdate,
				useJson: [false],
			},
		},
		description: 'City name (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'subLocationName',
				value: '={{$parameter.subLocationName !== "" ? $parameter.subLocationName : undefined}}',
			},
		},
	},
	{
		displayName: 'City Custom ID',
		name: 'subLocationCustomId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForCityUpdate,
				useJson: [false],
			},
		},
		description: 'Custom ID for the city (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'subLocationCustomId',
				value: '={{$parameter.subLocationCustomId !== "" ? $parameter.subLocationCustomId : undefined}}',
			},
		},
	},
	{
		displayName: 'Is Active',
		name: 'isActive',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForCityUpdate,
				useJson: [false],
			},
		},
		description: 'Whether the city is active (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'isActive',
			},
		},
	},
];
