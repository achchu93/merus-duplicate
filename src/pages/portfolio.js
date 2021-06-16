/* eslint-disable react/prop-types */

// import React, { useContext, useEffect } from "react";
import React, { useContext, useEffect, useState } from "react"
import Img from "gatsby-image"
import tw, { css, theme } from "twin.macro"
import { DocumentContext } from "~context/DocumentContext"
import Footer from "~components/Footer"
import Layout from "~components/Layout"
import Seo from "~components/SEO"
import Grid from "~components/styles/Grid"
import * as A from "~components/styles/Animations"
import * as Icon from "~components/svg/Icons"
import * as T from "~components/styles/Typography"
import PortfolioData from "../content/portfolio.json"

const PortfolioPage = ({ data, location }) => {
	const { isDesktop } = useContext(DocumentContext)

	const [displayMode, setDisplayMode] = useState(`grid`)
	const [expanded, setExpanded] = useState([])

	//

	const cms = PortfolioData.sanityPortfolio

	const portfolioItems = []

	cms.partners.forEach(partnerItem => {
		portfolioItems.push(partnerItem)
	})

	portfolioItems.sort((a, b) => {
		const keyA = a.title
		const keyB = b.title

		if (keyA < keyB) {
			return -1
		}

		if (keyA > keyB) {
			return 1
		}

		return 0
	})

	const portfolioSections = {}

	portfolioItems.forEach(portfolioItem => {
		const alphaKey = portfolioItem.title[0]

		if (!portfolioSections?.[alphaKey]) {
			portfolioSections[alphaKey] = []
		}

		portfolioSections[alphaKey].push(portfolioItem)
	})

	//

	const toggleExpandedItem = key => {
		const newExpanded = JSON.parse(JSON.stringify(expanded))
		const existingIndex = expanded.indexOf(key)

		if (existingIndex === -1) {
			newExpanded.push(key)
		} else {
			newExpanded.splice(existingIndex, 1)
		}

		setExpanded(newExpanded)
	}

	//

	useEffect(() => {
		setExpanded([])
	}, [displayMode])

	//

	const titleJSX = (
		<Grid styles={[tw`h-full`]}>
			<div
				css={[
					css`
						${A.Keyframes(
							`appearRight`,
							`0.75s ${A.EASING_CUBIC} forwards`,
							`0.8s`
						)}
					`,
					tw`col-span-12 md:col-span-6 h-full flex items-center`,
				]}
			>
				<T.Heading
					font="3"
					level="2"
					styles={[tw`whitespace-pre-wrap text-grey`]}
				>
					{cms.intro}
				</T.Heading>
			</div>
		</Grid>
	)

	return (
		<>
			<Seo
				title={cms?.title || ``}
				description={cms?.seoDescription || ``}
				keywords={cms?.seoKeywords || ``}
				path={location.pathname}
			/>

			<Layout
				styles={[
					css`
						min-height: 100vh;
					`,
					tw`bg-off-white`,
				]}
			>
				<section css={[tw`pt-20 md:pt-96 pb-32 md:pb-48`]}>
					{titleJSX}
				</section>

				{cms?.body && (
					<Grid>
						<div
							css={[
								css`
									${A.Keyframes(
										`appearRight`,
										`0.75s ${A.EASING_CUBIC} forwards`,
										`1s`
									)}
								`,
								tw`col-span-12 md:col-span-5 md:col-start-7 mb-48 text-grey`,
							]}
						>
							<T.Body font="2">{cms.body}</T.Body>
						</div>
					</Grid>
				)}

				{isDesktop() && (
					<Grid>
						<div
							css={[
								tw`col-span-12 relative flex items-end justify-end mb-12`,
							]}
						>
							<button
								type="button"
								onClick={() =>
									setDisplayMode(
										displayMode === `list` ? `grid` : `list`
									)
								}
							>
								{(displayMode === `list` && (
									<div
										css={[
											tw`w-8 h-8 relative flex flex-wrap items-center justify-center`,
										]}
									>
										{Array(4)
											.fill(null)
											.map((_, listIndex) => {
												const key = `grid-icon-square-${listIndex}`

												return (
													<div
														key={key}
														css={[
															css`
																width: 0.7rem;
																height: 0.7rem;
																margin: 2px;
															`,
															tw`relative block bg-black`,
														]}
													/>
												)
											})}
									</div>
								)) || (
									<div
										css={[
											tw`w-8 h-8 relative flex flex-col justify-between p-1`,
										]}
									>
										{Array(3)
											.fill(null)
											.map((_, listIndex) => {
												const key = `list-icon-line-${listIndex}`

												return (
													<div
														key={key}
														css={[
															tw`w-full h-1 relative block bg-black`,
														]}
													/>
												)
											})}
									</div>
								)}
							</button>
						</div>
					</Grid>
				)}

				{isDesktop() && displayMode === `list` && (
					<section css={[tw`pb-64`]}>
						{Object.keys(portfolioSections).map(
							portfolioSectionKey => {
								const portfolioSectionItems =
									portfolioSections[portfolioSectionKey]

								return (
									<div tw="mb-32">
										<Grid>
											<T.Heading
												font="1"
												level="2"
												styles={[
													tw`col-span-12 mb-24 text-blue-black`,
												]}
											>
												{portfolioSectionKey}
											</T.Heading>
										</Grid>

										<ul>
											{portfolioSectionItems.map(
												(
													portfolioSectionItem,
													portfolioSectionItemIndex
												) => {
													const isExpanded =
														expanded?.[0] &&
														expanded.includes(
															portfolioSectionItem.title
														)

													return (
														<li
															key={
																portfolioSectionItem.title
															}
															css={[
																css`
																	transition: all
																		0.5s
																		${A.EASING_CUBIC};

																	height: ${isExpanded
																		? `auto`
																		: `8rem`};
																`,
															]}
														>
															<button
																className={`portfolio-item ${
																	isExpanded
																		? `active`
																		: ``
																}`}
																onClick={() =>
																	setExpanded(
																		isExpanded
																			? null
																			: [
																					portfolioSectionItem.title,
																			  ]
																	)
																}
																css={[
																	css`
																		color: ${theme`colors.blue-black`};

																		&:focus {
																			outline: none;
																		}

																		//
																		// transitions

																		.portfolio-item__background {
																			transition: 0.3s
																				${A.EASING_CUBIC}
																				opacity;

																			opacity: 0;
																		}

																		.portfolio-item__cross {
																			transition: 0.3s
																					${A.EASING_CUBIC}
																					opacity,
																				0.3s
																					${A.EASING_CUBIC}
																					transform;
																		}

																		//
																		// hovers

																		&.active,
																		&:hover {
																			&
																				> div {
																				color: ${theme`colors.white`};
																			}

																			.portfolio-item__background {
																				opacity: 1;
																				transform: translate3d(
																						-50%,
																						-50%,
																						0
																					)
																					scaleY(
																						1
																					);
																			}
																		}

																		&:hover {
																			.portfolio-item__cross {
																				transform: rotate(
																					180deg
																				);
																			}
																		}

																		&.active {
																			.portfolio-item__cross {
																				transform: rotate(
																					45deg
																				);
																			}
																		}
																	`,
																	tw`w-full h-32 relative block text-left`,
																]}
																type="button"
															>
																<Grid
																	styles={[
																		tw`h-32 items-center`,
																	]}
																>
																	<div
																		className="portfolio-item__background"
																		css={[
																			css`
																				width: calc(
																					100% -
																						5rem
																				);
																				height: 100%;
																				top: 50%;
																				left: 50%;
																				transform: translate3d(
																					-50%,
																					-50%,
																					0
																				);
																			`,
																			tw`h-full absolute pointer-events-none bg-strong-amber`,
																		]}
																	/>

																	<div
																		css={[
																			css`
																				width: calc(
																					100% -
																						5rem
																				);
																				height: ${portfolioSectionItemIndex ===
																				0
																					? `2`
																					: `1`}px;
																				left: 50%;
																				transform: translate3d(
																					-50%,
																					0,
																					0
																				);
																			`,
																			tw`absolute top-0 z-10 pointer-events-none bg-blue-black`,
																		]}
																	/>

																	<T.Heading
																		font="b1"
																		level="3"
																		styles={[
																			tw`col-span-3 relative z-10 pl-4`,
																		]}
																	>
																		{
																			portfolioSectionItem.title
																		}
																	</T.Heading>

																	<T.Heading
																		font="b1"
																		level="3"
																		styles={[
																			tw`col-span-7 relative z-10 whitespace-pre-wrap`,
																		]}
																	>
																		{
																			portfolioSectionItem.description
																		}
																	</T.Heading>

																	<div
																		css={[
																			tw`col-span-2 relative z-10`,
																		]}
																	>
																		<div
																			className="portfolio-item__cross"
																			css={[
																				tw`w-12 h-12 flex items-center justify-center`,
																			]}
																		>
																			<T.Heading
																				font="3"
																				level="6"
																			>
																				+
																			</T.Heading>
																		</div>
																	</div>

																	<div
																		css={[
																			css`
																				width: calc(
																					100% -
																						5rem
																				);
																				height: ${portfolioSectionItemIndex ===
																				portfolioSectionItems.length -
																					1
																					? `2`
																					: `1`}px;
																				left: 50%;
																				transform: translate3d(
																					-50%,
																					0,
																					0
																				);
																				opacity: ${isExpanded
																					? 0
																					: 1};
																			`,
																			tw`absolute bottom-0 z-10 pointer-events-none bg-blue-black`,
																		]}
																	/>
																</Grid>
															</button>

															{(isExpanded && (
																<Grid>
																	<div
																		css={[
																			tw`col-span-12 pt-2 px-4 pb-10 bg-strong-amber text-off-white`,
																		]}
																	>
																		<article
																			css={[
																				css`
																					${A.Keyframes(
																						`appearDown`,
																						`0.5s ${A.EASING_CUBIC} forwards`
																					)}
																				`,
																			]}
																		>
																			<T.Body font="1">
																				{
																					portfolioSectionItem.tagline
																				}
																			</T.Body>

																			{portfolioSectionItem?.link && (
																				<a
																					href={
																						portfolioSectionItem.link
																					}
																					rel="noopener noreferrer"
																					target="_blank"
																					tw="relative z-20 flex mt-12"
																				>
																					<T.Body font="2">
																						Visit
																					</T.Body>

																					<Icon.ArrowUp
																						styles={[
																							tw`w-4 relative block ml-2`,
																						]}
																						color={theme`colors.off-white`}
																					/>
																				</a>
																			)}
																		</article>
																	</div>
																</Grid>
															)) || <></>}
														</li>
													)
												}
											)}
										</ul>
									</div>
								)
							}
						)}
					</section>
				)}

				{(!isDesktop() || displayMode === `grid`) && (
					<section css={[tw`pb-32 md:pb-64`]}>
						{Object.keys(portfolioSections).map(
							portfolioSectionKey => {
								const portfolioSectionItems =
									portfolioSections[portfolioSectionKey]

								return (
									<div
										key={portfolioSectionKey}
										css={[
											css`
												//
											`,
											tw`mb-6 md:mb-8`,
										]}
									>
										<Grid>
											<div
												css={[
													tw`col-span-12 md:col-span-3 h-full mb-6 md:mb-20`,
												]}
											>
												<T.Heading
													font="1"
													level="2"
													css={[
														css`
															top: 5rem;
														`,
														tw`sticky left-0 text-blue-black`,
													]}
												>
													{portfolioSectionKey}
												</T.Heading>
											</div>

											<ul
												css={[
													css`
														//
													`,
													tw`col-span-12 md:col-span-9 relative flex flex-wrap md:justify-between`,
												]}
											>
												{portfolioSectionItems.map(
													(
														portfolioSectionItem,
														portfolioSectionItemIndex
													) => {
														const isExpanded =
															expanded?.[0] &&
															expanded.includes(
																portfolioSectionItem.title
															)

														let logoJSX
														let logoImageJSX

														if (
															portfolioSectionItem
																?.logo?.asset
														) {
															if (
																portfolioSectionItem?.logo?.asset?.fluid?.src?.includes(
																	`svg`
																)
															) {
																logoImageJSX = (
																	<img
																		tw="w-full"
																		src={
																			portfolioSectionItem
																				.logo
																				.asset
																				.fluid
																				.src
																		}
																		alt={
																			portfolioSectionItem.title
																		}
																	/>
																)
															} else {
																logoImageJSX = (
																	<Img
																		tw="w-full"
																		fluid={
																			portfolioSectionItem
																				.logo
																				.asset
																				.fluid
																		}
																		alt={
																			portfolioSectionItem
																				.logo
																				.altText ||
																			portfolioSectionItem.title
																		}
																	/>
																)
															}
														}

														if (logoImageJSX) {
															logoJSX = (
																<figure
																	className="portfolio__item__logo"
																	tw="w-full absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center pointer-events-none"
																>
																	{
																		logoImageJSX
																	}
																</figure>
															)
														}

														//

														const innerJSX = (
															<>
																{logoJSX || (
																	<></>
																)}

																<T.Heading
																	className="portfolio__item__title"
																	font="b1"
																	level="4"
																>
																	{
																		portfolioSectionItem.title
																	}
																</T.Heading>

																{/* // */}

																<div>
																	{portfolioSectionItem?.status && (
																		<T.Body
																			font="3"
																			styles={[
																				tw`w-full absolute bottom-0 right-0 left-0 z-10 mb-3 text-center`,
																			]}
																		>
																			{
																				portfolioSectionItem.status
																			}
																		</T.Body>
																	)}
																</div>
															</>
														)

														//

														return (
															<li
																key={
																	portfolioSectionItem.title
																}
																css={[
																	css`
																		${A.Keyframes(
																			`appearRight`,
																			`0.5s ${A.EASING_CUBIC} forwards`,
																			`${
																				portfolioSectionItemIndex *
																				75
																			}ms`
																		)}

																		width: 100%;
																		height: 80vw;
																		background: ${theme`colors`[
																			portfolioSectionItem
																				.backgroundColor
																		]};
																		color: ${theme`colors`[
																			portfolioSectionItem
																				.fontColor
																		]};

																		@media screen and (min-width: 1024px) {
																			width: calc(
																				33.333% -
																					0.5rem
																			);
																			height: 18vw;
																		}
																	`,
																	tw`relative mb-3`,
																]}
															>
																<div
																	css={[
																		css`
																			.portfolio__item__logo {
																				transition: 0.66s
																						${A.EASING_CUBIC}
																						opacity,
																					0.66s
																						${A.EASING_CUBIC}
																						transform;
																				transition-delay: 0.075s;
																				opacity: ${isExpanded
																					? 1
																					: 0};

																				@media screen and (max-width: 1024px) {
																					transform: translate3d(
																						0,
																						${isExpanded
																							? `-2.5rem`
																							: `0`},
																						0
																					);
																				}

																				@media screen and (min-width: 1025px) {
																					transform: translate3d(
																						0,
																						${isExpanded
																							? `-3.5vw`
																							: `0`},
																						0
																					);
																				}
																			}

																			.portfolio__item__tagline {
																				transition: 0.66s
																						${A.EASING_CUBIC}
																						opacity,
																					0.66s
																						${A.EASING_CUBIC}
																						transform;
																				opacity: ${isExpanded
																					? 1
																					: 0};
																				transform: scale(
																					${isExpanded
																						? 1
																						: 0.95}
																				);
																			}

																			.portfolio__item__title {
																				transition: 0.66s
																						${A.EASING_CUBIC}
																						opacity,
																					0.66s
																						${A.EASING_CUBIC}
																						transform;
																				opacity: ${!isExpanded ||
																				(isExpanded &&
																					!logoJSX)
																					? 1
																					: 0};
																				transform: translate3d(
																					0,
																					${isExpanded
																						? `-2vw`
																						: `0`},
																					0
																				);
																			}

																			${isDesktop() &&
																			`
                                      @media not all and (pointer: coarse) {
                                        &:hover {
                                          .portfolio__item__logo {
                                            opacity: 1;
                                            transform: translate3d(
                                              0,
                                              -2.5vw,
                                              0
                                            );
                                          }

                                          .portfolio__item__tagline {
                                            opacity: 1;
                                            transform: scale(1);
                                          }

                                          .portfolio__item__title {
                                            opacity: ${!logoJSX ? 1 : 0};
                                            transform: translate3d(
                                              0,
                                              -2vw,
                                              0
                                            );
                                          }
                                        }
                                      }
                                    `}
																		`,
																		tw`w-full h-full relative block`,
																	]}
																>
																	<div
																		className="portfolio__item__tagline"
																		css={[
																			css`
																				${!isDesktop() &&
																				`pointer-events: ${
																					isExpanded
																						? `auto`
																						: `none`
																				};
                                      `}
																			`,
																			tw`w-full h-full absolute top-0 right-0 bottom-0 left-0 z-40 flex flex-col items-center justify-center pt-24 px-8 text-center`,
																		]}
																	>
																		{!isDesktop() && (
																			<button
																				type="button"
																				onClick={() =>
																					toggleExpandedItem(
																						portfolioSectionItem.title
																					)
																				}
																				css={[
																					css``,
																					tw`w-8 h-8 absolute top-0 right-0 block mt-2 mr-2`,
																				]}
																			>
																				<Icon.Cross
																					color={
																						theme`colors`[
																							portfolioSectionItem
																								.fontColor
																						]
																					}
																					styles={[
																						css``,
																						tw`w-8 h-8`,
																					]}
																				/>
																			</button>
																		)}

																		<div
																			css={[
																				tw`relative z-20`,
																			]}
																		>
																			<T.Heading
																				font="b2"
																				level="4"
																			>
																				{
																					portfolioSectionItem.tagline
																				}
																			</T.Heading>

																			{portfolioSectionItem?.link && (
																				<a
																					href={
																						portfolioSectionItem.link
																					}
																					rel="noopener noreferrer"
																					target="_blank"
																					css={[
																						css`
																							&:hover {
																								text-decoration: underline;
																							}
																						`,
																						tw`flex items-center justify-center mt-1`,
																					]}
																				>
																					<T.Body font="3">
																						Visit
																					</T.Body>

																					<Icon.ArrowUp
																						styles={[
																							tw`w-3 relative block ml-2`,
																						]}
																						color={
																							theme`colors`[
																								portfolioSectionItem
																									.fontColor
																							]
																						}
																					/>
																				</a>
																			)}
																		</div>
																	</div>

																	{(isDesktop() && (
																		<div
																			css={[
																				tw`w-full h-full relative flex flex-col items-center justify-center mb-4 px-3 text-center`,
																			]}
																		>
																			{
																				innerJSX
																			}
																		</div>
																	)) || (
																		<button
																			type="button"
																			onClick={() =>
																				toggleExpandedItem(
																					portfolioSectionItem.title
																				)
																			}
																			css={[
																				tw`w-full h-full relative flex flex-col items-center justify-center mb-4 px-3 text-center`,
																			]}
																		>
																			{
																				innerJSX
																			}
																		</button>
																	)}
																</div>
															</li>
														)
													}
												)}

												{portfolioSectionItems.length %
													3 !==
													0 &&
													Array(
														(portfolioSectionItems.length -
															1) %
															3
													)
														.fill(null)
														.map(
															(
																_,
																fillerIndex
															) => {
																const key = `grid-filler-${fillerIndex}`

																return (
																	<li
																		key={
																			key
																		}
																		css={[
																			css`
																				width: calc(
																					33.333% -
																						0.5rem
																				);
																				height: 18vw;
																			`,
																			tw`relative mb-4 opacity-0 pointer-events-none`,
																		]}
																	>
																		<></>
																	</li>
																)
															}
														)}
											</ul>
										</Grid>
									</div>
								)
							}
						)}
					</section>
				)}

				<Footer />
			</Layout>
		</>
	)
}

export default PortfolioPage