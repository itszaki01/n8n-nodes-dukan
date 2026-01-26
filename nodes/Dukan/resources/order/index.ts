import type { INodeProperties } from 'n8n-workflow';
import { orderCreateDescription } from './create';
import { orderGetManyDescription } from './getMany';
import { orderGetOneDescription } from './getOne';
import { orderUpdateOrderDetailsDescription } from './updateOrderDetails';
import { orderUpdateStatusDescription } from './updateStatus';
import { orderUpdateClientInfoDescription } from './updateClientInfo';

const showOnlyFororders = {
	resource: ['order'],
};

export const orderDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyFororders,
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Get Many Orders',
				value: 'getMany',
				action: 'Get many',
				description: 'Get Data of all Orders',
				routing: {
					request: {
						method: 'GET',
						url: '/store-order-cart-api',
						qs: {
							page: '={{$parameter.page}}',
							limit: '={{$parameter.limit}}',
							filter: '={{$parameter.filter}}',
							select: '={{$parameter.select}}',
							sort: '={{$parameter.sort}}',
							populate: '={{$parameter.populate}}',
							offset: '={{$parameter.offset}}',
						},
					},
				},
			},
			{
				name: 'Get One Order',
				value: 'getOne',
				action: 'Get a cart',
				description: 'Get the data of a single order',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-order-cart-api/" + $parameter.cartUid}}',
					},
				},
			},
			{
				name: 'Create an Order',
				value: 'create',
				action: 'Create a new order',
				description: 'Create a new store order',
				routing: {
					request: {
						method: 'POST',
						url: '/store-order-cart-api',
					},
				},
			},
			{
				name: 'Update Order Details',
				value: 'update',
				action: 'Update order details',
				description: 'Update order details (prices, tracking, etc.)',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-order-cart-api/updateOrderDetails/" + $parameter.cartId}}',
					},
				},
			},
			{
				name: 'Update Order Status',
				value: 'updateStatus',
				action: 'Update order status',
				description: 'Update order status and delivery status',
				routing: {
					request: {
						method: 'PUT',
						url: '={{"/store-order-cart-api/updatedStatus/" + $parameter.cartId}}',
					},
				},
			},
			{
				name: 'Update Client Info',
				value: 'updateClientInfo',
				action: 'Update client info',
				description: 'Update client information (phone, address, location, shipping type, etc.)',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-order-cart-api/updateClientInfo/" + $parameter.cartId}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...orderGetManyDescription,
	...orderGetOneDescription,
	...orderCreateDescription,
	...orderUpdateOrderDetailsDescription,
	...orderUpdateStatusDescription,
	...orderUpdateClientInfoDescription,
];
