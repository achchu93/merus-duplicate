import React, { useContext } from "react"
import tw, { css, theme } from "twin.macro"
import { Global } from "@emotion/react"
import PropTypes from "prop-types"
import { AppContext } from "~context/AppContext"
import { DocumentContext } from "~context/DocumentContext"
import * as A from "~components/styles/Animations"

const Layout = ({ children, styles }) => {
	const { menuActive } = useContext(AppContext)
	const { getMenuWidth } = useContext(DocumentContext)

	return (
		<>
			<Global
				styles={css`
					body {
						background: ${theme`colors.grey`};
					}

					a:focus,
					button:focus,
					input:focus,
					textarea:focus {
						outline: none;
					}

					input {
						border-radius: 0;
					}

					#___gatsby {
						overflow-x: hidden !important;
						position: relative !important;
						width: 100vw !important;
					}
				`}
			/>

			<main
				id="layout"
				css={[
					...styles,
					css`
						transition: ${menuActive ? `0.725` : `0.6`}s
							${A.EASING_CUBIC} transform;
						transform: translate3d(
							${menuActive ? `${getMenuWidth()}` : ``},
							0,
							0
						);
						box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
					`,
					tw`z-10`,
				]}
			>
				{children}
			</main>
		</>
	)
}

Layout.defaultProps = {
	styles: [],
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	styles: PropTypes.arrayOf(PropTypes.shape({})),
}

export default Layout
