import React, { useContext } from "react"
import { css } from "twin.macro"
import PropTypes from "prop-types"
import { DocumentContext } from "~context/DocumentContext"

const ScreenHeight = ({ children, styles }) => {
	const { windowHeight } = useContext(DocumentContext)

	//

	return (
		<section
			css={[
				...styles,
				css`
					height: 100vh;
					height: ${windowHeight}px;
				`,
			]}
		>
			{children}
		</section>
	)
}

ScreenHeight.defaultProps = {
	styles: [],
}

ScreenHeight.propTypes = {
	children: PropTypes.node.isRequired,
	styles: PropTypes.arrayOf(PropTypes.shape({})),
}

export default ScreenHeight
