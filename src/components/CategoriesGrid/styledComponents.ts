import createComponent from "@/../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const CategoriesGridContainer = createComponent.div(
	styles.categoriesGridContainer
);
export const CategoryContainer = createComponent.main(styles.categoryContainer);
export const EntriesContainer = createComponent.div(styles.entriesContainer);
export const EntryButton = createComponent.button(styles.entryButton);
