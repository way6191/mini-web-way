import { getDocContent } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (a) => {
	console.log(a);
	const content = await getDocContent();

	return json(content);
};
