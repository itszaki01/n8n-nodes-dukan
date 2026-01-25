import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamUserGet = {
	operation: ['create'],
	resource: ['teamUser'],
};

export const teamUserCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForTeamUserGet,
		},
		description: 'The name of the teamUser',
		routing: {
			send: {
				type: 'body',
				property: 'name',
			},
		},
	},
];
