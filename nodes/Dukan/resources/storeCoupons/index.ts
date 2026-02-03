import type { INodeProperties } from 'n8n-workflow';
import { storeCouponsCreateDescription } from './create';
import { storeCouponsGetManyDescription } from './getMany';
import { storeCouponsGetOneDescription } from './getOne';
import { storeCouponsGetByCodeDescription } from './getByCode';
import { storeCouponsUpdateDescription } from './update';
import { storeCouponsRemoveDescription } from './remove';

const showOnlyForStoreCoupons = {
	resource: ['storeCoupons'],
};

export const storeCouponsDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForStoreCoupons,
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Get Many',
				value: 'getMany',
				action: 'Get many store coupons',
				description: 'Get store coupons with pagination',
				routing: {
					request: {
						method: 'GET',
						url: '/store-coupons-api',
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
				name: 'Get One',
				value: 'getOne',
				action: 'Get a coupon by ID',
				description: 'Get a single store coupon by ID',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-coupons-api/" + $parameter.couponId}}',
					},
				},
			},
			{
				name: 'Get By Code',
				value: 'getByCode',
				action: 'Get a coupon by code',
				description: 'Get a single store coupon by its code',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-coupons-api/by-code/" + $parameter.couponCode}}',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a store coupon',
				description: 'Create a new store coupon',
				routing: {
					request: {
						method: 'POST',
						url: '/store-coupons-api',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a store coupon',
				description: 'Update a store coupon by ID',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-coupons-api/" + $parameter.couponId}}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a store coupon',
				description: 'Delete a store coupon by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/store-coupons-api/" + $parameter.couponId}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...storeCouponsGetManyDescription,
	...storeCouponsGetOneDescription,
	...storeCouponsGetByCodeDescription,
	...storeCouponsCreateDescription,
	...storeCouponsUpdateDescription,
	...storeCouponsRemoveDescription,
];
