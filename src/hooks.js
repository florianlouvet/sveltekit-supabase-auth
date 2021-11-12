import cookie from 'cookie';
import supabase from '$lib/supabase';

export function getSession(request) {
	if (!request.locals.user) return {};
	return {
		user: request.locals.user,
	};
}

export const handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	const jwt = cookies['sb:token'];
	if (jwt) {
		supabase.auth.setAuth(jwt);
		const { user } = await supabase.auth.api.getUserByCookie({ cookies });
		request.locals.user = user;
	}

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);
	return response;
};
