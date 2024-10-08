import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(0, 0%, 94%)',
				'foreground-input': 'hsl(0, 1%, 44%)',
				foreground: 'hsl(0, 0%, 8%)',
				'input-border': 'hsl(0,0%, 86%)',
				'accent-purple': 'hsl(259, 100%, 65%)',
				'accent-error': 'hsl(0, 100%, 67%)',
			},
			fontFamily: {
				sans: 'var(--font-poppins)'
			}
		},
	},
	plugins: [],
};
export default config;
