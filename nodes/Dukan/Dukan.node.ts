import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { cityDescription } from './resources/city';
import { deliveryCompaniesApiDescription } from './resources/deliveryCompaniesApi';
import { orderDescription } from './resources/order';
import { productDescription } from './resources/product';
import { stateDescription } from './resources/state';
import { stopDeskDescription } from './resources/stopDesk';
import { storeDescription } from './resources/store';
import { storeShippingAccountsDescription } from './resources/storeShippingAccounts';
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
		credentials: [{ name: 'dukanApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}/v1/external',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-AFFLITA-JWT': '={{$credentials.apiKey}}',
			},
		},
		properties: [
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
			...teamUserDescription,
		],
	};
}
