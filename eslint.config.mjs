// @ts-check

import eslint from "@eslint/js";
// @ts-expected-error
import tseslint from "typescript-eslint";
// @ts-expected-error
import nexteslint from "@next/eslint-plugin-next";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

export default [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...compat.config({
		extends: ["plugin:@next/next/recommended"],
	}),

	{
		rules: {
		},
	},
];
