type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

interface JsonArray extends Array<JsonValue> {}

interface JsonObject {
	[key: string]: JsonValue;
}

interface cssModule {
	readonly [key: string]: string;
}

export const resolveVariants = (styles: cssModule, variants: JsonObject) => {
	return Object.entries(variants)
		.map(([key, value]) => styles[`${key}-${value}`])
		.join(" ");
};

export const boolStyle = (variant: string, styles: cssModule, value: boolean) =>
	styles[`${variant}${value ? "True" : "False"}`];
