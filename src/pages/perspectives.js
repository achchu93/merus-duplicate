/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useRef, useState } from "react"
import tw, { css, theme } from "twin.macro"
import { DocumentContext } from "~context/DocumentContext"
import Footer from "~components/Footer"
import Go from "~components/Go"
import Layout from "~components/Layout"
import Seo from "~components/SEO"
import Grid from "~components/styles/Grid"
import * as A from "~components/styles/Animations"
import * as T from "~components/styles/Typography"
import PerspectiveData from "./../content/perspectives.json"

const PerspectivesPage = ({ data, location }) => {
	// ===========================================================================
	// context / ref / state

	const { isDesktop, scrollTop } = useContext(DocumentContext)

	const submitRef = useRef()

	const [email, setEmail] = useState(null)
	const [filters, setFilters] = useState([])
	const [rendering, setRendering] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [tagsActive, setTagsActive] = useState(false)

	// ===========================================================================
	// variables

	const cms = PerspectiveData.sanityPerspectives

	const articles = []

	const loadedTags = []
	const tags = []

	if (PerspectiveData?.allSanityArticle?.edges?.[0]) {
		PerspectiveData.allSanityArticle.edges.forEach(({ node }) => {
			articles.push(node)

			if (node?.tags?.[0]) {
				node.tags.forEach(tag => {
					if (!loadedTags.includes(tag.toLowerCase())) {
						loadedTags.push(tag.toLowerCase())
						tags.push(tag)
					}
				})
			}
		})
	}

	tags.sort()

	const deepDives = []

	if (PerspectiveData?.allSanityDeepDive?.edges?.[0]) {
		PerspectiveData.allSanityDeepDive.edges.forEach(({ node }) => {
			deepDives.push(node)
		})
	}

	// ===========================================================================
	// methods

	const toggleFilter = tag => {
		const filtersClone = JSON.parse(JSON.stringify(filters))

		const currentIndex = filtersClone.indexOf(tag)

		if (currentIndex === -1) {
			filtersClone.push(tag)
		} else {
			filtersClone.splice(currentIndex, 1)
		}

		setRendering(true)
		setFilters(filtersClone)
	}

	const submitProxy = () => {
		if (submitRef?.current) {
			submitRef.current.click()
		}
	}

	const onSubmit = e => {
		e.preventDefault()

		if (!email || email === `` || submitting || submitted) {
			return false
		}

		if (
			typeof window !== `undefined` &&
			window.location.href.includes(`localhost:8000`)
		) {
			setSubmitting(true)

			setTimeout(() => {
				setSubmitting(false)
				setSubmitted(true)
			}, 3000)

			return false
		}

		setSubmitting(true)

		const mailchimpData = {
			email,
		}

		fetch(`${process.env.GATSBY_NETLIFY_FUNCTIONS}/mailchimp`, {
			body: JSON.stringify(mailchimpData),
			method: `POST`,
		})
			.then(() => {
				console.log(`Mailchimp Complete`)

				setSubmitting(false)
				setSubmitted(true)
			})
			.catch(error => {
				console.error(error)
			})

		return false
	}

	// ===========================================================================
	// lifecycle

	useEffect(() => {
		if (tagsActive) {
			setTagsActive(false)
		}
	}, [scrollTop])

	useEffect(() => {
		if (window) {
			window.scrollTo({
				top: 0,
				behavior: `smooth`,
			})
		}

		setTimeout(() => {
			setRendering(false)
		}, 200)
	}, [filters])

	// ===========================================================================
	// render

	let visibleArticleCount = 0

	const formJSX = (
		<form
			onSubmit={onSubmit}
			css={[
				css`
					transition: opacity 0.3s ${A.EASING_CUBIC};
				`,
				tw`w-full md:w-3/5 relative block`,
			]}
		>
			<input
				ref={submitRef}
				tw="w-0 h-0 absolute top-0 right-0 opacity-0 pointer-events-none"
				type="submit"
			/>

			<input
				css={[
					css`
						background: transparent;
						font-family: "ABC Monument Grotesk";
						font-size: 14px;
						line-height: 18px;
						letter-spacing: 0.01em;
						font-weight: 300;

						@media screen and (min-width: 1024px) {
							font-size: 22px;
							line-height: 24px;
							letter-spacing: 0.01em;
						}

						opacity: ${submitting || submitted ? `0.5` : `1`};

						//

						&::-webkit-input-placeholder {
							color: ${theme`colors.off-white`};
						}

						&::-moz-placeholder {
							color: ${theme`colors.off-white`};
						}

						&:-ms-input-placeholder {
							color: ${theme`colors.off-white`};
						}

						&:-moz-placeholder {
							color: ${theme`colors.off-white`};
						}
					`,
					tw`w-full relative block pt-1 pb-1 border-b`,
				]}
				onChange={e => setEmail(e.currentTarget.value)}
				placeholder="Email"
				required
				type="email"
			/>

			<div css={[tw`h-full absolute top-0 right-0 bottom-0`]}>
				<button
					type="button"
					css={[
						tw`w-full h-full relative block pb-1 text-dark-purple`,
					]}
					onClick={submitProxy}
				>
					<T.Body
						font="1"
						styles={[
							css`
								font-weight: 300;
								color: ${submitted
									? theme`colors.white`
									: theme`colors.dark-purple`};

								font-size: 14px;
								line-height: 18px;
								letter-spacing: 0.01em;
								font-weight: 300;

								@media screen and (min-width: 1024px) {
									font-size: 22px;
									line-height: 24px;
									letter-spacing: 0.01em;
								}

								@media not all and (pointer: coarse) {
									&:hover {
										text-decoration: underline;
									}
								}
							`,
						]}
					>
						{!submitting && !submitted && `Submit`}
						{submitting && `Submitting...`}
						{submitted && `Subscribed`}
					</T.Body>
				</button>
			</div>
		</form>
	)

	//

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
							<div
								css={[
									tw`h-full flex items-center mr-8 text-strong-amber`,
								]}
							>
								<T.Body font="2">All Perspectives</T.Body>
							</div>

							<Go
								to="/perspectives/deepdives"
								inject={{
									tw: tw`h-full flex items-center text-grey`,
								}}
							>
								<T.Body font="2">Deep Dives</T.Body>
							</Go>
						</div>

						<div
							css={[
								tw`col-span-2 relative z-10 flex items-center justify-end`,
							]}
						>
							<button
								type="button"
								css={[tw`h-12`]}
								onClick={() => setTagsActive(!tagsActive)}
							>
								<div
									css={[
										css`
											color: ${tagsActive
												? theme`colors.strong-amber`
												: theme`colors.grey`};
										`,
										tw`h-12 relative flex items-center overflow-hidden`,
									]}
								>
									<T.Body font="2" styles={[tw`md:mr-3`]}>
										Tags
									</T.Body>

									<div
										css={[
											css`
												transition: 0.3s transform
													${A.EASING_CUBIC};

												transform: rotate(
													${tagsActive ? -135 : 0}deg
												);
											`,
											tw`w-10 h-10 relative flex items-center justify-center`,
										]}
									>
										<T.Body font="1" level="6">
											+
										</T.Body>
									</div>
								</div>
							</button>

							<div
								css={[
									css`
										transition: 0.3s opacity
												${A.EASING_CUBIC},
											0.3s transform ${A.EASING_CUBIC};

										opacity: ${tagsActive ? `1` : `0`};
										pointer-events: ${tagsActive
											? `auto`
											: `none`};
										transform: translate3d(
											0,
											${tagsActive ? `0` : `-0.5rem`},
											0
										);

										min-width: 140px;
										right: 0;

										@media screen and (min-width: 1024px) {
											width: 100%;
											right: -0.5rem;
										}
									`,
									tw`absolute top-12 text-right bg-off-white`,
								]}
							>
								<ul>
									<li
										css={[
											css`
												color: ${theme`colors.grey`};
											`,
											tw`w-full h-12 relative flex items-center justify-end pr-4 pl-4`,
										]}
									>
										<button
											type="button"
											onClick={() => {
												setTagsActive(false)
												setRendering(true)
												setFilters([])
											}}
										>
											<T.Body font="2">[Clear]</T.Body>
										</button>
									</li>

									{tags.map(tag => (
										<li
											key={tag}
											css={[
												css`
													color: ${filters?.includes(
														tag
													)
														? theme`colors.strong-amber`
														: theme`colors.grey`};
												`,
												tw`w-full h-12 relative flex items-center justify-end pr-4 pl-4`,
											]}
										>
											<button
												type="button"
												css={[
													tw`w-full h-12 relative block text-right`,
												]}
												onClick={() =>
													toggleFilter(tag)
												}
											>
												<T.Body font="2">{tag}</T.Body>
											</button>
										</li>
									))}
								</ul>
							</div>
						</div>
					</Grid>
				</div>

				<div css={[tw`relative pt-8 pb-32`]}>
					{!rendering && articles?.[0] && (
						<ul css={[tw`relative`]}>
							{articles.map(article => {
								const key = article?.slug?.current

								let isDeepDive = false
								let visible = true

								PerspectiveData.allSanityDeepDive.edges.forEach(
									({ node }) => {
										if (
											!node?.articles?.[0] ||
											isDeepDive
										) {
											return
										}

										node.articles.forEach(
											deepDiveArticle => {
												if (isDeepDive) {
													return
												}

												if (
													article?.id ===
													deepDiveArticle?.id
												) {
													isDeepDive = true
												}
											}
										)
									}
								)

								if (filters?.[0]) {
									visible = false

									filters.forEach(filter => {
										if (visible) {
											return
										}

										visible = article?.tags?.includes(
											filter
										)
									})
								}

								if (visible) {
									visibleArticleCount += 1
								}

								const articleTags = article?.tags

								if (articleTags?.[0]) {
									articleTags.sort()
								}

								//

								return (
									<li
										key={key}
										css={[
											css`
												${A.Keyframes(
													`appearDown`,
													`1s ${A.EASING_CUBIC} forwards`,
													`${
														visibleArticleCount *
														150
													}ms`
												)}

												display: ${visible
													? `block`
													: `none`};
											`,
											tw`relative`,
										]}
									>
										<Go
											to={`/perspectives/${article.slug.current}`}
											inject={{
												css: `
                          color: ${theme`colors.dark-purple`};

                          @media not all and (pointer: coarse) {
                            &:hover {
                              color: ${theme`colors.off-white`};

                              .article-background {
                                opacity: 1;
                              }

                              .article-type {
                                color: ${theme`colors.off-white`};
                              }
                            }
                          }
                        `,
												tw: tw`block`,
											}}
										>
											<Grid
												node="article"
												styles={[
													tw`relative items-center pb-8`,
												]}
											>
												<div
													className="article-background"
													css={[
														css`
															transition: opacity
																0.15s
																${A.EASING_CUBIC};

															opacity: 0;

															width: calc(
																100% - 5rem
															);
															top: 50%;
															left: 50%;
															transform: translate3d(
																-50%,
																-50%,
																0
															);
														`,
														tw`h-full absolute bg-dark-purple`,
													]}
												/>

												<div
													css={[
														css`
															height: 2px;
														`,
														tw`col-span-12 mb-4 md:mb-8 bg-blue-black`,
													]}
												/>

												<header
													css={[
														css``,
														tw`col-span-12 md:col-span-3 h-full relative order-2 md:order-1 z-10 pt-4 md:pt-2 pr-3 md:pr-0 pb-4 md:pb-2 pl-3 md:pl-4`,
													]}
												>
													<div
														css={[tw`mb-2 md:mb-0`]}
													>
														<T.Heading
															font="b2"
															level="4"
														>
															{article.date}
														</T.Heading>

														{articleTags?.[0] && (
															<div
																css={[
																	css`
																		color: ${theme`colors.grey`};
																	`,
																]}
															>
																<T.Heading
																	color="light-grey"
																	font="b2"
																	level="4"
																>
																	{articleTags.map(
																		(
																			tag,
																			tagIndex
																		) => (
																			<span
																				key={
																					tag
																				}
																			>
																				{
																					tag
																				}
																				{tagIndex <=
																				article
																					.tags
																					.length -
																					2
																					? `, `
																					: ``}
																			</span>
																		)
																	)}
																</T.Heading>
															</div>
														)}
													</div>

													{article?.author?.name && (
														<div
															css={[
																css`
																	span {
																		font-weight: 300;
																	}
																`,
																tw`mt-2 text-strong-amber`,
															]}
														>
															{(isDesktop() && (
																<T.Caption>
																	{
																		article
																			.author
																			.name
																	}
																</T.Caption>
															)) || (
																<T.Body font="3">
																	{
																		article
																			.author
																			.name
																	}
																</T.Body>
															)}
														</div>
													)}

													{isDeepDive && (
														<div
															className="article-type"
															css={[
																css`
																	transition: color
																		0.15s
																		${A.EASING_CUBIC};

																	span {
																		font-weight: 300;
																	}
																`,
																tw`mt-1 text-blue-black`,
															]}
														>
															{(isDesktop() && (
																<T.Caption>
																	Deep Dive
																</T.Caption>
															)) || (
																<T.Body font="3">
																	Deep Dive
																</T.Body>
															)}
														</div>
													)}
												</header>

												<div
													css={[
														tw`col-span-12 md:col-span-8 md:h-32 relative z-10 order-1 md:order-2 flex items-center mt-4 md:mt-0 pr-3 md:pr-4 pl-3 md:pl-0`,
													]}
												>
													<T.Heading
														font="3"
														level="2"
													>
														{article.title}
													</T.Heading>
												</div>
											</Grid>
										</Go>

										{visibleArticleCount === 1 && (
											<Grid
												node="article"
												styles={[
													tw`relative items-center`,
												]}
											>
												<div
													css={[
														css`
															transition: background
																0.3s
																${A.EASING_CUBIC};

															background-color: ${submitted
																? theme`colors.light-purple`
																: theme`colors.strong-amber`};
															pointer-events: ${submitted ||
															submitting
																? `none`
																: `auto`};
														`,
														tw`col-span-full relative md:flex md:items-center pt-6 md:pt-12 pr-3 md:pr-4 pb-6 md:pb-12 pl-3 md:pl-4 text-white`,
													]}
												>
													<div
														css={[
															css`
																height: 2px;

																@media not all and (pointer: coarse) {
																	&:hover {
																		background: ${theme`colors.medium-purple`};
																		color: ${theme`colors.off-white`};
																	}
																}
															`,
															tw`w-full absolute top-0 right-0 left-0 bg-blue-black`,
														]}
													/>

													<header
														css={[
															tw`w-full md:w-1/2 relative`,
														]}
													>
														{(isDesktop() && (
															<T.Body font="2">
																Subscribe to our
																monthly
																newsletter
															</T.Body>
														)) || (
															<T.Heading font="3">
																Subscribe to our
																monthly
																newsletter
															</T.Heading>
														)}
													</header>

													<div
														css={[
															tw`w-full md:w-1/2 relative`,
														]}
													>
														{formJSX}
													</div>
												</div>
											</Grid>
										)}
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
									opacity: ${rendering ? `0` : `1`};
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

export default PerspectivesPage
