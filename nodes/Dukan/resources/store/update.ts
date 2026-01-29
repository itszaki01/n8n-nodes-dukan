import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForStoreUpdate = {
	operation: ['update'],
	resource: ['store'],
};

export const storeUpdateDescription: INodeProperties[] = [
	{
		displayName: 'JSON',
		name: 'json',
		type: 'string',
		default: '{}',
		required: true,
		displayOptions: {
			show: showOnlyForStoreUpdate,
		},
		description:
			'JSON object with store fields to update. See UpdateStoreDto: appearance, allowLocations, currency, theme, themeColorOriginal, mobileBanners, desktopBanners, orderFormInputs, shippingPrefix, country, stopDeskPrefix, headCode, allowSublocations, confirmationServiceCalcsType, seoKeywords, seoDescreption, defaultDomain, allowOrdersWhenStockIsEmpty, orderStatusList, orderDeliveryStatusList, orderPanelSettings, printingPanelSettings, etc.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{JSON.parse($parameter.json)}}',
				preSend: [
					async function (
						this: IExecuteSingleFunctions,
						requestOptions: IHttpRequestOptions
					): Promise<IHttpRequestOptions> {
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
];
