import { expressifyResp, deExpressifyResp } from '$lib/express-utils';
import supabase from '$lib/supabase';

export const post = async (request) => {
	let response = { status: 200, body: {}, headers: {} };
	supabase.auth.api.setAuthCookie(request, expressifyResp(response));
	response = deExpressifyResp(response);
	if (request.body.session) response.body = { user: request.body.session.user };
	return response;
};
