import type { INodeProperties } from 'n8n-workflow';
import { deliveryCompaniesApiShipOrderFromStoreDescription } from './shipOrderFromStore';
import { deliveryCompaniesApiShipAllStoreOrdersDescription } from './shipAllStoreOrders';
import { deliveryCompaniesApiTrackOrderFromStoreDescription } from './trackOrderFromStore';
import { deliveryCompaniesApiPrintOrderTicketDescription } from './printOrderTicket';
import { deliveryCompaniesApiDeleteColiDescription } from './deleteColi';

const showOnlyForDeliveryCompaniesApi = {
	resource: ['deliveryCompaniesApi'],
};

export const deliveryCompaniesApiDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForDeliveryCompaniesApi,
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Ship Order From Store',
				value: 'shipOrderFromStore',
				action: 'Ship a single order',
				description: 'Ship an order using a store shipping account',
				routing: {
					request: {
						method: 'POST',
						url: '={{"/delivery-comapanies-api/ship-order-from-store/" + $parameter.orderUID + "/" + $parameter.storeShippingCompanyId}}',
						headers: {
							'Content-Type': 'text/plain',
						},
					},
				},
			},
			{
				name: 'Ship All Store Confirmed Orders',
				value: 'shipAllStoreOrders',
				action: 'Ship all confirmed orders',
				description: 'Ship all confirmed orders for the store using a shipping account',
				routing: {
					request: {
						method: 'POST',
						url: '={{"/delivery-comapanies-api/ship-all-store-confirmed-orders/" + $parameter.storeShippingCompanyId}}',
						headers: {
							'Content-Type': 'text/plain',
						},
					},
				},
			},
			{
				name: 'Track Order From Store',
				value: 'trackOrderFromStore',
				action: 'Track an order',
				description: 'Get tracking information for an order from the shipping company',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/delivery-comapanies-api/track-order-from-store/" + $parameter.orderUID}}',
					},
				},
			},
			{
				name: 'Print Order Ticket',
				value: 'printOrderTicket',
				action: 'Print shipping ticket',
				description: 'Print the shipping ticket for an order',
				routing: {
					request: {
						method: 'POST',
						url: '={{"/delivery-comapanies-api/print-order-ticket/" + $parameter.orderUID}}',
						headers: {
							'Content-Type': 'text/plain',
						},
					},
				},
			},
			{
				name: 'Delete Shipment Package',
				value: 'deleteColi',
				action: 'Delete shipment package',
				description: 'Delete the shipment package for an order at the shipping company',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/delivery-comapanies-api/delete-coli/" + $parameter.orderUID}}',
						headers: {
							'Content-Type': 'text/plain',
						},
					},
				},
			},
		],
		default: 'shipOrderFromStore',
	},
	...deliveryCompaniesApiShipOrderFromStoreDescription,
	...deliveryCompaniesApiShipAllStoreOrdersDescription,
	...deliveryCompaniesApiTrackOrderFromStoreDescription,
	...deliveryCompaniesApiPrintOrderTicketDescription,
	...deliveryCompaniesApiDeleteColiDescription,
];
