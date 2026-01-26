import type { INodeProperties } from 'n8n-workflow';

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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showOnlyForTeamUserUpdate,
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
						value: '={{$parameter.email !== "" ? $parameter.email : undefined}}',
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
						value: '={{$parameter.userFirstName !== "" ? $parameter.userFirstName : undefined}}',
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
						value: '={{$parameter.userLastName !== "" ? $parameter.userLastName : undefined}}',
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
						value: '={{$parameter.userPhoneNumber !== "" ? $parameter.userPhoneNumber : undefined}}',
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
					},
				},
			},
		],
	},
];
