/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import tw, { theme, css } from "twin.macro"

import Header from "./header"
import Footer from "./footer"
import Menu from "./menu"
import useMenuWidth from "./../utils/useMenuWidth"

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

	const menuWidth = useMenuWidth();

	return (
		<>
			<Header
				siteTitle={data.site.siteMetadata?.title || `Title`}
				isMenuOpen={isMenuOpen}
				handleMenu={handleMenuClick}
			/>
			<Menu isMenuOpen={isMenuOpen} handleMenu={handleMenuClick} />
			<div css={[tw`overflow-x-hidden`]}>
				<main
					css={[
						tw`min-h-screen bg-primaryGrey ease-header-in z-10`,
						css`
							transition: transform 0.725s
								${theme`transitionTimingFunction.header-in`} 0s;
							transform: translate3d(${isMenuOpen ? menuWidth : "0px"}, 0px, 0px);
							box-shadow: rgb(0 0 0 / 10%) 0px 4px 18px;
						`,
					]}
				>
					{children}
					<Footer />
				</main>
			</div>
		</>
	)
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
