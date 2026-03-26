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
		description: 'Whether to use JSON to define the payload',
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
		description:
			'JSON object. Optional fields: allowRecivingNewOrders (boolean), email (string), userFirstName (string), userLastName (string), userPhoneNumber (string), profileImage (string), role (StoreAdmin|StoreManager|StoreCallMember|StoreAccountent).',
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
								Object.entries(parsedBody).filter(([, value]) => value !== ''),
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				...showOnlyForTeamUserUpdate,
				useJson: [false],
			},
		},
		options: [
			{
				displayName: 'Allow Receiving New Orders',
				name: 'allowRecivingNewOrders',
				type: 'boolean',
				default: true,
				description: 'Whether to allow receiving new orders',
				routing: {
					send: {
						type: 'body',
						property: 'allowRecivingNewOrders',
						value: '={{$parameter.additionalFields.allowRecivingNewOrders}}',
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'User email address',
				routing: {
					send: {
						type: 'body',
						property: 'email',
						value: '={{$parameter.additionalFields.email !== "" ? $parameter.additionalFields.email : undefined}}',
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'userFirstName',
				type: 'string',
				default: '',
				description: 'User first name',
				routing: {
					send: {
						type: 'body',
						property: 'userFirstName',
						value: '={{$parameter.additionalFields.userFirstName !== "" ? $parameter.additionalFields.userFirstName : undefined}}',
					},
				},
			},
			{
				displayName: 'Last Name',
				name: 'userLastName',
				type: 'string',
				default: '',
				description: 'User last name',
				routing: {
					send: {
						type: 'body',
						property: 'userLastName',
						value: '={{$parameter.additionalFields.userLastName !== "" ? $parameter.additionalFields.userLastName : undefined}}',
					},
				},
			},
			{
				displayName: 'Phone Number',
				name: 'userPhoneNumber',
				type: 'string',
				default: '',
				description: 'User phone number',
				routing: {
					send: {
						type: 'body',
						property: 'userPhoneNumber',
						value: '={{$parameter.additionalFields.userPhoneNumber !== "" ? $parameter.additionalFields.userPhoneNumber : undefined}}',
					},
				},
			},
			{
				displayName: 'Profile Image',
				name: 'profileImage',
				type: 'string',
				default: '',
				description: 'Profile image URL',
				routing: {
					send: {
						type: 'body',
						property: 'profileImage',
						value: '={{$parameter.additionalFields.profileImage !== "" ? $parameter.additionalFields.profileImage : undefined}}',
					},
				},
			},
			{
				displayName: 'Role',
				name: 'role',
				type: 'options',
				options: [
					{
						name: 'Store Admin',
						value: 'StoreAdmin',
					},
					{
						name: 'Store Manager',
						value: 'StoreManager',
					},
					{
						name: 'Store Call Member',
						value: 'StoreCallMember',
					},
					{
						name: 'Store Accountant',
						value: 'StoreAccountent',
					},
				],
				default: 'StoreAdmin',
				description: 'User role',
				routing: {
					send: {
						type: 'body',
						property: 'role',
						value: '={{$parameter.additionalFields.role}}',
					},
				},
			},
		],
	},
];
