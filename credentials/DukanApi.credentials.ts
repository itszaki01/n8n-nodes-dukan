import type {
	IAuthenticate,
	Icon,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestHelper,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

// fetch is available in Node.js 18+ (used by n8n)
interface FetchResponse {
	ok: boolean;
	status: number;
	text(): Promise<string>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	json(): Promise<any>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const fetch: (url: string, options?: any) => Promise<FetchResponse>;

interface TokenData {
	token: string;
	hash:string,
	expiresAt: number; // timestamp in ms
}

export class DukanApi implements ICredentialType {
	name = 'dukanApi';
	displayName = 'Dukan API';

	icon: Icon = {
		light: 'file:dukan-logo.svg',
		dark: 'file:dukan-logo.dark.svg',
	};

	documentationUrl =
		'https://github.com/org/dukan?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			placeholder: 'https://store.company.com',
			required: true,
			default: '',
		},
		{
			displayName: 'Authentication Method',
			name: 'authMethod',
			type: 'options',
			options: [
				{ name: 'Email & Password', value: 'emailPassword' },
				{ name: 'API Key', value: 'apiKey' },
			],
			default: 'emailPassword',
		},
		{
			displayName: 'Email',
			name: 'email',
			type: 'string',
			placeholder: 'user@example.com',
			displayOptions: {
				show: { authMethod: ['emailPassword'] },
			},
			required: true,
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: { password: true },
			displayOptions: {
				show: { authMethod: ['emailPassword'] },
			},
			required: true,
			default: '',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			displayOptions: {
				show: { authMethod: ['apiKey'] },
			},
			required: true,
			default: '',
		},
		{
			displayName: 'JWT (auto-managed)',
			name: 'tokenData',
			type: 'hidden',
			typeOptions: {
				password: true,
				expirable: true,
			},
			default: '',
		},
	];

	/* -------------------------------------------------------------------------- */
	/*                               TOKEN HANDLING                               */
	/* -------------------------------------------------------------------------- */

	async preAuthentication(
		this: IHttpRequestHelper,
		credentials: ICredentialDataDecryptedObject,
	) {
		// API Key auth does not need token lifecycle
		if (credentials.authMethod === 'apiKey') {
			return credentials;
		}

		const baseUrl = credentials.baseUrl as string;
		const email = credentials.email as string;
		const password = credentials.password as string;
		const hash = Buffer.from(`${baseUrl}|${email}|${password}`).toString('base64');

		const now = Date.now();
		const TOKEN_LIFETIME = 20 * 24 * 60 * 60 * 1000; // 20 days
		const REFRESH_BUFFER = 60 * 60 * 1000; // refresh 1h early

		let tokenData: TokenData | null = null;

		if (credentials.tokenData) {
			try {
				tokenData = JSON.parse(credentials.tokenData as string);
			} catch {
				tokenData = null;
			}
		}
		// ✅ Reuse token if still valid
		if (
			tokenData?.hash === hash &&
			tokenData &&
			tokenData.token &&
			now < tokenData.expiresAt - REFRESH_BUFFER
		) {

			return credentials;
		}

		// 🔐 Login (ONLY when needed)
		const response = await fetch(
			`${baseUrl}/v1/external/auth-store-user-api/auth/signin`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			},
		);
	
		if (!response.ok) {
			const err = await response.text();
			throw new Error(`Authentication failed (${response.status}): ${err}`);
		}
		
		const data = (await response.json()) as { token?: string };
		
		if (!data.token) {
			throw new Error('Authentication response did not include a token');
		}
		
		credentials.tokenData = JSON.stringify({
			token: data.token,
			expiresAt: now + TOKEN_LIFETIME,
			hash: hash,
		});
	
		return credentials;
	}

	/* -------------------------------------------------------------------------- */
	/*                            REQUEST AUTH HANDLER                            */
	/* -------------------------------------------------------------------------- */

	authenticate: IAuthenticate = async (
		credentials: ICredentialDataDecryptedObject,
		requestOptions: IHttpRequestOptions,
	): Promise<IHttpRequestOptions> => {
		if (credentials.authMethod === 'apiKey') {
			requestOptions.headers = {
				...requestOptions.headers,
				'X-AFFLITA-JWT': credentials.apiKey as string,
			};
			return requestOptions;
		}

		const tokenData = JSON.parse(credentials.tokenData as string) as TokenData;

		requestOptions.headers = {
			...requestOptions.headers,
			'X-AFFLITA-JWT': tokenData.token,
		};

		return requestOptions;
	};

	/* -------------------------------------------------------------------------- */
	/*                               TEST CREDENTIALS                             */
	/* -------------------------------------------------------------------------- */

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/v1/user-store/getMe',
			method: 'GET',
		},
	};
}
