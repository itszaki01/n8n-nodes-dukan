import type { INodeProperties } from 'n8n-workflow';
import { teamUserCreateDescription } from './create';
import { teamUserUpdateDescription } from './update';
import { teamUserGetManyDescription } from './getMany';
import { teamUserGetOneDescription } from './getOne';

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
				value: 'getMany',
				action: 'Get team users',
				description: 'Get many teamUsers',
				routing: {
					request: {
						method: 'GET',
						url: '/user-store-api',
						qs: {
							page: '={{$parameter.page}}',
							limit: '={{$parameter.limit}}',
							filter: '={{$parameter.filter}}',
							select: '={{$parameter.select}}',
							sort: '={{$parameter.sort}}',
							populate: '={{$parameter.populate}}',
							offset: '={{$parameter.offset}}',
						},
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
						url: '={{"/user-store-api/" + $parameter.teamUserId}}',
					},
				},
			},
			// {
			// 	name: 'Create',
			// 	value: 'create',
			// 	action: 'Create a new team user',
			// 	description: 'Create a new teamUser',
			// 	routing: {
			// 		request: {
			// 			method: 'POST',
			// 			url: '/user-store-api',
			// 		},
			// 	},
			// },
			//Update Team User
			{
				name: 'Update',
				value: 'update',
				action: 'Update a team user',
				description: 'Update a team user',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{"/user-store-api/" + $parameter.teamUserId}}',
					},
				},
			},
		],
		default: 'getMany',
	},
	...teamUserGetManyDescription,
	...teamUserGetOneDescription,
	...teamUserCreateDescription,
	...teamUserUpdateDescription,
];
