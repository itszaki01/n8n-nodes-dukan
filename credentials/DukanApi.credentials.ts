import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DukanApi implements ICredentialType {
	name = 'dukanApi';
	displayName = 'Dukan API';
	icon: Icon = { light: 'file:dukan-logo.svg', dark: 'file:dukan-logo.dark.svg' };
	// Link to your community node's README
	documentationUrl = 'https://github.com/org/-dukan?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Base Url',
			name: 'baseUrl',
			type: 'string',
			placeholder: 'https://store.company.com',
			required: true,
			default: '',
		},
		{
			displayName: 'Api Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-AFFLITA-JWT': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/v1/user-store/getMe',
			method: 'GET',
			headers: {
				'X-AFFLITA-JWT': '={{$credentials.apiKey}}',
			},
		},
	};
}
