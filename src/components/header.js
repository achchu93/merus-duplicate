import * as React from "react"
import PropTypes from "prop-types"
import tw, { theme, styled, css } from "twin.macro"

const styles = {
	header: () => [
		css`
			background-color: ${theme`colors.primaryGrey`};
			color: ${theme`colors.home`};
		`,
		tw`w-full h-12 fixed inset-x-0 top-0 z-40 lg:h-12`,
	],
	nav: () => [
		tw`grid grid-cols-12 gap-x-1 relative px-2 h-full items-center lg:gap-x-4 lg:px-10`,
	],
}

const Header = ({ siteTitle }) => (
	<header
		css={[
			css`
				background-color: ${theme`colors.primaryGrey`};
				color: ${theme`colors.home`};
			`,
			tw`w-full h-12 fixed inset-x-0 top-0 z-40 lg:h-20`,
		]}
	>
		<nav
			css={[
				tw`grid grid-cols-12 gap-x-1 relative px-2 h-full items-center lg:gap-x-4 lg:px-10`,
			]}
		>
			<div css={[tw`col-span-12 relative flex items-center`]}>
				<div css={[tw`relative flex items-start`]}>
					<button
						css={[
							css`
								backface-visibility: hidden;
								opacity: 0;
								transform: rotate(-180deg);
								animation-delay: 1s;
							`,
							tw`lg:w-10 lg:h-10 animate-appearSpinSlight relative block w-8 h-8 focus:outline-none`,
						]}
					>
						<div
							css={[
								tw`w-full h-full flex items-center justify-center pointer-events-none text-center`,
								css`
									-webkit-mask-image: -webkit-radial-gradient(
										white,
										black
									);
									transition: transform 0.5s
										cubic-bezier(0.215, 0.61, 0.355, 1);
									transform: rotate(0deg);
									align-items: center;
									-webkit-box-pack: center;
								`,
							]}
						>
							<h6
								css={[
									tw`font-theme`,
									css`
										font-size: 56px;
										font-weight: 300;
										line-height: 56px;
										letter-spacing: -0.01em;
									`,
								]}
							>
								+
							</h6>
						</div>
					</button>
				</div>
			</div>
		</nav>
	</header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
