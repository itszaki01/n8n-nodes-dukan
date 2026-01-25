import type { INodeProperties } from 'n8n-workflow';
import { teamUserCreateDescription } from './create';
import { teamUserGetDescription } from './get';
import { teamUserUpdateDescription } from './update';

const showOnlyForTeamUsers = {
	resource: ['teamUser'],
};

export const teamUserDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTeamUsers,
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get team users',
				description: 'Get many teamUsers',
				routing: {
					request: {
						method: 'GET',
						url: '/user-store',
					},
				},
			},
			{
				name: 'Get One Team User',
				value: 'getOneTeamUser',
				action: 'Get a team user',
				description: 'Get the data of a single teamUser',
				routing: {
					request: {
						method: 'GET',
						url: '={{"/user-store/" + $parameter.teamUserId}}',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new team user',
				description: 'Create a new teamUser',
				routing: {
					request: {
						method: 'POST',
						url: '/user-store',
					},
				},
			},
			//Update Team User
			{
				name: 'Update',
				value: 'update',
				action: 'Update a team user',
				description: 'Update a team user',
				routing: {
					request: {
						method: 'PUT',
						url: '={{"/user-store/" + $parameter.teamUserId}}',
					},
				},
			},
		],
		default: 'getAll',
	},
	...teamUserGetDescription,
	...teamUserCreateDescription,
	...teamUserUpdateDescription,
];
