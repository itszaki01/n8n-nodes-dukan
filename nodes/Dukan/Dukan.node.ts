import {
	NodeConnectionTypes,
	NodeOperationError,
	type IDataObject,
	type IExecuteFunctions,
	type IHttpRequestOptions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
import { cityDescription } from './resources/city';
import { deliveryCompaniesApiDescription } from './resources/deliveryCompaniesApi';
import { orderDescription } from './resources/order';
import { productDescription } from './resources/product';
import { stateDescription } from './resources/state';
import { stopDeskDescription } from './resources/stopDesk';
import { storeDescription } from './resources/store';
import { storeShippingAccountsDescription } from './resources/storeShippingAccounts';
import { storeClientsDescription } from './resources/storeClients';
import { storeCouponsDescription } from './resources/storeCoupons';
import { storeStockDescription } from './resources/storeStock';
import { teamUserDescription } from './resources/teamUser';

export class Dukan implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dukan',
		name: 'dukan',
		icon: { light: 'file:dukan-logo.svg', dark: 'file:dukan-logo.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Dukan API',
		defaults: {
			name: 'Dukan',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'dukanApi', required: false }],
		requestDefaults: {
			baseURL:
				'={{ ($parameter["forceCustomBaseUrl"] && $parameter["customBaseUrl"]) ? $parameter["customBaseUrl"] : $credentials.baseUrl }}/v1/external',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// If forceCustomAuth is enabled, set header here.
				// The credential's authenticate() will detect this header and not overwrite it.
				'X-AFFLITA-JWT':
					'={{ $parameter["forceCustomAuth"] ? $parameter["customApiKey"] : undefined }}',
			},
		},
		properties: [
			{
				displayName: 'Force Custom Auth Header',
				name: 'forceCustomAuth',
				type: 'boolean',
				default: false,
				description:
					'Whether to use a custom API key from this node instead of the configured Dukan credentials',
			},
			{
				displayName: 'Force Custom Base URL',
				name: 'forceCustomBaseUrl',
				type: 'boolean',
				default: false,
				description:
					'Whether to use a custom Base URL from this node instead of the Base URL in the credentials',
			},
			{
				displayName: 'Custom Base URL',
				name: 'customBaseUrl',
				type: 'string',
				placeholder: 'https://store.company.com',
				default: '',
				displayOptions: {
					show: {
						forceCustomBaseUrl: [true],
					},
				},
				description:
					'Base URL to use for API requests instead of the Base URL from the credentials (without the /v1/external suffix)',
			},
			{
				displayName: 'Custom API Key',
				name: 'customApiKey',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				displayOptions: {
					show: {
						forceCustomAuth: [true],
					},
				},
				description: 'API key to send when Force Custom Auth Header is enabled',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
				options: [
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Store Shipping Account',
						value: 'storeShippingAccounts',
					},
					{
						name: 'Delivery Companies API',
						value: 'deliveryCompaniesApi',
					},
					{
						name: 'Team User',
						value: 'teamUser',
					},
					{
						name: 'Store',
						value: 'store',
					},
					{
						name: 'State',
						value: 'state',
					},
					{
						name: 'Stop Desk',
						value: 'stopDesk',
					},
					{
						name: 'City Or Municipality',
						value: 'city',
					},
					{
						name: 'Store Client',
						value: 'storeClients',
					},
					{
						name: 'Store Coupon',
						value: 'storeCoupons',
					},
					{
						name: 'Store Pro Stock',
						value: 'storeStock',
					},
				],
				default: 'order',
			},
			...cityDescription,
			...deliveryCompaniesApiDescription,
			...orderDescription,
			...productDescription,
			...stateDescription,
			...stopDeskDescription,
			...storeDescription,
			...storeShippingAccountsDescription,
			...storeClientsDescription,
			...storeCouponsDescription,
			...storeStockDescription,
			...teamUserDescription,
			{
				displayName: 'Auto Pagination',
				name: 'pagination',
				type: 'options',
				displayOptions: { show: { operation: ['getMany'] } },
				options: [
					{ name: 'Off', value: 'off' },
					{ name: 'Limited Pages', value: 'limit' },
					{ name: 'All Pages', value: 'all' },
				],
				default: 'off',
				description: 'When to fetch multiple pages (Get Many only)',
			},
			{
				displayName: 'Max Pages',
				name: 'maxPages',
				type: 'number',
				displayOptions: { show: { operation: ['getMany'], pagination: ['limit'] } },
				typeOptions: { minValue: 1, maxValue: 100 },
				default: 5,
				description: 'Maximum number of pages to fetch when Pagination is "Limited pages"',
			},
			{
				displayName: 'Interval (Ms)',
				name: 'interval',
				type: 'number',
				displayOptions: { show: { operation: ['getMany'], pagination: ['limit','all'] } }, //show when auto pagination is on
				typeOptions: { minValue: 0 },
				default: 1000,
				description: 'Delay in ms between page requests (avoid rate limits)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const operation = this.getNodeParameter('operation', 0) as string;
		const output: INodeExecutionData[] = [];

		// Non-getMany: single request, return as-is
		if (operation !== 'getMany') {
			for (let i = 0; i < items.length; i++) {
				const opts = getSingleRequestOptions(this, i);
				const response = await dukanHttpRequest(this, i, opts);
				output.push({ json: response as IDataObject });
			}
			return [output];
		}

		// getMany: pagination with interval (one output item per input item, merged docs)
		for (let i = 0; i < items.length; i++) {
			const pagination = this.getNodeParameter('pagination', i, 'off') as 'off' | 'limit' | 'all';
			const maxPages = this.getNodeParameter('maxPages', i, 5) as number;
			const intervalMs = this.getNodeParameter('interval', i, 1000) as number;
			const merged = await runGetManyPagination(this, i, pagination, maxPages, intervalMs);
			output.push({ json: { data: merged } });
		}
		return [output];
	}
}

