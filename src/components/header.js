/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from "react"
import tw, { css, theme } from "twin.macro"
import Grid from "~components/styles/Grid"
import Go from "~components/Go"
import { AppContext } from "~context/AppContext"
import { DocumentContext } from "~context/DocumentContext"
import * as A from "~components/styles/Animations"
import * as T from "~components/styles/Typography"

const Header = ({ clipcross }) => {
	const {
		menuActive,
		setMenuActive,
		menuTransitioning,
		pathname,
	} = useContext(AppContext)

	const { getMenuWidth, isDesktop } = useContext(DocumentContext)

	const [headerId, setHeaderId] = useState(``)
	const [backgroundColor, setBackgroundColor] = useState(
		theme`colors.off-white`
	)
	const [color, setColor] = useState(theme`colors.blue-black`)
	const [hovering, setHovering] = useState(false)

	//

	let withDelay = false

	if (menuTransitioning) {
		withDelay = !menuActive
	}

	useEffect(() => {
		if (!pathname) {
			setHeaderId(``)
			return
		}

		const pathnameSplit = pathname.split(`/`)

		if (!pathnameSplit?.[1]) {
			setHeaderId(``)
			return
		}

		setHeaderId(pathnameSplit[1].toLowerCase())
	}, [pathname])

	useEffect(() => {
		if (clipcross) {
			setBackgroundColor(`transparent`)
			setColor(clipcross)
		}
	}, [clipcross])

	//

	return (
		<header
			css={[
				css`
					background-color: ${backgroundColor};
					color: ${color};
				`,
				tw`w-full h-12 md:h-20 fixed top-0 right-0 left-0 z-40`,
			]}
		>
			<Grid node="nav" styles={[tw`h-full items-center`]}>
				<div tw="col-span-12 relative flex items-center">
					<div tw="relative flex items-start">
						<button
							type="button"
							css={[
								css`
									${A.Keyframes(
										`appearSpinSlight`,
										`1s ${A.EASING_CUBIC} forwards`,
										`1s`
									)}

									&:focus {
										outline: 0;
									}
								`,
								tw`w-8 md:w-10 h-8 md:h-10 relative block`,
							]}
							onClick={() => setMenuActive(!menuActive)}
						>
							<div
								css={[
									css`
										-webkit-mask-image: -webkit-radial-gradient(
											white,
											black
										);
										transition: transform 0.5s
											${A.EASING_CUBIC}
											${!withDelay ? `` : `0.15s`};
										transform: rotate(
											${menuActive ? 135 : 0}deg
										);
									`,
									tw`w-full h-full flex items-center justify-center pointer-events-none text-center`,
								]}
							>
								{(isDesktop() && (
									<T.Heading font="3" level="6">
										+
									</T.Heading>
								)) || (
									<T.Heading font="2" level="6">
										+
									</T.Heading>
								)}
							</div>
						</button>
					</div>

					{(!isDesktop() && (
						<>
							{!clipcross && pathname !== `/` && (
								<div tw="relative flex items-center justify-center pl-4">
									<Go
										to="/"
										onClick={() => setMenuActive(false)}
										inject={{
											css: `
                        transition: transform 0.75s ${A.EASING_CUBIC}
                          ${!withDelay ? `` : `0.4s`};

                        transform: translate3d(0, 0, 0);
                      `,
											tw: tw`relative flex items-center`,
										}}
									>
										<div
											role="img"
											css={[
												css`
													${A.Keyframes(
														`appearLeftSlight`,
														`1s ${A.EASING_CUBIC} forwards`,
														`0.5s`
													)}
												`,
											]}
											onMouseEnter={() => {
												setHovering(true)
											}}
											onMouseLeave={() => {
												setHovering(false)
											}}
										>
											<T.Heading
												font="b2"
												level="2"
												weight={400}
											>
												Merus
											</T.Heading>
										</div>

										{/* bit verbose but separating them out in this way gives me CSS animations for free */}
										<div
											css={[
												css`
													${A.Keyframes(
														`appearRightSlight`,
														`1s ${A.EASING_CUBIC} forwards`,
														`0.5s`
													)}
												`,
												tw`w-64 relative`,
											]}
										>
											{(!headerId || headerId === ``) && (
												<div
													css={[
														css`
															${A.Keyframes(
																`appearDown`,
																`0.3s ${A.EASING_CUBIC} forwards`
															)}
														`,
														tw`pointer-events-none`,
													]}
												>
													<T.Heading
														font="b2"
														level="2"
													>
														Capital
													</T.Heading>
												</div>
											)}

											{headerId === `mcx` && (
												<div
													css={[
														css`
															${A.Keyframes(
																`appearDown`,
																`0.3s ${A.EASING_CUBIC} forwards`
															)}

															color: ${theme`colors.medium-purple`};
														`,
														tw`pointer-events-none`,
													]}
												>
													<T.Heading
														font="b2"
														level="2"
														styles={[tw`flex`]}
													>
														<span>MC</span>
														<span
															css={[
																css`
																	margin-top: -2px;
																`,
																tw`block`,
															]}
														>
															ˣ
														</span>
													</T.Heading>
												</div>
											)}

											{headerId === `portfolio` && (
												<div
													css={[
														css`
															${A.Keyframes(
																`appearDown`,
																`0.3s ${A.EASING_CUBIC} forwards`
															)}

															color: ${theme`colors.strong-amber`};
														`,
														tw`pointer-events-none`,
													]}
												>
													<T.Heading
														font="b2"
														level="2"
													>
														Portfolio
													</T.Heading>
												</div>
											)}

											{headerId === `perspectives` && (
												<div
													css={[
														css`
															${A.Keyframes(
																`appearDown`,
																`0.3s ${A.EASING_CUBIC} forwards`
															)}

															color: ${theme`colors.blue-black`};
														`,
														tw`pointer-events-none`,
													]}
												>
													<T.Heading
														font="b2"
														level="2"
													>
														Perspectives
													</T.Heading>
												</div>
											)}

											{headerId === `team` && (
												<div
													css={[
														css`
															${A.Keyframes(
																`appearDown`,
																`0.3s ${A.EASING_CUBIC} forwards`
															)}

															color: ${theme`colors.medium-purple`};
														`,
														tw`pointer-events-none`,
													]}
												>
													<T.Heading
														font="b2"
														level="2"
													>
														Team
													</T.Heading>
												</div>
											)}
										</div>
									</Go>
								</div>
							)}
						</>
					)) || (
						<>
							{!clipcross && headerId !== `` && (
								<div
									css={[
										css`
											left: -2.5rem;
										`,
										tw`w-screen h-8 md:h-10 absolute top-0 pointer-events-none`,
									]}
								>
									<Grid styles={[tw`h-full items-center`]}>
										<div tw="col-span-7 col-start-4 relative flex items-center justify-between">
											<Go
												to="/"
												onClick={() =>
													setMenuActive(false)
												}
												inject={{
													css: `
                        transition: transform 0.75s ${A.EASING_CUBIC}
                          ${!withDelay ? `` : `0.4s`};

                        transform: translate3d(
                          ${menuActive ? `${getMenuWidth()}` : `0`},
                          0,
                          0
                        );
                      `,
													tw: tw`relative flex items-start pointer-events-auto`,
												}}
											>
												<div
													role="img"
													css={[
														css`
															${A.Keyframes(
																`appearLeftSlight`,
																`1s ${A.EASING_CUBIC} forwards`,
																`0.5s`
															)}
														`,
													]}
													onMouseEnter={() => {
														setHovering(true)
													}}
													onMouseLeave={() => {
														setHovering(false)
													}}
												>
													<T.Heading
														font="b2"
														level="2"
														weight={400}
													>
														Merus
													</T.Heading>
												</div>

												{/* bit verbose but separating them out in this way gives me CSS animations for free */}
												<div
													role="img"
													css={[
														css`
															${A.Keyframes(
																`appearRightSlight`,
																`1s ${A.EASING_CUBIC} forwards`,
																`0.5s`
															)}
														`,
														tw`w-64 relative`,
													]}
													onMouseEnter={() => {
														setHovering(`right`)
													}}
													onMouseLeave={() => {
														setHovering(null)
													}}
												>
													{(hovering ||
														headerId === ``) && (
														<div
															css={[
																css`
																	${A.Keyframes(
																		`appearDown`,
																		`0.3s ${A.EASING_CUBIC} forwards`
																	)}
																`,
																tw`pointer-events-none`,
															]}
														>
															<T.Heading
																font="b2"
																level="2"
															>
																Capital
															</T.Heading>
														</div>
													)}

													{!hovering &&
														headerId === `mcx` && (
															<div
																css={[
																	css`
																		${A.Keyframes(
																			`appearDown`,
																			`0.3s ${A.EASING_CUBIC} forwards`
																		)}

																		color: ${theme`colors.medium-purple`};
																	`,
																	tw`pointer-events-none`,
																]}
															>
																<T.Heading
																	font="b2"
																	level="2"
																	styles={[
																		tw`flex`,
																	]}
																>
																	<span>
																		MC
																	</span>
																	<span
																		css={[
																			css`
																				margin-top: -3px;
																			`,
																			tw`block`,
																		]}
																	>
																		ˣ
																	</span>
																</T.Heading>
															</div>
														)}

													{!hovering &&
														headerId ===
															`portfolio` && (
															<div
																css={[
																	css`
																		${A.Keyframes(
																			`appearDown`,
																			`0.3s ${A.EASING_CUBIC} forwards`
																		)}

																		color: ${theme`colors.strong-amber`};
																	`,
																	tw`pointer-events-none`,
																]}
															>
																<T.Heading
																	font="b2"
																	level="2"
																>
																	Portfolio
																</T.Heading>
															</div>
														)}

													{!hovering &&
														pathname?.includes(
															`/perspective`
														) && (
															<div
																css={[
																	css`
																		${A.Keyframes(
																			`appearDown`,
																			`0.3s ${A.EASING_CUBIC} forwards`
																		)}

																		color: ${theme`colors.blue-black`};
																	`,
																	tw`pointer-events-none`,
																]}
															>
																<T.Heading
																	font="b2"
																	level="2"
																>
																	Perspectives
																</T.Heading>
															</div>
														)}

													{!hovering &&
														headerId === `team` && (
															<div
																css={[
																	css`
																		${A.Keyframes(
																			`appearDown`,
																			`0.3s ${A.EASING_CUBIC} forwards`
																		)}

																		color: ${theme`colors.medium-purple`};
																	`,
																	tw`pointer-events-none`,
																]}
															>
																<T.Heading
																	font="b2"
																	level="2"
																>
																	Team
																</T.Heading>
															</div>
														)}
												</div>
											</Go>
										</div>
									</Grid>
								</div>
							)}
						</>
					)}
				</div>
			</Grid>
		</header>
	)
}

export default Header
