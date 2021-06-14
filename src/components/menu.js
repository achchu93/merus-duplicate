import React, { useContext, useEffect, useState } from 'react'
import tw, { theme, styled, css } from "twin.macro"
import { Link } from "gatsby"
import Header from "./header"
import { AppContext } from '../context/app-context'
import { string } from 'prop-types'

const menuItems = [
	{ name: "Home", target: "/" },
	{ name: "Team", target: "/team" },
	{ name: "Portfolio", target: "/portfolio" },
	{ name: "Perspectives", target: "/perspectives" },
	{ name: "MCX", target: "/mcx" },
]

const Menu = () => {

	const { isMenuOpen, getMenuWidth, handleMenuState, pathname } = useContext(AppContext)
	const offset = isMenuOpen ? "0px" : getMenuWidth()
	const [menuTransition, setMenuTransition] = useState(false)
	const [colourStyle, setColourStyle] = useState({})

	useEffect(() => {
		if( menuTransition ){
			setTimeout(() => {
				handleMenuState()
				setMenuTransition(false)
			}, 250)
		}
	}, [menuTransition])

	useEffect(() => {
		let styles = {
			background: theme`backgroundColor.home`,
			color: theme`colors.primaryGrey`,
			colorActive: theme`colors.portfolio`,
		}

		if (!pathname || pathname.indexOf("/") < 0) {
			setColourStyle(styles)
			return
		}

		const pathId = pathname.replace("/", "").toLowerCase()

		switch (pathId) {
			case "team":
				styles.background = theme`backgroundColor.team`
				break
			case "portfolio":
				styles.background = theme`backgroundColor.portfolio`
				styles.colorActive = theme`colors.home`
				break
			case "perspectives":
				styles.background = theme`backgroundColor.perspectives`
				break
			case "mcx":
				styles.background = theme`backgroundColor.mcx`
				break
			default:
				styles.background = theme`backgroundColor.home`
				break;
		}
		setColourStyle(styles)
	}, [pathname])

	return (
		<section
			css={[
				css`
					transition: color 0.25s
							${theme`transitionTimingFunction.header-in`} 0s,
						background 0.25s
							${theme`transitionTimingFunction.header-in`} 0s,
						transform 0.6s
							${theme`transitionTimingFunction.header-in`}
							${!menuTransition ? `0s` : `0.2s`};
					transform: translate3d(
						${offset != "0px" ? `-${offset}` : offset},
						0px,
						0px
					);
					width: ${getMenuWidth()};
					background-color: ${colourStyle.background};
				`,
				tw`fixed inset-0 z-50 flex items-center overflow-hidden pointer-events-none h-screen text-primaryGrey`,
			]}
		>
			<div
				css={[
					css`
						transition: transform 0.6s
							${theme`transitionTimingFunction.header-in`} 0s;
						transform: translate3d(${offset}, 0px, 0px);
						clip: rect(auto, auto, auto, auto);
					`,
					tw`w-full h-full fixed inset-0 z-40`,
				]}
			>
				<Header isClipped={true} />
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
									&:hover {
										h2 {
											transform: translate3d(
												0.5rem,
												0,
												0
											);
										}
									}
								`,
							]}
							to={li.target}
							activeStyle={{ color: theme`colors.portfolio` }}
							onClick={() => setMenuTransition(true)}
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

export default Menu