// --- Helpers ---

const MAX_LOOPS = 100;

/** Same as requestDefaults.baseURL: credentials or custom root + /v1/external */
async function resolveExternalApiBase(
	context: IExecuteFunctions,
	itemIndex: number,
): Promise<string> {
	const forceCustom = context.getNodeParameter('forceCustomBaseUrl', itemIndex) as boolean;
	const custom = forceCustom
		? String(context.getNodeParameter('customBaseUrl', itemIndex, '') ?? '').trim()
		: '';
	if (forceCustom && custom) {
		return `${custom.replace(/\/$/, '')}/v1/external`;
	}
	let root: string;
	try {
		const cred = (await context.getCredentials('dukanApi')) as { baseUrl?: string };
		root = String(cred.baseUrl ?? '').trim();
	} catch {
		root = '';
	}
	if (!root) {
		throw new NodeOperationError(
			context.getNode(),
			'Invalid or missing Base URL. Set Dukan API credentials (Base URL) or enable Force Custom Base URL with a full URL (e.g. https://store.example.com).',
		);
	}
	return `${root.replace(/\/$/, '')}/v1/external`;
}

/** Relative API path (e.g. /store-order-cart-api) → absolute URL under /v1/external */
function toAbsoluteExternalUrl(base: string, relativePath: string): string {
	const path = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
	return `${base.replace(/\/$/, '')}/${path}`;
}

/**
 * httpRequest only accepts absolute URLs; declarative routing used baseURL + path.
 * Applies the same base + default headers + credential or custom JWT.
 */
async function dukanHttpRequest(
	context: IExecuteFunctions,
	itemIndex: number,
	options: IHttpRequestOptions,
): Promise<unknown> {
	const base = await resolveExternalApiBase(context, itemIndex);
	const fullUrl = toAbsoluteExternalUrl(base, options.url);

	const forceCustomAuth = context.getNodeParameter('forceCustomAuth', itemIndex) as boolean;
	const customApiKey = forceCustomAuth
		? String(context.getNodeParameter('customApiKey', itemIndex, '') ?? '')
		: '';
	const existingCt = options.headers?.['Content-Type'] ?? options.headers?.['content-type'];

	const headers: IDataObject = {
		Accept: 'application/json',
		...(existingCt ? {} : { 'Content-Type': 'application/json' }),
		...(options.headers ?? {}),
	};
	if (forceCustomAuth && customApiKey) {
		headers['X-AFFLITA-JWT'] = customApiKey;
	}

	const merged: IHttpRequestOptions = {
		...options,
		url: fullUrl,
		headers,
	};

	const useCredentialAuth = !(forceCustomAuth && customApiKey);
	if (useCredentialAuth) {
		return context.helpers.httpRequestWithAuthentication.call(context, 'dukanApi', merged);
	}
	return context.helpers.httpRequest(merged);
}

function sleep(ms: number): Promise<void> {
	// eslint-disable-next-line @n8n/community-nodes/no-restricted-globals -- intentional delay between pagination requests
	return new Promise((resolve) => setTimeout(resolve, ms));
}

