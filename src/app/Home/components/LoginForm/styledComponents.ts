import createComponent from "@/../libs/createComponents/createComponent";
import styles from "./styles.module.css";

export const LoginFormContainer = createComponent.form(
	styles.loginFormContainer
);
export const TextInputContainer = createComponent.div(
	styles.textInputContainer
);
export const SelectorContainer = createComponent.div(styles.selectorContainer);
export const TextInput = createComponent.input(styles.textInput);
export const SubmitButton = createComponent.button(styles.submitButton);
export const ErrorText = createComponent.p(styles.errorText);
