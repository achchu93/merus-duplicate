const path = require("path")

module.exports = {
	siteMetadata: {
		title: `Merus Capital`,
		description: `A duplicate of Merus Capital`,
		author: `achchu.zats@gmail.com`,
		fbAppId: "",
		image: "/images/share.jpg",
		keywords:
			"venture capital, venture capitalist, venture capital firm, capital, startup capital, venture firm, venture investing, funding, fundraising, venture partner, early-stage company, early-stage venture, early-stage funding, early-stage venture capitalist, early-stage venture capital firm, seed funding, seed investor, software investor, software investing, startup, startup funding, Silicon Valley, Menlo Park, Sand Hill Road, German venture capital, European venture capital, Silicon Valley venture capital, Series A, Series B, IPO, SPAC, scalability, Google, Microsoft, M&A, acquisition, AI, artificial intelligence, platform, platform-as-a-service, martech, SaaS, software, software investor, software investing, software-as-a-service, cloud computing, cloud services, platform, industry 4.0, digitization, enterprise, enterprise software, healthtech, Insurtech, mobile, mobile applications, mobile app, disruptive technology",
		siteUrl: "https://www.meruscap.com",
		titleTemplate: "%s - Merus Capital",
		twitterUsername: "@MerusCapital",
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
			},
		},
		`gatsby-plugin-gatsby-cloud`,
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
		`gatsby-plugin-postcss`,
		`gatsby-plugin-emotion`,
		{
			resolve: `gatsby-plugin-alias-imports`,
			options: {
				alias: {
					"~components": path.resolve(__dirname, "src/components"),
					"~context": path.resolve(__dirname, "src/context"),
					"~utils": path.resolve(__dirname, "src/utils"),
				},
				extensions: ["js"],
			},
		},
		`gatsby-plugin-use-query-params`,
		`gatsby-plugin-no-sourcemaps`,
	],
}
