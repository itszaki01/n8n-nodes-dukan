import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { cityDescription } from './resources/city';
import { orderDescription } from './resources/order';
import { productDescription } from './resources/product';
import { stateDescription } from './resources/state';
import { stopDeskDescription } from './resources/stopDesk';
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
						name: 'Team User',
						value: 'teamUser',
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
			...orderDescription,
			...productDescription,
			...stateDescription,
			...stopDeskDescription,
			...teamUserDescription,
		],
	};
}
