import createComponent from "@/../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const ControlBarContainer = createComponent.div(
	styles.controlBarContainer
);
export const ActionButton = createComponent.button(styles.actionButton);
