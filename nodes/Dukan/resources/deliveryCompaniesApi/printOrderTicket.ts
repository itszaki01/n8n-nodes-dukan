import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPrintOrderTicket = {
	operation: ['printOrderTicket'],
	resource: ['deliveryCompaniesApi'],
};

export const deliveryCompaniesApiPrintOrderTicketDescription: INodeProperties[] = [
	{
		displayName: 'Order UID',
		name: 'orderUID',
		type: 'string',
		default: '',
		required: true,
		displayOptions: { show: showOnlyForPrintOrderTicket },
		description: 'The order UID to print the shipping ticket for',
	},
];
