import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProductImportSingleFromUrl = {
	operation: ['importSingleFromUrl'],
	resource: ['product'],
};

export const productImportSingleFromUrlDescription: INodeProperties[] = [
	{
		displayName: 'Product URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForProductImportSingleFromUrl,
		},
		description: 'The product URL to import',
		routing: {
			send: {
				type: 'body',
				property: 'url',
			},
		},
	},
];

