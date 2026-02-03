import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreCouponsRemove = {
	operation: ['delete'],
	resource: ['storeCoupons'],
};

export const storeCouponsRemoveDescription: INodeProperties[] = [
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		displayOptions: { show: showOnlyForStoreCouponsRemove },
		default: '',
		required: true,
		description: "The coupon's ID (MongoDB ObjectId) to delete",
	},
];
