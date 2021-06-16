import React, { useState } from "react"
import { PropTypes } from "prop-types"
import tw, { css, theme } from "twin.macro"
import * as T from "~components/styles/Typography"
// import * as Icon from "~components/svg/Icons.jsx";

const Button = ({ disabled, fontSize, onClick, styles, text }) => {
	const [hovered, setHovered] = useState(false)

	// let arrowColor = theme`colors.black`;

	// if (disabled) {
	//   arrowColor = theme`colors.light-grey`;
	// } else if (hovered) {
	//   arrowColor = theme`colors.white`;
	// }

	//

	return (
		<button
			type="button"
			css={[
				...styles,
				css`
					height: 4rem;
					border-radius: 2rem;
					background-color: ${disabled
						? `transparent`
						: theme`colors.white`};
					color: ${disabled
						? theme`colors.light-grey`
						: theme`colors.black`};
					pointer-events: ${disabled ? `none` : `auto`};

					&:hover {
						background-color: ${theme`colors.black`};
						color: ${theme`colors.white`};
					}
				`,
				tw`relative block border`,
			]}
			onClick={onClick}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div tw="w-full h-full relative flex items-center justify-center">
				{(fontSize?.toLowerCase() === `l` && (
					<T.Body font="1">{text}</T.Body>
				)) || <T.Button>{text}</T.Button>}
				{/* <Icon.Arrow color={arrowColor} styles={[tw`w-3 ml-4`]} /> */}
			</div>
		</button>
	)
}

Button.defaultProps = {
	disabled: false,
	onClick: () => {},
	styles: [],
	text: `Submit`,
}

Button.propTypes = {
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	styles: PropTypes.arrayOf(PropTypes.shape({})),
	text: PropTypes.string,
}

export default Button
