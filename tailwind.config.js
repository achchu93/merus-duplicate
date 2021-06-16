
const defaultTheme = require("tailwindcss/defaultTheme")

const siteColors = {
	"blue-black": "#172138",
	"light-purple": "#57459c",
	"strong-amber": "#d95c4a",
	"dark-purple": "#1f0559",
	"medium-purple": "#403680",
	"off-white": "#f2f5f2",
	grey: "#707385",
	transparent: "transparent",
	"light-grey": "#d9d9d9",
	white: "#ffffff",
	black: "#000000"
}

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		screens: {
			sm: {
				min: "769px",
			},
			md: {
				min: "1025px",
			},
			lg: {
				min: "1441px",
			},
			xl: {
				min: "1921px",
			},
		},
		colors: {
			...siteColors,
		},
		fontFamily: {
			body: ['"ABC Monument Grotesk"', ...defaultTheme.fontFamily.sans],
			head: ['"ABC Monument Grotesk"', ...defaultTheme.fontFamily.sans],
			theme: ['"ABC Monument Grotesk"', ...defaultTheme.fontFamily.sans],
		},
		backgroundColor: {
			...siteColors,
		},
		borderColor: theme => ({
			...siteColors,
		}),
		extend: {
			fontSize: {
				"h1-md": [
					"120px",
					{ lineHeight: "116px", letterSpacing: "-0.02em" },
				],
				"h1-sm": ["72px", { lineHeight: "68px", letterSpacing: "0" }],
				h1: ["64px", { lineHeight: "60px", letterSpacing: "-0.01em" }],
				"h2-md": [
					"75px",
					{ lineHeight: "72px", letterSpacing: "-0.02em" },
				],
				"h2-sm": [
					"52px",
					{ lineHeight: "56px", letterSpacing: "-0.02em" },
				],
				h2: ["42px", { lineHeight: "44px", letterSpacing: "-0.02em" }],
				"h3-md": [
					"56px",
					{ lineHeight: "56px", letterSpacing: "-0.01em" },
				],
				"h3-sm": ["32px", { lineHeight: "36px", letterSpacing: "0" }],
				h3: ["32px", { lineHeight: "36px", letterSpacing: "0" }],
				"b1-md": [
					"34px",
					{ lineHeight: "34px", letterSpacing: "-0.01em" },
				],
				"b1-sm": ["20px", { lineHeight: "26px", letterSpacing: "0" }],
				b1: ["20px", { lineHeight: "24px", letterSpacing: "-0.02em" }],
				"b2-md": [
					"22px",
					{ lineHeight: "24px", letterSpacing: "0.01em" },
				],
				"b2-sm": ["16px", { lineHeight: "22px", letterSpacing: "0" }],
				b2: ["16px", { lineHeight: "22px", letterSpacing: "0" }],
				"b3-md": [
					"14px",
					{ lineHeight: "18px", letterSpacing: "0.01em" },
				],
				"b3-sm": ["16px", { lineHeight: "22px", letterSpacing: "0" }],
				b3: ["16px", { lineHeight: "22px", letterSpacing: "0" }],
				"caption-md": [
					"11px",
					{ lineHeight: "13px", letterSpacing: "0" },
				],
				"caption-sm": [
					"12px",
					{ lineHeight: "14px", letterSpacing: "0" },
				],
				caption: ["12px", { lineHeight: "14px", letterSpacing: "0" }],
				"button-md": [
					"11px",
					{ lineHeight: "13px", letterSpacing: "0.01em" },
				],
				"button-sm": [
					"16px",
					{ lineHeight: "18px", letterSpacing: "0" },
				],
				button: ["14px", { lineHeight: "14px", letterSpacing: "0" }],
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
