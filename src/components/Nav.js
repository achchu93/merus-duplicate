/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from "react"
import tw, { css, theme } from "twin.macro"
import { AppContext } from "~context/AppContext"
import { DocumentContext } from "~context/DocumentContext"
import * as A from "~components/styles/Animations"
import * as T from "~components/styles/Typography"
import Go from "~components/Go"
import Header from "~components/Header"
import ScreenHeight from "~components/ScreenHeight"
import { useKeyPress } from "~utils/hooks"

const Nav = () => {
	const {
		menuActive,
		setMenuActive,
		menuTransitioning,
		setMenuTransitioning,
		pathname,
	} = useContext(AppContext)
	const { getMenuWidth, isDesktop } = useContext(DocumentContext)

	const [colourStyle, setColourStyle] = useState({})

	//

	const links = [
		{
			name: `Home`,
			target: `/`,
		},
		{
			name: `Team`,
			target: `/team`,
		},
		{
			name: `Portfolio`,
			target: `/portfolio`,
		},
		{
			name: `Perspectives`,
			target: `/perspectives`,
		},
		{
			name: `MCX`,
			target: `/mcx`,
		},
	]

	//

	useEffect(() => {
		if (menuTransitioning) {
			setMenuActive(false)
			setTimeout(() => {
				setMenuTransitioning(false)
			}, 250)
		}
	}, [menuTransitioning])

	useEffect(() => {
		let newColourStyles = {
			background: theme`colors.blue-black`,
			color: theme`colors.off-white`,
			colorActive: theme`colors.strong-amber`,
			crossColor: theme`colors.white`,
		}

		if (!pathname) {
			setColourStyle(newColourStyles)
			return
		}

		const pathnameSplit = pathname.split(`/`)

		if (!pathnameSplit?.[1]) {
			setColourStyle(newColourStyles)
			return
		}

		const pathId = pathnameSplit[1].toLowerCase()

		switch (pathId) {
			case `mcx`:
				newColourStyles = {
					background: theme`colors.medium-purple`,
					color: theme`colors.off-white`,
					colorActive: theme`colors.strong-amber`,
				}
				break

			case `perspectives`:
				newColourStyles = {
					background: theme`colors.dark-purple`,
					color: theme`colors.off-white`,
					colorActive: theme`colors.strong-amber`,
				}
				break

			case `portfolio`:
				newColourStyles = {
					background: theme`colors.strong-amber`,
					color: theme`colors.off-white`,
					colorActive: theme`colors.blue-black`,
				}
				break

			case `team`:
				newColourStyles = {
					background: theme`colors.light-purple`,
					color: theme`colors.off-white`,
					colorActive: theme`colors.strong-amber`,
				}
				break

			default:
				newColourStyles = {
					background: theme`colors.off-white`,
					color: theme`colors.blue-black`,
					colorActive: theme`colors.strong-amber`,
					crossColor: theme`colors.white`,
				}

				break
		}

		setColourStyle(newColourStyles)
	}, [pathname])

	//

	const escKeyPressed = useKeyPress(`Escape`)

	useEffect(() => {
		if (escKeyPressed && menuActive) {
			setMenuActive(false)
		}
	}, [escKeyPressed])

	//

	let withDelay = false

	if (menuTransitioning) {
		withDelay = !menuActive
	}

	//

	return (
		<>
			<ScreenHeight
				styles={[
					css`
						transition: color 0.25s ${A.EASING_CUBIC},
							background 0.25s ${A.EASING_CUBIC},
							transform 0.6s ${A.EASING_CUBIC}
								${!withDelay ? `` : `0.2s`};
						transform: translate3d(
							${menuActive ? `0` : `-${getMenuWidth()}`},
							0,
							0
						);

						width: ${getMenuWidth()};
						background: ${colourStyle.background};
						color: ${colourStyle.color};
					`,
					tw`fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center overflow-hidden pointer-events-none`,
				]}
			>
				<div
					css={[
						css`
							transition: transform 0.6s ${A.EASING_CUBIC}
								${!withDelay ? `` : `0.2s`};
							transform: translate3d(
								${menuActive ? `0` : `${getMenuWidth()}`},
								0,
								0
							);

							z-index: 999;
							clip: rect(auto, auto, auto, auto);
						`,
						tw`w-full h-full fixed top-0 right-0 bottom-0 left-0 z-40`,
					]}
				>
					<Header clipcross={colourStyle?.crossColor} />
				</div>

				<ul
					css={[
						css`
							//
						`,
						tw`w-full h-full relative flex flex-col justify-center pl-6 md:pl-12`,
					]}
				>
					{links.map(link => {
						let pathId = pathname

						if (!pathId || pathId === `` || pathId === `/`) {
							pathId = `/`
						} else if (pathId.endsWith(`/`)) {
							pathId = pathId.slice(0, -1)
						}

						//

						return (
							<li
								key={link.target}
								css={[tw`w-full relative block`]}
							>
								<Go
									to={link.target}
									onClick={e => {
										if (pathId === link.target) {
											e.preventDefault()
											setMenuActive(false)
										} else {
											setMenuTransitioning(true)
										}
									}}
									inject={{
										css: `
                      color: ${
							pathId === link.target
								? colourStyle.colorActive
								: `inherit`
						};

                      pointer-events: ${menuTransitioning ? `none` : `auto`};

                      &:hover {
                        h2 {
                          transform: translate3d(
                            ${menuTransitioning ? 0 : `0.5rem`},
                            0,
                            0
                          );
                        }
                      }

                      h2 {
                        transition: transform ${menuActive ? `0.3s` : `0.3s`}
                          ${A.EASING_CUBIC};
                      }
                    `,
										tw: tw`inline-block pt-3 pb-3`,
									}}
								>
									{(link?.name !== `MCX` && (
										<T.Heading font="2" level="2">
											{link.name}
										</T.Heading>
									)) || (
										<T.Heading
											font="2"
											level="2"
											styles={[tw`flex`]}
										>
											<span>MC</span>
											<span
												css={[
													css`
														margin-top: ${isDesktop()
															? `-9px`
															: `-5px`};
													`,
													tw`block`,
												]}
											>
												ˣ
											</span>
										</T.Heading>
									)}
								</Go>
							</li>
						)
					})}
				</ul>
			</ScreenHeight>
		</>
	)
}

export default Nav
