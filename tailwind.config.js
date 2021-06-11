
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			primaryGrey: "#f2f5f2",
			home: "#172138",
		},
		fontFamily: {
			theme: ['"ABC Monument Grotesk"', ...defaultTheme.fontFamily.sans],
		},
		extend: {
			animation: {
				appearSpinSlight: "appearSpinSlight 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
			},
			keyframes: {
				appearSpinSlight: {
					"0%": {
						opacity: "0",
						transform: "rotate(-180deg)",
					},
					"100%": {
						opacity: "1",
						transform: "rotate(0)",
					},
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
