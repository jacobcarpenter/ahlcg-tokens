export function d(strings, ...values) {
	if (strings.length === 1) {
		return strings[0];
	}

	return [
		strings[0],
		...strings.slice(1).reduce((acc, str, i) => {
			let value = values[i];

			if (Array.isArray(value)) {
				value = value.join(",");
			}

			return [...acc, value, str];
		}, []),
	]
		.join("")
		.replace(/\n\s*/g, " ")
		.trim();
}
