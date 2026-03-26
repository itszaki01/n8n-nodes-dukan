import type { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';

const showOnlyForTeamUserUpdate = {
	operation: ['update'],
	resource: ['teamUser'],
};

export const teamUserUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Team User ID',
		name: 'teamUserId',
		type: 'string',
		displayOptions: { show: showOnlyForTeamUserUpdate },
		default: '',
		required: true,
		description: "The teamUser's ID to update",
	},
	{
		displayName: 'Use JSON',
		name: 'useJson',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: showOnlyForTeamUserUpdate,
		},
		description: 'Whether to use JSON payload instead of individual fields',
	},
	{
		displayName: 'JSON',
		name: 'json',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				...showOnlyForTeamUserUpdate,
				useJson: [true],
			},
		},
		description: 'JSON object containing fields to update',
		routing: {
			send: {
				type: 'body',
				property: '=',
				value: '={{JSON.parse($parameter.json)}}',
				preSend: [
					async function (
						this: IExecuteSingleFunctions,
						requestOptions: IHttpRequestOptions,
					): Promise<IHttpRequestOptions> {
						const jsonString = this.getNodeParameter('json', '{}') as string;
						try {
							const parsedBody = JSON.parse(jsonString);
							const cleanedBody = Object.fromEntries(
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								Object.entries(parsedBody).filter(([_, v]) => v !== ''),
							);
							requestOptions.body = cleanedBody;
						} catch {
							throw new Error('Invalid JSON provided in the JSON field');
						}
						return requestOptions;
					},
				],
			},
		},
	},
	{
		displayName: 'Allow Receiving New Orders',
		name: 'allowRecivingNewOrders',
		type: 'options',
		options: [
			{
				name: 'Not Set',
				value: '__unset',
			},
			{
				name: 'True',
				value: 'true',
			},
			{
				name: 'False',
				value: 'false',
			},
		],
		default: '__unset',
		displayOptions: {
			show: {
				...showOnlyForTeamUserUpdate,
				useJson: [false],
			},
		},
		description: 'Whether to allow receiving new orders',
		routing: {
			send: {
				type: 'body',
				property: 'allowRecivingNewOrders',
				value: '={{$parameter.allowRecivingNewOrders === "true" ? true : ($parameter.allowRecivingNewOrders === "false" ? false : undefined)}}',
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForTeamUserUpdate,
				useJson: [false],
			},
		},
		description: 'User email address',
		routing: {
			send: {
				type: 'body',
				property: 'email',
				value: '={{$parameter.email !== "" ? $parameter.email : undefined}}',
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'userFirstName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForTeamUserUpdate,
				useJson: [false],
			},
		},
		description: 'User first name',
		routing: {
			send: {
				type: 'body',
				property: 'userFirstName',
				value: '={{$parameter.userFirstName !== "" ? $parameter.userFirstName : undefined}}',
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'userLastName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForTeamUserUpdate,
				useJson: [false],
			},
		},
		description: 'User last name',
		routing: {
			send: {
				type: 'body',
				property: 'userLastName',
				value: '={{$parameter.userLastName !== "" ? $parameter.userLastName : undefined}}',
			},
		},
	},
	{
		displayName: 'Phone Number',
		name: 'userPhoneNumber',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForTeamUserUpdate,
				useJson: [false],
			},
		},
		description: 'User phone number',
		routing: {
			send: {
				type: 'body',
				property: 'userPhoneNumber',
				value: '={{$parameter.userPhoneNumber !== "" ? $parameter.userPhoneNumber : undefined}}',
			},
		},
	},
	{
		displayName: 'Profile Image',
		name: 'profileImage',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				...showOnlyForTeamUserUpdate,
				useJson: [false],
			},
		},
		description: 'Profile image URL',
		routing: {
			send: {
				type: 'body',
				property: 'profileImage',
				value: '={{$parameter.profileImage !== "" ? $parameter.profileImage : undefined}}',
			},
		},
	},
	{
		displayName: 'Role',
		name: 'role',
		type: 'options',
		options: [
			{
				name: 'Not Set',
				value: '__unset',
			},
			{
				name: 'Store Accountant',
				value: 'StoreAccountent',
			},
			{
				name: 'Store Admin',
				value: 'StoreAdmin',
			},
			{
				name: 'Store Call Member',
				value: 'StoreCallMember',
			},
			{
				name: 'Store Manager',
				value: 'StoreManager',
			},
		],
		default: '__unset',
		displayOptions: {
			show: {
				...showOnlyForTeamUserUpdate,
				useJson: [false],
			},
		},
		description: 'User role',
		routing: {
			send: {
				type: 'body',
				property: 'role',
				value: '={{$parameter.role !== "__unset" ? $parameter.role : undefined}}',
			},
		},
	},
];
