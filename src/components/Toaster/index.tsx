"use client";

import { Toaster as HotToaster } from "react-hot-toast";
import styles from "./styles.module.css";

export function Toaster() {
	return (
		<HotToaster
			position="bottom-right"
			containerClassName={styles.toasterContainer}
			toastOptions={{
				duration: 3000,
				position: "bottom-center",
				className: styles.toasterDefault,
				loading: { className: styles.toasterLoading, duration: 1000 },
				success: { className: styles.toasterSuccess, duration: 800 },
				error: { className: styles.toasterError },
			}}
		/>
	);
}
