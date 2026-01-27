import type { INodeProperties } from 'n8n-workflow';
import { productGetDescription } from './get';
import { productDeleteDescription } from './delete';
import { productGetManyDescription } from './getMany';
import { productGetProductsListDescription } from './getProductsList';
import { productUpdateDescription } from './update';
import { productCreateDescription } from './create';
import { getOneBySkuDescription } from './getOneBySku';


const showOnlyForProducts = {
	resource: ['product'],
};

export const productDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForProducts,
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items 
		options: [
			{
				name: 'Get Many Products',
				value: 'getMany',
				action: 'Get many products',
				description: 'Get many products with pagination',
				routing: {
					request: {
						method: 'GET',
						url: '/store-product-api',
						qs: {
							page: '={{$parameter.page}}',
							limit: '={{$parameter.limit}}',
							//Parse the filter as a json string
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
				name: 'Get One Product',
				value: 'getOne',
				action: 'Get a product',
				description: 'Get the data of a single product',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-product-api/" + $parameter.productId}}',

					},
				},
			},
			{
				name: 'Get Product By Sku',
				value: 'getOneBySku',
				action: 'Get a product by sku',
				description: 'Get the data of a single product by sku',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-product-api/sku/" + $parameter.productSku}}',
					},
				},
			},
			{
				name: 'Get Products List',
				value: 'getProductsList',
				action: 'Get products list',
				description: 'Get products list for a specific store',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/store-product-api/productsList/" + $parameter.storeId}}',
					},
				},
			},
			{
				name: 'Create Product',
				value: 'create',
				action: 'Create a new product',
				description: 'Create a new product',
				routing: {
					request: {
						method: 'POST',
						url: '/store-product-api',
					},
				},
			},
			{
				name: 'Update Product',
				value: 'update',
				action: 'Update a product',
				description: 'Update an existing product',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/store-product-api/" + $parameter.productId}}',
					},
				},
			},
			{
				name: 'Delete Product',
				value: 'delete',
				action: 'Delete a product',
				description: 'Delete a product',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{"/store-product-api/" + $parameter.productId}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...productGetManyDescription,
	...productGetDescription,
	...getOneBySkuDescription,
	...productGetProductsListDescription,
	...productCreateDescription,
	...productUpdateDescription,
	...productDeleteDescription,
];
