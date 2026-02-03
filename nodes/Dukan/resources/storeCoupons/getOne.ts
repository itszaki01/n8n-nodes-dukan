import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreCouponsGetOne = {
	operation: ['getOne'],
	resource: ['storeCoupons'],
};

export const storeCouponsGetOneDescription: INodeProperties[] = [
	{
		displayName: 'Coupon ID',
		name: 'couponId',
		type: 'string',
		displayOptions: { show: showOnlyForStoreCouponsGetOne },
		default: '',
		required: true,
		description: "The coupon's ID (MongoDB ObjectId) to retrieve",
	},
];
