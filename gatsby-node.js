/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const fs = require(`fs`)
const parser = require(`js-yaml`)

exports.createPages = ({ actions }) => {
	const { createPage } = actions
	const PerspectiveData = parser.load(fs.readFileSync('./src/content/perspectives.json', 'utf8'))
	const articles = PerspectiveData.allSanityArticle.edges
	articles.forEach( article  => {
		createPage({
			path: `/perspectives/${article.node.slug.current}`,
			component: require.resolve(`./src/templates/article-page.js`),
			context: {
				sanityArticle: {
					...article.node,
				},
				allSanityDeepDive: {
					...PerspectiveData.allSanityDeepDive,
				},
			},
		})
	})
}