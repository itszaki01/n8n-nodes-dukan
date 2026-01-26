import type { INodeProperties } from 'n8n-workflow';

const showOnlyForOrderUpdateStatus = {
	operation: ['updateStatus'],
	resource: ['order'],
};

export const orderUpdateStatusDescription: INodeProperties[] = [
	{
		displayName: 'Cart UID',
		name: 'cartId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForOrderUpdateStatus,
		},
		description: 'The cart ID to update status',
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForOrderUpdateStatus,
		},
		description: 'Whether to use JSON to define the status update data',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForOrderUpdateStatus,
				useJson: [true],
			},
		},
		description: 'JSON object containing status updates. Only these fields are allowed: orderStatus (string, optional), deliveryStatus (string, optional). Other fields will be ignored.',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{Object.fromEntries(Object.entries(JSON.parse($parameter.json)).filter(([_, v]) => v !== ""))}}',
			},
		},
	},
	{
		displayName: 'Order Status',
		name: 'orderStatus',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'جديد',
				value: 'جديد',
			},
			{
				name: 'مكالمة 1',
				value: 'مكالمة 1',
			},
			{
				name: 'مكالمة 2',
				value: 'مكالمة 2',
			},
			{
				name: 'مكالمة 3',
				value: 'مكالمة 3',
			},
			{
				name: 'مكالمة 4',
				value: 'مكالمة 4',
			},
			{
				name: 'مكالمة 5',
				value: 'مكالمة 5',
			},
			{
				name: 'مأكد',
				value: 'مأكد',
			},
			{
				name: 'مكرر',
				value: 'مكرر',
			},
			{
				name: 'ملغي',
				value: 'ملغي',
			},
			{
				name: 'مؤجل',
				value: 'مؤجل',
			},
		],
		default: 'جديد',
		displayOptions: {
			show: {
				...showOnlyForOrderUpdateStatus,
				useJson: [false],
			},
		},
		description: 'Status of the order',
		routing: {
			send: {
				type: 'body',
				property: 'orderStatus',
			},
		},
	},
	{
		displayName: 'Delivery Status',
		name: 'deliveryStatus',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'قيد المعالجة',
				value: 'قيد المعالجة',
			},
			{
				name: 'قيد التجهيز',
				value: 'قيد التجهيز',
			},
			{
				name: 'قيد التوصيل',
				value: 'قيد التوصيل',
			},
			{
				name: 'مستلم',
				value: 'مستلم',
			},
			{
				name: 'مسترجع',
				value: 'مسترجع',
			},
			{
				name: 'نفذ المخزون',
				value: 'نفذ المخزون',
			},
			{
				name: 'مستبدل',
				value: 'مستبدل',
			},
		],
		default: 'قيد المعالجة',
		displayOptions: {
			show: {
				...showOnlyForOrderUpdateStatus,
				useJson: [false],
			},
		},
		description: 'Delivery status of the order',
		routing: {
			send: {
				type: 'body',
				property: 'deliveryStatus',
			},
		},
	},
];
