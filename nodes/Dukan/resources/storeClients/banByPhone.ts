import type { INodeProperties } from 'n8n-workflow';

const showOnlyForStoreClientsBanByPhone = {
	operation: ['banByPhone'],
	resource: ['storeClients'],
};

export const storeClientsBanByPhoneDescription: INodeProperties[] = [
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		displayOptions: { show: showOnlyForStoreClientsBanByPhone },
		default: '',
		required: true,
		description: 'Phone number of the client to ban from ordering',
	},
];