interface PaginatedData {
	docs: unknown[];
	totalDocs: number;
	limit: number;
	totalPages: number;
	page: number;
	offset: number;
	pagingCounter: number;
	hasPrevPage: boolean;
	hasNextPage: boolean;
	prevPage: number | null;
	nextPage: number | null;
}

function isPaginatedResponse(res: unknown): res is { data: PaginatedData } {
	return (
		typeof res === 'object' &&
		res !== null &&
		'data' in res &&
		typeof (res as { data: unknown }).data === 'object' &&
		(res as { data: unknown }).data !== null
	);
}

function getGetManyPath(resource: string, getParam: (name: string) => unknown): string {
	const paths: Record<string, string> = {
		order: '/store-order-cart-api',
		product: '/store-product-api',
		city: '/store-location-sub-api',
		state: '/store-location-api',
		stopDesk: '/store-location-stopdesk-api',
		store: '/store/all',
		storeClients: '/store-clients-api',
		storeCoupons: '/store-coupons-api',
		teamUser: '/user-store-api',
	};
	if (resource === 'storeStock') {
		const id = getParam('targeted_store_id');
		return `/store-stock-api/find-all/${id ?? ''}`;
	}
	return paths[resource] ?? `/${resource}`;
}

function buildGetManyQs(getParam: (name: string) => unknown, page: number): IDataObject {
	const limit = getParam('limit');
	const filter = getParam('filter');
	const select = getParam('select');
	const sort = getParam('sort');
	const populate = getParam('populate');
	const offset = getParam('offset');
	const qs: IDataObject = {
		page,
		...(limit !== undefined && limit !== null && limit !== '' && { limit }),
		...(filter !== undefined && filter !== null && filter !== '' && { filter }),
		...(select !== undefined && select !== null && select !== '' && { select }),
		...(sort !== undefined && sort !== null && sort !== '' && { sort }),
		...(populate !== undefined && populate !== null && populate !== '' && { populate }),
		...(offset !== undefined && offset !== null && offset !== 0 && { offset }),
	};
	return qs;
}

async function runGetManyPagination(
	context: IExecuteFunctions,
	itemIndex: number,
	pagination: 'off' | 'limit' | 'all',
	maxPages: number,
	intervalMs: number,
): Promise<PaginatedData> {
	const resource = context.getNodeParameter('resource', itemIndex) as string;
	const getParam = (name: string) => context.getNodeParameter(name, itemIndex, undefined) as unknown;
	const path = getGetManyPath(resource, getParam);

	const allDocs: unknown[] = [];
	let lastResponse: PaginatedData | null = null;
	let page = 1;
	let loopCount = 0;

	while (loopCount < MAX_LOOPS) {
		loopCount += 1;
		const qs = buildGetManyQs(getParam, page);
		const response = await dukanHttpRequest(context, itemIndex, {
			method: 'GET',
			url: path,
			qs,
		});

		if (!isPaginatedResponse(response)) {
			break;
		}

		const data = response.data;
		lastResponse = data;

		if (!data.docs || !Array.isArray(data.docs)) {
			break;
		}

		allDocs.push(...data.docs);

		// "off" → run once
		if (pagination === 'off') break;

		// "limit" → stop at maxPages
		if (pagination === 'limit' && loopCount >= maxPages) break;

		// "all" / "limit" → stop when no next page
		if (!data.hasNextPage) break;

		const nextPage = data.nextPage ?? page + 1;
		page = nextPage;

		// Wait before next request (do not wait after last iteration)
		if (intervalMs > 0 && data.hasNextPage) {
			await sleep(intervalMs);
		}
	}

	if (!lastResponse) {
		return {
			docs: [],
			totalDocs: 0,
			limit: 0,
			totalPages: 0,
			page: 1,
			offset: 0,
			pagingCounter: 0,
			hasPrevPage: false,
			hasNextPage: false,
			prevPage: null,
			nextPage: null,
		};
	}

	return {
		docs: allDocs,
		totalDocs: lastResponse.totalDocs,
		limit: lastResponse.limit,
		totalPages: lastResponse.totalPages,
		page: lastResponse.page,
		offset: lastResponse.offset,
		pagingCounter: lastResponse.pagingCounter,
		hasPrevPage: lastResponse.hasPrevPage,
		hasNextPage: lastResponse.hasNextPage,
		prevPage: lastResponse.prevPage,
		nextPage: lastResponse.nextPage,
	};
}

