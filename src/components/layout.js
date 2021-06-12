/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Menu from "./menu"

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
				title
				}
			}
		}
	`)

	const [isMenuOpen, setMenuState] = useState(false)

	const handleMenuClick = () => setMenuState(!isMenuOpen)

	return (
		<>
			<Header
				siteTitle={data.site.siteMetadata?.title || `Title`}
				isMenuOpen={isMenuOpen}
				handleMenu={handleMenuClick}
			/>
			<Menu isMenuOpen={isMenuOpen} handleMenu={handleMenuClick} />
			<div
				style={{
					margin: `0 auto`,
					maxWidth: 960,
					padding: `0 1.0875rem 1.45rem`,
				}}
			>
				<main>{children}</main>
				<footer
					style={{
						marginTop: `2rem`,
					}}
				>
					© {new Date().getFullYear()}, Built with
					{` `}
					<a href="https://www.gatsbyjs.com">Gatsby</a>
				</footer>
			</div>
		</>
	)
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
