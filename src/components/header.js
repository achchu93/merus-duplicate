import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import tw, { theme, css } from "twin.macro"
import { Link, useStaticQuery, graphql } from "gatsby"

import { AppContext } from "../context/app-context"

const Header = ({ isClipped }) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`)

	const siteTitle = data.site.siteMetadata?.title || `Title`
	const { isMenuOpen, getMenuWidth, handleMenuState, pathname } = useContext(AppContext)

	const [headingHover, setheadingHover] = useState(false)
	const [title, subTitle] = siteTitle.split(" ")
	const pageName = pathname ? pathname.replace("/", "") : ""

	const bgColor = !isClipped ? theme`backgroundColor.primaryGrey` : theme`backgroundColor.transparent`
	const color = !isClipped ? theme`colors.home` : "#fff"

	const SubHeading = ({ isHover }) => {

		let pageNameColor = tw`text-home`

		switch (pageName) {
			case "team":
				pageNameColor = tw`text-team`
				break
			case "portfolio":
				pageNameColor = tw`text-portfolio`
				break
			case "perspectives":
				pageNameColor = tw`text-perspectives`
				break
			case "mcx":
				pageNameColor = tw`text-mcx`
				break
		}

		return (
			<div
				css={[
					css`
						backface-visibility: hidden;
						transform: translate3d(0px, -1rem, 0px);
						animation: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s 1
							normal forwards running appearDown;
					`,
					tw`opacity-0 pointer-events-none`,
					!isHover && pageNameColor,
				]}
			>
				<h2
					css={[
						tw`font-theme text-p-1 font-light leading-p-1 capitalize`,
						css`
							letter-spacing: 0.01em;
						`,
					]}
				>
					{isHover ? subTitle : pageName}
				</h2>
			</div>
		)
	}

	return (
		<header
			css={[
				css`
					background-color: ${bgColor};
					color: ${color};
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
							onClick={handleMenuState}
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
											${theme`transitionTimingFunction.header-in`};
										transform: rotate(${isMenuOpen ? 135: 0}deg);
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
					{pathname !== "/" && (
						<div
							css={[
								tw`absolute w-screen h-8 top-0 pointer-events-none -left-10 lg:h-10`,
							]}
						>
							<div
								css={[
									tw`grid grid-cols-12 gap-x-1 relative px-2 h-full items-center lg:gap-x-4 lg:px-10`,
								]}
							>
								<div
									css={[
										tw`col-start-4 col-span-7 relative flex items-center justify-between`,
									]}
								>
									<Link
										to="/"
										css={[
											tw`flex items-start relative pointer-events-auto transition-transform duration-700 ease-header-in transform-gpu translate-x-0 translate-y-0`,
											isMenuOpen &&
												css`
													transform: translate3d(
														${getMenuWidth()},
														0px,
														0px
													);
												`,
										]}
										onMouseEnter={() =>
											setheadingHover(true)
										}
										onMouseLeave={() =>
											setheadingHover(false)
										}
									>
										<div
											css={[
												css`
													backface-visibility: hidden;
													transform: translate3d(
														0.5rem,
														0px,
														0px
													);
												`,
												tw`opacity-0 animate-appearLeftSlight`,
											]}
										>
											<h2
												css={[
													tw`font-theme text-p-1 leading-p-1`,
												]}
											>
												{title}
											</h2>
										</div>
										<div
											css={[
												css`
													backface-visibility: hidden;
													transform: translate3d(
														-0.5rem,
														0px,
														0px
													);
												`,
												tw`opacity-0 animate-appearRightSlight w-64 relative`,
											]}
										>
											<SubHeading isHover={headingHover} />
										</div>
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>
			</nav>
		</header>
	)
}

Header.propTypes = {
	isClipped: PropTypes.bool
}

Header.defaultProps = {
	isClipped: false
}

export default Header
