import { GraphQLResolveInfo } from "graphql";

export function getSelectedFields<T>(info: GraphQLResolveInfo): (keyof T)[] {
	const fields = new Set<keyof T>();

	const traverseSelection = (selectionSet: any) => {
		selectionSet.selections.forEach((selection: any) => {
			if (selection.kind === "Field") {
				fields.add(selection.name.value);
			} else if (
				selection.kind === "InlineFragment" ||
				selection.kind === "FragmentSpread"
			) {
				traverseSelection(selection.selectionSet);
			}
		});
	};

	traverseSelection(info.fieldNodes[0].selectionSet);
	return Array.from(fields);
}
