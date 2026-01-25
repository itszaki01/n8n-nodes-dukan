import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { teamUserDescription } from './resources/teamUser';
import { orderDescription } from './resources/order';

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
			baseURL: '={{$credentials.baseUrl}}/v1',
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
				],
				default: 'order',
			},
			...orderDescription,
			...teamUserDescription,
		],
	};
}
