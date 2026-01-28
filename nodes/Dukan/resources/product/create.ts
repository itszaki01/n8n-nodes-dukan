import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForProductCreate = {
	operation: ['create'],
	resource: ['product'],
};

export const productCreateDescription: INodeProperties[] = [
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForProductCreate,
		},
		description: 'Whether to use JSON to define the product data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
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
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product name (required, max 200 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
	{
		displayName: 'Product Short Name',
		name: 'productShortName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Short name for the product (required, max 20 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'productShortName',
			},
		},
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		default: 0,
		required: true,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product price (required, minimum 1)',
		routing: {
			send: {
				type: 'body',
				property: 'price',
			},
		},
	},
	{
		displayName: 'Old Price',
		name: 'oldPrice',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Old price for discount display (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'oldPrice',
				value: '={{$parameter.oldPrice !== undefined ? $parameter.oldPrice : undefined}}',
			},
		},
	},
	{
		displayName: 'Product Fees',
		name: 'productFees',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product fees (optional, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'productFees',
				value: '={{$parameter.productFees !== undefined ? $parameter.productFees : undefined}}',
			},
		},
	},
	{
		displayName: 'Product SKU',
		name: 'productSku',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product SKU (required, uppercase)',
		routing: {
			send: {
				type: 'body',
				property: 'productSku',
			},
		},
	},
	{
		displayName: 'Slug',
		name: 'slug',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product slug/URL identifier (required)',
		routing: {
			send: {
				type: 'body',
				property: 'slug',
			},
		},
	},
	{
		displayName: 'Rating',
		name: 'rating',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product rating (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'rating',
				value: '={{$parameter.rating !== undefined ? $parameter.rating : undefined}}',
			},
		},
	},

	{
		displayName: 'Category',
		name: 'category',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product category (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'category',
				value: '={{$parameter.category !== "" ? $parameter.category : undefined}}',
			},
		},
	},
	{
		displayName: 'Image Cover',
		name: 'imageCover',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Cover image URL (required)',
		routing: {
			send: {
				type: 'body',
				property: 'imageCover',
			},
		},
	},
	{
		displayName: 'Images',
		name: 'images',
		type: 'json',
		default: '[]',
		required: true,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
		description: 'Array of product images. Each item: { imageUrl: string, imageVar?: string }',
		routing: {
			send: {
				type: 'body',
				property: 'images',
				value: '{{JSON.parse($parameter.images)}}',
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product description (optional, max 300 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'description',
				value: '={{$parameter.description !== "" ? $parameter.description : undefined}}',
			},
		},
	},
	{
		displayName: 'Show Product',
		name: 'showProduct',
		type: 'boolean',
		default: true,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether to show the product (required)',
		routing: {
			send: {
				type: 'body',
				property: 'showProduct',
			},
		},
	},
	{
		displayName: 'Is Limited Quantity',
		name: 'isLimitedQtty',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],

			},
		},
		description: 'Whether the product has limited quantity (required)',
		routing: {
			send: {
				type: 'body',
				property: 'isLimitedQtty',
			},
		},
	},
	{
		displayName: 'Remaining Quantity',
		name: 'remainingQtty',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
				isLimitedQtty: [true],
			},
		},
		description: 'Remaining quantity (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'remainingQtty',
				value: '={{$parameter.remainingQtty !== undefined ? $parameter.remainingQtty : undefined}}',
			},
		},
	},
	{
		displayName: 'Free Shipping',
		name: 'freeShipping',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether shipping is free (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'freeShipping',
			},
		},
	},
	{
		displayName: 'Landing Page',
		name: 'landingPage',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether to show on landing page (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'landingPage',
			},
		},
	},

	// {
	// 	displayName: 'Sub Category',
	// 	name: 'categorySub',
	// 	type: 'string',
	// 	default: '',
	// 	displayOptions: {
	// 		show: {
	// 			...showOnlyForProductCreate,
	// 			useJson: [false],
	// 		},
	// 	},
	// 	description: 'Product sub category (optional)',
	// 	routing: {
	// 		send: {
	// 			type: 'body',
	// 			property: 'categorySub',
	// 			value: '={{$parameter.categorySub !== "" ? $parameter.categorySub : undefined}}',
	// 		},
	// 	},
	// },
	{
		displayName: 'Colors',
		name: 'colors',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
		description: 'Product colors configuration. See ProductDto.ts for structure: { multiSelect: boolean, allowCustomPrices: boolean, allowLinkWithProperties: boolean, title?: string, list: array }',
		routing: {
			send: {
				type: 'body',
				property: 'colors',
				value: '={{JSON.parse($parameter.colors)}}',
			},
		},
	},
	{
		displayName: 'Other Properties',
		name: 'otherProperties',
		type: 'json',
		default: '[]',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-description-missing-final-period
		description: 'Product properties configuration. See ProductDto.ts for structure: array of { title: string, multiSelect: boolean, allowCustomPrices: boolean, properties: array }',
		routing: {
			send: {
				type: 'body',
				property: 'otherProperties',
				value: '={{JSON.parse($parameter.otherProperties)}}',
			},
		},
	},
	{
		displayName: 'Offers',
		name: 'offers',
		type: 'json',
		default: '[]',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product offers. See ProductDto.ts for structure: array of { offerName: string, quanitity: number, offerProductPrice: number, defaultSelected: boolean, freeShipping: boolean, bestOffer: boolean, ... }',
		routing: {
			send: {
				type: 'body',
				property: 'offers',
				value: '={{JSON.parse($parameter.offers)}}',
			},
		},
	},
	{
		displayName: 'Reviews',
		name: 'reviews',
		type: 'json',
		default: '[]',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Product reviews. See ProductDto.ts for structure: array of { gender: "male"|"female", raterName: string, rating: number, review: string, ... }',
		routing: {
			send: {
				type: 'body',
				property: 'reviews',
				value: '={{JSON.parse($parameter.reviews)}}',
			},
		},
	},
	{
		displayName: 'SEO Keywords',
		name: 'seoKeywords',
		type: 'json',
		default: '[]',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'SEO keywords array (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'seoKeywords',
				value: '={{JSON.parse($parameter.seoKeywords)}}',
			},
		},
	},
	{
		displayName: 'SEO Description',
		name: 'seoDescreption',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'SEO description (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'seoDescreption',
				value: '={{$parameter.seoDescreption !== "" ? $parameter.seoDescreption : undefined}}',
			},
		},
	},
	{
		displayName: 'SEO Image URL',
		name: 'seoImgUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'SEO image URL (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'seoImgUrl',
				value: '={{$parameter.seoImgUrl !== "" ? $parameter.seoImgUrl : undefined}}',
			},
		},
	},
	{
		displayName: 'Product Description',
		name: 'productDesc',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Detailed product description (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'productDesc',
				value: '={{$parameter.productDesc !== "" ? $parameter.productDesc : undefined}}',
			},
		},
	},
	{
		displayName: 'Allow Special Google Sheet',
		name: 'allowSpecialGoogleSheet',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow special Google Sheet integration (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowSpecialGoogleSheet',
			},
		},
	},
	{
		displayName: 'Special Google Sheets API Key',
		name: 'specialGoogleSheetsApiKey',
		// eslint-disable-next-line n8n-nodes-base/node-param-type-options-password-missing
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
				allowSpecialGoogleSheet: [true],
			},
		},
		description: 'Special Google Sheets API key (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'specialGoogleSheetsApiKey',
				value: '={{$parameter.specialGoogleSheetsApiKey !== "" ? $parameter.specialGoogleSheetsApiKey : undefined}}',
			},
		},
	},
	{
		displayName: 'Disable Add to Shopping Cart',
		name: 'disableAddToShoppingCart',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether to disable add to shopping cart (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'disableAddToShoppingCart',
			},
		},
	},
	{
		displayName: 'Disable Suggested Products',
		name: 'disableSuggestedProducts',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether to disable suggested products (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'disableSuggestedProducts',
			},
		},
	},
	{
		displayName: 'Allow Orders When Stock Is Empty',
		name: 'allowOrdersWhenStockIsEmpty',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow orders when stock is empty (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowOrdersWhenStockIsEmpty',
			},
		},
	},
	{
		displayName: 'Default Confirmation Member ID',
		name: 'defaultConfirmatinoMember',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'MongoDB ObjectId of default confirmation member (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'defaultConfirmatinoMember',
				value: '={{$parameter.defaultConfirmatinoMember !== "" ? $parameter.defaultConfirmatinoMember : undefined}}',
			},
		},
	},
	{
		displayName: 'Is Properties Required',
		name: 'isPropertiesRequired',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether properties are required (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'isPropertiesRequired',
			},
		},
	},
	{
		displayName: 'Stock Empty Reaction',
		name: 'stockEmptyReaction',
		type: 'options',
		options: [
			{
				name: 'Disable and Allow Properties',
				value: 'disable-and-allow-properties',
			},
			{
				name: 'Disable Properties',
				value: 'disable-properties',
			},
			{
				name: 'Hide and Show Properties',
				value: 'hide-and-show-properties',
			},
			{
				name: 'Hide Properties',
				value: 'hide-properties',
			},
			{
				name: 'Nothing',
				value: 'nothing',
			},
		],
		default: 'nothing',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Reaction when stock is empty (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'stockEmptyReaction',
				value: '={{$parameter.stockEmptyReaction !== undefined ? $parameter.stockEmptyReaction : undefined}}',
			},
		},
	},
	{
		displayName: 'Allow Custom Thank You Page',
		name: 'allowCustomThankYouPage',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow custom thank you page (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowCustomThankYouPage',
			},
		},
	},
	{
		displayName: 'Custom Thank You Page HTML',
		name: 'customThankYouPageHtml',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
				allowCustomThankYouPage: [true],
			},
		},
		description: 'Custom thank you page HTML content (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'customThankYouPageHtml',
				value: '={{$parameter.customThankYouPageHtml !== "" ? $parameter.customThankYouPageHtml : undefined}}',
			},
		},
	},
	{
		displayName: 'Allow Custom Shipping To Home Price',
		name: 'allowCustomShippingToHomePrice',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow custom shipping to home price (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowCustomShippingToHomePrice',
			},
		},
	},
	{
		displayName: 'Custom Shipping To Home Price',
		name: 'customShippingToHomePrice',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
				allowCustomShippingToHomePrice: [true],
			},
		},
		description: 'Custom shipping to home price (optional, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'customShippingToHomePrice',
				value: '={{$parameter.customShippingToHomePrice !== undefined ? $parameter.customShippingToHomePrice : undefined}}',
			},
		},
	},
	{
		displayName: 'Allow Custom Shipping To Stop Desk Price',
		name: 'allowCustomShppingToStopDeskPrice',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether to allow custom shipping to stop desk price (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'allowCustomShppingToStopDeskPrice',
			},
		},
	},
	{
		displayName: 'Custom Shipping To Stop Desk Price',
		name: 'customShppingToStopDeskPrice',
		type: 'number',
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
				allowCustomShppingToStopDeskPrice: [true],
			},
		},
		description: 'Custom shipping to stop desk price (optional, minimum 0)',
		routing: {
			send: {
				type: 'body',
				property: 'customShppingToStopDeskPrice',
				value: '={{$parameter.customShppingToStopDeskPrice !== undefined ? $parameter.customShppingToStopDeskPrice : undefined}}',
			},
		},
	},
	{
		displayName: 'Free Shipping To Stop Desk',
		name: 'freeShippingToStopDesk',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				...showOnlyForProductCreate,
				useJson: [false],
			},
		},
		description: 'Whether shipping to stop desk is free (optional)',
		routing: {
			send: {
				type: 'body',
				property: 'freeShippingToStopDesk',
			},
		},
	},
];
