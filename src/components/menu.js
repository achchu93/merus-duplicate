import React from 'react'
import PropTypes from "prop-types"
import tw, { theme, styled, css } from "twin.macro"
import { Link } from "gatsby"
import Header from "./header"

const menuItems = [
	{ name: "Home", target: "/" },
	{ name: "Team", target: "/team" },
	{ name: "Portfolio", target: "/portfolio" },
	{ name: "Perspectives", target: "/perspectives" },
	{ name: "MCX", target: "/mcx" },
]

const Menu = ({ isMenuOpen, handleMenu }) => {
	const offset = isMenuOpen ? 0 : 540

	return (
		<section
			css={[
				css`
					transition: color 0.25s
							${theme`transitionTimingFunction.header-in`} 0s,
						background 0.25s
							${theme`transitionTimingFunction.header-in`} 0s,
						transform 0.6s
							${theme`transitionTimingFunction.header-in`} 0s;
					transform: translate3d(
						${offset > 0 ? -offset : offset}px,
						0px,
						0px
					);
					width: 540px;
				`,
				tw`fixed inset-0 z-50 flex items-center overflow-hidden pointer-events-none h-screen bg-home text-primaryGrey`,
			]}
		>
			<div
				css={[
					css`
						transition: transform 0.6s
							${theme`transitionTimingFunction.header-in`} 0s;
						transform: translate3d(${offset}px, 0px, 0px);
						clip: rect(auto, auto, auto, auto);
					`,
					tw`w-full h-full fixed inset-0 z-40`,
				]}
			>
				<Header
					isMenuOpen={isMenuOpen}
					bgColor={theme`backgroundColor.home`}
					color={theme`colors.primaryGrey`}
					handleMenu={handleMenu}
				/>
			</div>
			<ul
				css={[
					tw`w-full h-full relative flex flex-col justify-center pl-6 lg:pl-12`,
				]}
			>
				{menuItems.map(li => (
					<li key={li.name} css={[tw`w-full relative block`]}>
						<Link
							css={[
								tw`pointer-events-auto inline-block py-3`,
								css`
									color: inherit;
								`,
								css`
									&:hover{
										h2 {
											transform: translate3d( 0.5rem, 0, 0 )
										}
									}
								`
							]}
							to={li.target}
							activeStyle={{ color: theme`colors.portfolio` }}
						>
							<h2
								css={[
									tw`transition-transform duration-300 ease-header-in font-theme font-light`,
									css`
										font-size: 75px;
										line-height: 72px;
										letter-spacing: -0.02em;
									`,
								]}
							>
								{li.name}
							</h2>
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}

Menu.propTypes = {
	isMenuOpen: PropTypes.bool,
	handleMenu: PropTypes.func,
}

Menu.defaultProps = {
	isMenuOpen: false,
	handleMenu: () => {},
}

export default Menu