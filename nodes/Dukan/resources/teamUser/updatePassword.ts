import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamUserUpdatePassword = {
	operation: ['updatePassword'],
	resource: ['teamUser'],
};

export const teamUserUpdatePasswordDescription: INodeProperties[] = [
	{
		displayName: 'Team User ID',
		name: 'teamUserId',
		type: 'string',
		displayOptions: { show: showOnlyForTeamUserUpdatePassword },
		default: '',
		required: true,
		description: "The team user's ID to update password",
	},
	{
		displayName: 'New Password',
		name: 'newPassword',
		type: 'string',
		typeOptions: {
			password: true,
		},
		displayOptions: { show: showOnlyForTeamUserUpdatePassword },
		default: '',
		required: true,
		description: 'The new password (minimum 8 characters)',
		routing: {
			send: {
				type: 'body',
				property: 'newPassword',
				value: '={{$parameter.newPassword !== "" ? $parameter.newPassword : undefined}}',
			},
		},
	},
];
