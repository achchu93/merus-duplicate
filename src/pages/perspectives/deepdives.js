/* eslint-disable react/prop-types */

import React, { useContext, useState } from "react"
import tw, { css, theme } from "twin.macro"
import { DocumentContext } from "~context/DocumentContext"
import Footer from "~components/Footer"
import Go from "~components/Go"
import Layout from "~components/Layout"
import SEO from "~components/SEO"
import Grid from "~components/styles/Grid"
import * as A from "~components/styles/Animations"
import * as T from "~components/styles/Typography"
import PerspectiveData from "../../content/perspectives.json"

const DeepDivesPage = ({ data, location }) => {
	// ===========================================================================
	// context / ref / state

	const { isDesktop } = useContext(DocumentContext)

	const [expandedDeepDive, setExpandedDeepDive] = useState(null)

	// ===========================================================================
	// variables

	const cms = {
		title: "Deep Dives",
		seoDescription: null,
		seoKeywords: [],
	}

	const deepDives = []

	if (PerspectiveData?.allSanityDeepDive?.edges?.[0]) {
		PerspectiveData.allSanityDeepDive.edges.forEach(({ node }) => {
			deepDives.push(node)
		})
	}

	// ===========================================================================
	// render

	//

	return (
		<>
			<SEO
				title={cms?.title || ``}
				description={cms?.seoDescription || ``}
				keywords={cms?.seoKeywords || ``}
				path={location.pathname}
			/>

			<Layout
				styles={[
					css`
						//
					`,
					tw`min-h-screen relative pt-24 md:pt-64 bg-off-white`,
				]}
			>
				<div
					css={[
						tw`w-full sticky top-0 right-0 left-0 z-20 pt-16 md:pt-24 pb-2 bg-off-white`,
					]}
				>
					<Grid node="header">
						<div
							css={[
								tw`col-span-10 md:col-span-7 md:col-start-4 relative flex pl-1 md:pl-0`,
							]}
						>
							<Go
								to="/perspectives"
								type="button"
								inject={{
									tw: tw`h-12 flex items-center mr-8 text-grey`,
								}}
							>
								<T.Body font="2">All Perspectives</T.Body>
							</Go>

							<div
								css={[
									tw`h-12 flex items-center text-strong-amber`,
								]}
							>
								<T.Body font="2">Deep Dives</T.Body>
							</div>
						</div>
					</Grid>
				</div>

				<div css={[tw`relative mt-8 mb-32`]}>
					{deepDives?.[0] && (
						<ul css={[tw`relative`]}>
							{deepDives.map((deepDive, deepDiveIndex) => {
								const { title, tagline } = deepDive

								const key = `deep-dive-${deepDiveIndex}`
								const active =
									expandedDeepDive === deepDiveIndex

								return (
									<li
										key={key}
										css={[
											css`
												${A.Keyframes(
													`appearDown`,
													`1s ${A.EASING_CUBIC} forwards`,
													`${deepDiveIndex * 150}ms`
												)}

												color: ${active
													? theme`colors.off-white`
													: theme`colors.dark-purple`};

												@media not all and (pointer: coarse) {
													&:hover {
														color: ${theme`colors.off-white`};

														.article-background {
															opacity: 1;
														}
													}
												}
											`,
											tw`relative`,
										]}
									>
										<Grid>
											<div
												className="article-background"
												css={[
													css`
														transition: opacity
															0.15s
															${A.EASING_CUBIC};

														opacity: ${active
															? `1`
															: `0`};

														width: calc(
															100% - 1rem
														);
														top: 50%;
														left: 50%;
														transform: translate3d(
															-50%,
															-50%,
															0
														);

														@media screen and (min-width: 1024px) {
															width: calc(
																100% - 5rem
															);
														}
													`,
													tw`h-full absolute bg-dark-purple`,
												]}
											/>

											<div
												css={[
													css`
														height: 2px;
													`,
													tw`col-span-12 bg-blue-black`,
												]}
											/>

											<article
												css={[
													tw`col-span-10 md:col-span-8 md:col-start-4 relative pr-3 md:pr-0 pl-3 md:pl-0`,
												]}
											>
												<button
													type="button"
													onClick={() =>
														setExpandedDeepDive(
															active
																? null
																: deepDiveIndex
														)
													}
													css={[
														tw`relative block pt-10 md:pr-12 pb-10 text-left`,
													]}
												>
													<header>
														{title && (
															<T.Heading font="3">
																{title}
															</T.Heading>
														)}

														{tagline && (
															<T.Body
																font="2"
																styles={[
																	tw`mt-8 md:mt-5`,
																]}
															>
																{tagline}
															</T.Body>
														)}
													</header>
												</button>

												{active && (
													<ul
														css={[
															tw`w-full relative mt-8 md:mt-20`,
														]}
													>
														{deepDive.articles.map(
															(
																article,
																articleIndex
															) => (
																<li
																	key={articleIndex}
																	css={[
																		css`
																			${A.Keyframes(
																				`appearDown`,
																				`0.5s ${A.EASING_CUBIC} forwards`,
																				`${
																					articleIndex *
																					100
																				}ms`
																			)}
																		`,
																		tw`w-full relative block mb-6 md:mb-8`,
																	]}
																>
																	<Go
																		to={`/perspectives/${article.slug.current}`}
																	>
																		<T.Body
																			font="2"
																			styles={[
																				tw`flex`,
																			]}
																		>
																			<span
																				css={[
																					tw`w-6 block`,
																				]}
																			>
																				{articleIndex +
																					1}

																				.
																			</span>

																			<span
																				css={[
																					tw`block underline`,
																				]}
																			>
																				{article?.deepDiveTitle ||
																					article.title}
																			</span>
																		</T.Body>
																	</Go>
																</li>
															)
														)}
													</ul>
												)}
											</article>

											<button
												type="button"
												css={[
													tw`col-span-2 md:col-span-1 h-full relative flex items-center justify-start overflow-hidden`,
												]}
												onClick={() =>
													setExpandedDeepDive(
														active
															? null
															: deepDiveIndex
													)
												}
											>
												<div
													css={[
														css`
															transition: 0.3s
																transform
																${A.EASING_CUBIC};

															transform: rotate(
																${active
																	? -135
																	: 0}deg
															);
														`,
														tw`w-10 h-10 relative flex items-center justify-center`,
													]}
												>
													{(isDesktop() && (
														<T.Body font="1">
															+
														</T.Body>
													)) || (
														<T.Heading
															font="2"
															level="6"
														>
															+
														</T.Heading>
													)}
												</div>
											</button>
										</Grid>
									</li>
								)
							})}
						</ul>
					)}

					<Grid>
						<div
							css={[
								css`
									transition: opacity 0.3s ${A.EASING_CUBIC};

									height: 2px;
								`,
								tw`col-span-12 bg-blue-black`,
							]}
						/>
					</Grid>
				</div>
			</Layout>

			<Footer />
		</>
	)
}

export default DeepDivesPage
