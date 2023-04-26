import { getAllDocsPath } from '$lib/utils';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const allDocsPath = await getAllDocsPath();

	return json(allDocsPath);
};
