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
				displayName: 'Allow Custom Confirmation Service Calcs',
				name: 'allowCustomConfirmationServiceCalcs',
				type: 'boolean',
				default: false,
				description: 'Whether to allow custom confirmation service calculations',
				routing: {
					send: {
						type: 'body',
						property: 'allowCustomConfirmationServiceCalcs',
					},
				},
			},
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
				displayName: 'Confirmation Service Calcs Type',
				name: 'confirmationServiceCalcsType',
				type: 'options',
				options: [
					{
						name: 'Order Confirmed',
						value: 'OrderConfirmed',
					},
					{
						name: 'Order Shipped',
						value: 'OrderShipped',
					},
					{
						name: 'Monthly Salary',
						value: 'MonthlySalary',
					},
				],
				default: 'OrderConfirmed',
				description: 'Type of confirmation service calculation',
				routing: {
					send: {
						type: 'body',
						property: 'confirmationServiceCalcsType',
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
					},
				},
			},
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the user is active',
				routing: {
					send: {
						type: 'body',
						property: 'isActive',
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
			{
				displayName: 'Shipped Order Confirmation Member Fee',
				name: 'shippedOrderConfirmationMemberFee',
				type: 'number',
				default: 0,
				description: 'Fee for shipped order confirmation member',
				routing: {
					send: {
						type: 'body',
						property: 'shippedOrderConfirmationMemberFee',
					},
				},
			},
		],
	},
];
