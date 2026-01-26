import type { INodeProperties } from 'n8n-workflow';

const showOnlyForTeamUserGetOne = {
	operation: ['getOneTeamUser'],
	resource: ['teamUser'],
};

export const teamUserGetOneDescription: INodeProperties[] = [
	{
		displayName: 'Team User ID',
		name: 'teamUserId',
		type: 'string',
		displayOptions: { show: showOnlyForTeamUserGetOne },
		default: '',
		description: "The Team User's ID to retrieve",
	},
];