function getSingleRequestOptions(context: IExecuteFunctions, itemIndex: number): IHttpRequestOptions {
	const resource = context.getNodeParameter('resource', itemIndex) as string;
	const operation = context.getNodeParameter('operation', itemIndex) as string;
	const getParam = (name: string) =>
		context.getNodeParameter(name, itemIndex, undefined) as string | number | object | undefined;

	// Build request options for (resource, operation) to keep non-getMany behavior
	const key = `${resource}_${operation}`;
	const builders: Record<string, () => IHttpRequestOptions> = {
		order_getOne: () => ({ method: 'GET', url: `/store-order-cart-api/${getParam('cartUid')}` }),
		order_create: () => ({ method: 'POST', url: '/store-order-cart-api', body: getParam('body') }),
		order_update: () => ({
			method: 'PATCH',
			url: `/store-order-cart-api/updateOrderDetails/${getParam('cartId')}`,
			body: getParam('body'),
		}),
		order_updateStatus: () => ({
			method: 'PUT',
			url: `/store-order-cart-api/updatedStatus/${getParam('cartId')}`,
			body: getParam('body'),
		}),
		order_updateClientInfo: () => ({
			method: 'PATCH',
			url: `/store-order-cart-api/updateClientInfo/${getParam('cartId')}`,
			body: getParam('body'),
		}),
		product_getOne: () => ({ method: 'GET', url: `/store-product-api/${getParam('productId')}` }),
		product_getOneBySku: () => ({ method: 'GET', url: `/store-product-api/sku/${getParam('productSku')}` }),
		product_getProductsList: () => ({
			method: 'GET',
			url: `/store-product-api/productsList/${getParam('storeId')}`,
		}),
		product_create: () => ({ method: 'POST', url: '/store-product-api', body: getParam('body') }),
		product_update: () => ({
			method: 'PATCH',
			url: `/store-product-api/${getParam('productId')}`,
			body: getParam('body'),
		}),
		product_delete: () => ({ method: 'DELETE', url: `/store-product-api/${getParam('productId')}` }),
		product_importSingleFromUrl: () => ({
			method: 'POST',
			url: '/store-product-api/import-single-from-url',
			body: getParam('body'),
		}),
		city_getOne: () => ({ method: 'GET', url: `/store-location-sub-api/${getParam('cityId')}` }),
		city_getManyByLocation: () => ({
			method: 'GET',
			url: `/store-location-sub-api/location-sub-locations/${getParam('locationId')}`,
		}),
		city_create: () => ({ method: 'POST', url: '/store-location-sub-api', body: getParam('body') }),
		city_update: () => ({
			method: 'PATCH',
			url: `/store-location-sub-api/${getParam('cityId')}`,
			body: getParam('body'),
		}),
		city_delete: () => ({ method: 'DELETE', url: `/store-location-sub-api/${getParam('cityId')}` }),
		state_getOne: () => ({ method: 'GET', url: `/store-location-api/${getParam('stateId')}` }),
		state_create: () => ({ method: 'POST', url: '/store-location-api', body: getParam('body') }),
		state_update: () => ({
			method: 'PATCH',
			url: `/store-location-api/${getParam('stateId')}`,
			body: getParam('body'),
		}),
		state_delete: () => ({ method: 'DELETE', url: `/store-location-api/${getParam('stateId')}` }),
		stopDesk_getOne: () => ({ method: 'GET', url: `/store-location-stopdesk-api/${getParam('stopDeskId')}` }),
		stopDesk_getManyByLocation: () => ({
			method: 'GET',
			url: `/store-location-stopdesk-api/location-stop-desks/${getParam('locationId')}`,
		}),
		stopDesk_create: () => ({
			method: 'POST',
			url: '/store-location-stopdesk-api',
			body: getParam('body'),
		}),
		stopDesk_update: () => ({
			method: 'PATCH',
			url: `/store-location-stopdesk-api/${getParam('stopDeskId')}`,
			body: getParam('body'),
		}),
		stopDesk_delete: () => ({
			method: 'DELETE',
			url: `/store-location-stopdesk-api/${getParam('stopDeskId')}`,
		}),
		store_getOne: () => ({ method: 'GET', url: '/store' }),
		store_update: () => ({ method: 'PATCH', url: '/store', body: getParam('body') }),
		storeClients_create: () => ({ method: 'POST', url: '/store-clients-api', body: getParam('body') }),
		storeClients_update: () => ({
			method: 'PATCH',
			url: `/store-clients-api/${getParam('clientId')}`,
			body: getParam('body'),
		}),
		storeClients_banByPhone: () => ({
			method: 'POST',
			url: `/store-clients-api/ban-by-phone/${getParam('phoneNumber')}`,
		}),
		storeCoupons_getByCode: () => ({
			method: 'GET',
			url: `/store-coupons-api/code/${getParam('code')}`,
		}),
		storeCoupons_getOne: () => ({
			method: 'GET',
			url: `/store-coupons-api/${getParam('couponId')}`,
		}),
		storeCoupons_create: () => ({ method: 'POST', url: '/store-coupons-api', body: getParam('body') }),
		storeCoupons_update: () => ({
			method: 'PATCH',
			url: `/store-coupons-api/${getParam('couponId')}`,
			body: getParam('body'),
		}),
		storeCoupons_remove: () => ({
			method: 'DELETE',
			url: `/store-coupons-api/${getParam('couponId')}`,
		}),
		storeStock_getOne: () => ({
			method: 'GET',
			url: `/store-stock-api/${getParam('stock_variable_id')}`,
		}),
		storeStock_create: () => ({ method: 'POST', url: '/store-stock-api', body: getParam('body') }),
		storeStock_update: () => ({
			method: 'PATCH',
			url: `/store-stock-api/${getParam('stock_variable_id')}`,
			body: getParam('body'),
		}),
		storeStock_updateQuantity: () => ({
			method: 'PATCH',
			url: `/store-stock-api/update-quantity/${getParam('stock_variable_id')}`,
			body: getParam('body'),
		}),
		storeStock_remove: () => ({
			method: 'DELETE',
			url: `/store-stock-api/${getParam('stock_variable_id')}`,
		}),
		teamUser_getOneTeamUser: () => ({
			method: 'GET',
			url: `/user-store-api/${getParam('teamUserId')}`,
		}),
		teamUser_create: () => ({ method: 'POST', url: '/user-store-api', body: getParam('body') }),
		teamUser_update: () => ({
			method: 'PATCH',
			url: `/user-store-api/${getParam('teamUserId')}`,
			body: getParam('body'),
		}),
		storeShippingAccounts_get: () => ({ method: 'GET', url: '/store-shipping-comapanies' }),
		storeShippingAccounts_getOne: () => ({
			method: 'GET',
			url: `/store-shipping-comapanies/${getParam('shippingAccountId')}`,
		}),
		storeShippingAccounts_create: () => ({
			method: 'POST',
			url: '/store-shipping-comapanies',
			body: getParam('body'),
		}),
		storeShippingAccounts_update: () => ({
			method: 'PATCH',
			url: `/store-shipping-comapanies/${getParam('shippingAccountId')}`,
			body: getParam('body'),
		}),
		storeShippingAccounts_delete: () => ({
			method: 'DELETE',
			url: `/store-shipping-comapanies/${getParam('shippingAccountId')}`,
		}),
		deliveryCompaniesApi_shipOrderFromStore: () => ({
			method: 'POST',
			url: `/delivery-comapanies-api/ship-order-from-store/${getParam('orderUID')}/${getParam('storeShippingCompanyId')}`,
			headers: { 'Content-Type': 'text/plain' },
		}),
		deliveryCompaniesApi_shipAllStoreOrders: () => ({
			method: 'POST',
			url: `/delivery-comapanies-api/ship-all-store-confirmed-orders/${getParam('storeShippingCompanyId')}`,
			headers: { 'Content-Type': 'text/plain' },
		}),
		deliveryCompaniesApi_trackOrderFromStore: () => ({
			method: 'GET',
			url: `/delivery-comapanies-api/track-order-from-store/${getParam('orderUID')}`,
		}),
		deliveryCompaniesApi_printOrderTicket: () => ({
			method: 'POST',
			url: `/delivery-comapanies-api/print-order-ticket/${getParam('orderUID')}`,
			headers: { 'Content-Type': 'text/plain' },
		}),
		deliveryCompaniesApi_deleteColi: () => ({
			method: 'DELETE',
			url: `/delivery-comapanies-api/delete-coli/${getParam('orderUID')}`,
			headers: { 'Content-Type': 'text/plain' },
		}),
	};

	const builder = builders[key];
	if (!builder) {
		throw new NodeOperationError(
			context.getNode(),
			`Unsupported operation: ${resource} / ${operation}. Pagination is only for getMany.`,
		);
	}
	return builder();
}
