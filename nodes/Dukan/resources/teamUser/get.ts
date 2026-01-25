import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamUserGet = {
	operation: ['getOneTeamUser'],
	resource: ['teamUser'],
};

export const teamUserGetDescription: INodeProperties[] = [
	{
		displayName: 'Team User ID',
		name: 'teamUserId',
		type: 'string',
		displayOptions: { show: showOnlyForTeamUserGet },
		default: '',
		description: "The Team User's ID to retrieve",
	},
];
