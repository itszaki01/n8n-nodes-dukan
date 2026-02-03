import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStoreCouponsCreate = {
	operation: ['create'],
	resource: ['storeCoupons'],
};

export const storeCouponsCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForStoreCouponsCreate,
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
				...showOnlyForStoreCouponsCreate,
				useJson: [true],
			},
		},
		description:
			'JSON object. Fields: couponCode (string, max 8), promoType ("percentage"|"fixed-price"), value (number), allowExpiration (boolean), couponExipreAt (ISO date string), allowLimits (boolean), limit (number).',
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
		displayName: 'Coupon Code',
		name: 'couponCode',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreCouponsCreate,
				useJson: [false],
			},
		},
		description: 'Discount code (max 8 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'couponCode',
				value: '={{$parameter.couponCode !== "" ? $parameter.couponCode : undefined}}',
			},
		},
	},
	{
		displayName: 'Promo Type',
		name: 'promoType',
		type: 'options',
		options: [
			{ name: 'Percentage', value: 'percentage' },
			{ name: 'Fixed Price', value: 'fixed-price' },
		],
		default: 'percentage',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreCouponsCreate,
				useJson: [false],
			},
		},
		description: 'Type of promotion',
		routing: {
			send: {
				type: 'body',
				property: 'promoType',
			},
		},
	},
	{
		displayName: 'Value',
		name: 'value',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreCouponsCreate,
				useJson: [false],
			},
		},
		description: 'Discount value (percentage or fixed amount)',
		routing: {
			send: {
				type: 'body',
				property: 'value',
				value: '={{$parameter.value}}',
			},
		},
	},
	{
		displayName: 'Allow Expiration',
		name: 'allowExpiration',
		type: 'boolean',
		default: true,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreCouponsCreate,
				useJson: [false],
			},
		},
		description: 'Whether the coupon has an expiration date',
		routing: {
			send: {
				type: 'body',
				property: 'allowExpiration',
				value: '={{$parameter.allowExpiration}}',
			},
		},
	},
	{
		displayName: 'Coupon Expire At',
		name: 'couponExipreAt',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreCouponsCreate,
				useJson: [false],
			},
		},
		description: 'Expiration date (e.g. ISO string: 2025-12-31T23:59:59.000Z)',
		routing: {
			send: {
				type: 'body',
				property: 'couponExipreAt',
				value: '={{$parameter.couponExipreAt !== "" ? $parameter.couponExipreAt : undefined}}',
			},
		},
	},
	{
		displayName: 'Allow Limits',
		name: 'allowLimits',
		type: 'boolean',
		default: true,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreCouponsCreate,
				useJson: [false],
			},
		},
		description: 'Whether the coupon has a usage limit',
		routing: {
			send: {
				type: 'body',
				property: 'allowLimits',
				value: '={{$parameter.allowLimits}}',
			},
		},
	},
	// eslint-disable-next-line n8n-nodes-base/node-param-type-options-missing-from-limit
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForStoreCouponsCreate,
				useJson: [false],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-description-wrong-for-limit
		description: 'Usage limit (number of times the coupon can be used)',
		routing: {
			send: {
				type: 'body',
				property: 'limit',
				value: '={{$parameter.limit}}',
			},
		},
	},
];
