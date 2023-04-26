import { fail } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const docpath = params.docpath;
	const allDocsCompo = import.meta.glob('/src/docs/**/*.md');
	const iterableDocs = Object.entries(allDocsCompo);

	let doc;

	for (const [path, resolver] of iterableDocs) {
		if (path.includes(docpath)) {
			doc = await resolver();
			break;
		}
	}

	if (!doc) {
		throw fail(404);
	}

	return {
		content: doc.default
	};
};
