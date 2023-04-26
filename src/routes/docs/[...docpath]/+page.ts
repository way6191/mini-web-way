import { getDocContent } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const content = getDocContent(params.docpath);
	return {
		content
	};
};
