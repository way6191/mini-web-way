import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url, fetch }) => {
	const response = await fetch(`/api/docs/alldocspath`);
	const allDocsPath = await response.json();

	if (url.pathname === '/docs') {
		const defaulturl = allDocsPath[0].path.slice(4, -3);
		throw redirect(303, defaulturl);
	}

	let navs = {};

	allDocsPath.reduce((pre, cur) => {
		const pathList = cur.path.split('/');
		let nav1 = pathList[3];
		let nav2 = pathList[4].slice(0, -3);

		if (pre.hasOwnProperty(nav1)) {
			pre[nav1].push(nav2);
			return pre;
		} else {
			pre[nav1] = [];
			pre[nav1].push(nav2);
			return pre;
		}
	}, navs);

	return {
		navs
	};
};
