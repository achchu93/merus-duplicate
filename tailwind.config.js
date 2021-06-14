
const defaultTheme = require("tailwindcss/defaultTheme")

const siteColors = {
	home: "#172138",
	team: "#57459c",
	portfolio: "#d95c4a",
	perspectives: "#1f0559",
	mcx: "#403680",
	primaryGrey: "#f2f5f2",
	secondary: "#707385",
	transparent: "transparent",
}

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		colors: {
			...siteColors,
		},
		fontFamily: {
			theme: ['"ABC Monument Grotesk"', ...defaultTheme.fontFamily.sans],
		},
		backgroundColor: {
			...siteColors,
			footer : "#d9d9d9",
		},
		borderColor: theme => ({
			...siteColors,
		}),
		extend: {
			animation: {
				appearSpinSlight:
					"appearSpinSlight 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
				appearDown:
					"appearDown 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
				appearUp:
					"appearUp 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards",
				appear:
					"1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.25s 1 normal forwards running appear",
				appearLeftSlight:
					"1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s 1 normal forwards running appearLeftSlight",
				appearRightSlight:
					"1s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s 1 normal forwards running appearRightSlight",
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
				appearDown: {
					"0%": {
						opacity: "0",
						transform: "translate3d(0, -1rem, 0)",
					},
					"100%": {
						opacity: "1",
						transform: "translate3d(0, 0, 0)",
					},
				},
				appearUp: {
					"0%": {
						opacity: "0",
						transform: "translate3d(0px, 2vw, 0px)",
					},
					"100%": {
						opacity: "1",
						transform: "translate3d(0px, 0px, 0px)",
					},
				},
				appear: {
					"0%": {
						opacity: "0",
						transform: "translate3d(0px, 1rem, 0px)",
					},
					"100%": {
						opacity: "1",
						transform: "translate3d(0px, 0px, 0px)",
					},
				},
				appearLeftSlight: {
					"0%": {
						opacity: "0",
						transform: "translate3d(0.5rem, 0px, 0px)",
					},
					"100%": {
						opacity: "1",
						transform: "translate3d(0px, 0px, 0px)",
					},
				},
				appearRightSlight: {
					"0%": {
						opacity: "0",
						transform: "translate3d(-0.5rem, 0px, 0px)",
					},
					"100%": {
						opacity: "1",
						transform: "translate3d(0px, 0px, 0px)",
					},
				},
			},
			transitionTimingFunction: {
				"header-in": "cubic-bezier(0.215, 0.61, 0.355, 1)",
			},
			fontSize: {
				"p-1": "22px",
			},
			lineHeight: {
				"p-1": "24px",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
