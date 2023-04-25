export const getAllDocsPath = async () => {
	const allDocsCompo = import.meta.glob('/src/docs/**/*.md');
	const iterableDocs = Object.entries(allDocsCompo);

	const allDocsPath = await Promise.all(
		iterableDocs.map(async ([path]) => {
			return {
				path
			};
		})
	);

	return allDocsPath;
};
