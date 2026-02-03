import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreCouponsGetByCode = {
	operation: ['getByCode'],
	resource: ['storeCoupons'],
};

export const storeCouponsGetByCodeDescription: INodeProperties[] = [
	{
		displayName: 'Coupon Code',
		name: 'couponCode',
		type: 'string',
		displayOptions: { show: showOnlyForStoreCouponsGetByCode },
		default: '',
		required: true,
		description: 'The coupon code to look up',
	},
];
