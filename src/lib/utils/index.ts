export const getAllDocsPath = async () => {
	const allDocsCompo = await import.meta.glob('/src/docs/**/*.md');
	const iterableDocs = Object.entries(allDocsCompo);

	const allDocsPath = iterableDocs.map(([path]) => {
		return {
			path
		};
	});

	return allDocsPath;
};

export const getDocContent = async () => {
	const doc = await import('/src/docs/css3/flex.md');
	const content = doc.default;
	console.log(content);

	return content;
};
