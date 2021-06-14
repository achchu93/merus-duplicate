/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"
import tw, { theme, css } from "twin.macro"

import { AppContext } from "../context/app-context"
import Footer from "./footer"

const Layout = ({ children, styles }) => {

	const { isMenuOpen, getMenuWidth } = useContext(AppContext)

	return (
		<div css={[tw`overflow-x-hidden`]}>
			<main
				css={[
					tw`bg-primaryGrey ease-header-in z-10`,
					css`
						transition: transform 0.725s
							${theme`transitionTimingFunction.header-in`} 0s;
						transform: translate3d(${isMenuOpen ? getMenuWidth() : "0px"}, 0px, 0px);
						box-shadow: rgb(0 0 0 / 10%) 0px 4px 18px;
					`,
					...styles
				]}
			>
				{children}
				<Footer />
			</main>
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	styles: PropTypes.array
}

Layout.defaultProps = {
	styles: []
}

export default Layout
