import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { cityDescription } from './resources/city';
import { deliveryCompaniesApiDescription } from './resources/deliveryCompaniesApi';
import { orderDescription } from './resources/order';
import { productDescription } from './resources/product';
import { stateDescription } from './resources/state';
import { stopDeskDescription } from './resources/stopDesk';
import { storeDescription } from './resources/store';
import { storeShippingAccountsDescription } from './resources/storeShippingAccounts';
import { storeClientsDescription } from './resources/storeClients';
import { storeCouponsDescription } from './resources/storeCoupons';
import { storeStockDescription } from './resources/storeStock';
import { teamUserDescription } from './resources/teamUser';

export class Dukan implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dukan',
		name: 'dukan',
		icon: { light: 'file:dukan-logo.svg', dark: 'file:dukan-logo.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Dukan API',
		defaults: {
			name: 'Dukan',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'dukanApi', required: false }],
		requestDefaults: {
			baseURL:
				'={{ ($parameter["forceCustomBaseUrl"] && $parameter["customBaseUrl"]) ? $parameter["customBaseUrl"] : $credentials.baseUrl }}/v1/external',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// If forceCustomAuth is enabled, set header here.
				// The credential's authenticate() will detect this header and not overwrite it.
				'X-AFFLITA-JWT':
					'={{ $parameter["forceCustomAuth"] ? $parameter["customApiKey"] : undefined }}',
			},
		},
		properties: [
			{
				displayName: 'Force Custom Auth Header',
				name: 'forceCustomAuth',
				type: 'boolean',
				default: false,
				description:
					'Whether to use a custom API key from this node instead of the configured Dukan credentials',
			},
			{
				displayName: 'Force Custom Base URL',
				name: 'forceCustomBaseUrl',
				type: 'boolean',
				default: false,
				description:
					'Whether to use a custom Base URL from this node instead of the Base URL in the credentials',
			},
			{
				displayName: 'Custom Base URL',
				name: 'customBaseUrl',
				type: 'string',
				placeholder: 'https://store.company.com',
				default: '',
				displayOptions: {
					show: {
						forceCustomBaseUrl: [true],
					},
				},
				description:
					'Base URL to use for API requests instead of the Base URL from the credentials (without the /v1/external suffix)',
			},
			{
				displayName: 'Custom API Key',
				name: 'customApiKey',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				displayOptions: {
					show: {
						forceCustomAuth: [true],
					},
				},
				description: 'API key to send when Force Custom Auth Header is enabled',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Store Shipping Account',
						value: 'storeShippingAccounts',
					},
					{
						name: 'Delivery Companies API',
						value: 'deliveryCompaniesApi',
					},
					{
						name: 'Team User',
						value: 'teamUser',
					},
					{
						name: 'Store',
						value: 'store',
					},
					{
						name: 'State',
						value: 'state',
					},
					{
						name: 'Stop Desk',
						value: 'stopDesk',
					},
					{
						name: 'City Or Municipality',
						value: 'city',
					},
					{
						name: 'Store Client',
						value: 'storeClients',
					},
					{
						name: 'Store Coupon',
						value: 'storeCoupons',
					},
					{
						name: 'Store Pro Stock',
						value: 'storeStock',
					},
				],
				default: 'order',
			},
			...cityDescription,
			...deliveryCompaniesApiDescription,
			...orderDescription,
			...productDescription,
			...stateDescription,
			...stopDeskDescription,
			...storeDescription,
			...storeShippingAccountsDescription,
			...storeClientsDescription,
			...storeCouponsDescription,
			...storeStockDescription,
			...teamUserDescription,
		],
	};
}
