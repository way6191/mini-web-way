import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const doc = await import(`/src/docs/${params.docpath}.md`);
	const content = doc.default;

	return {
		content
	};
};
