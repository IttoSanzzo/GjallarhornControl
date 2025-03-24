import createComponent from "@/../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const NavigationBarContainer = createComponent.div(
	styles.navigationBarContainer
);
export const ButtonLink = createComponent.button(styles.buttonLink);
