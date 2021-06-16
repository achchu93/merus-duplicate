/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */

import React, { useContext } from "react"
import { graphql } from "gatsby"
import tw, { css, theme } from "twin.macro"
import {
	EmailShareButton,
	LinkedinShareButton,
	TwitterShareButton,
} from "react-share"
import { DocumentContext } from "~context/DocumentContext"
import * as A from "~components/styles/Animations"
import Grid from "~components/styles/Grid"
import * as T from "~components/styles/Typography"
import Footer from "~components/Footer"
import Go from "~components/Go"
import Layout from "~components/Layout"
import PortableArticleText from "~components/PortableArticleText"
import SEO from "~components/SEO"

const ArticlePage = ({ pageContext, location }) => {
	const { isDesktop } = useContext(DocumentContext)

	//

	const cms = pageContext.sanityArticle

	// let rawBodyInitial;
	const rawBody = JSON.parse(JSON.stringify(cms._rawBody))

	// if (rawBody?.[0]) {
	//   // eslint-disable-next-line prefer-destructuring
	//   rawBodyInitial = rawBody[0];
	//   rawBody = rawBody.slice(1);
	// }

	let parentDeepDive = null

	if (pageContext?.allSanityDeepDive?.edges?.[0]) {
		pageContext.allSanityDeepDive.edges.forEach(({ node }) => {
			if (!node?.articles?.[0] || parentDeepDive) {
				return
			}

			node.articles.forEach(article => {
				if (parentDeepDive) {
					return
				}

				if (article?.id === cms?.id) {
					parentDeepDive = node
				}
			})
		})
	}

	const articleTags = cms?.tags

	if (articleTags?.[0]) {
		articleTags.sort()
	}

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
				styles={[css``, tw`min-h-screen bg-off-white text-blue-black`]}
			>
				<div
					css={[
						css`
							min-height: calc(100vh - 120px);
							padding-top: 173px;
							padding-bottom: 120px;

							@media screen and (min-width: 1024px) {
								padding-top: 364px;
								padding-bottom: 180px;
							}
						`,
					]}
				>
					<Grid>
						<div
							css={[
								tw`col-span-10 md:col-span-7 md:col-start-4 relative flex mb-8 pl-1 md:pl-0`,
							]}
						>
							<button
								type="button"
								css={[
									css`
										a {
											text-decoration: none;
										}

										color: ${!cms?.deepDive
											? theme`colors.grey`
											: theme`colors.strong-amber`};
									`,
									tw`mr-8`,
								]}
							>
								<Go to="/perspectives">
									<T.Body font="2">All Perspectives</T.Body>
								</Go>
							</button>

							<div
								css={[
									css`
										a {
											text-decoration: none;
										}

										color: ${cms?.deepDive
											? theme`colors.strong-amber`
											: theme`colors.grey`};
									`,
									tw``,
								]}
							>
								<Go to="/perspectives/deepdives">
									<T.Body font="2">Deep Dives</T.Body>
								</Go>
							</div>
						</div>

						<header
							css={[
								css`
									${A.Keyframes(
										`appearLeft`,
										`1s ${A.EASING_CUBIC} forwards`,
										`${300}ms`
									)}
								`,
								tw`col-span-12 md:col-span-3 order-2 md:order-1 relative z-10 flex flex-col justify-between`,
							]}
						>
							<div>
								<T.Heading font="b2" level="4">
									{cms.date}
								</T.Heading>

								{articleTags?.[0] && (
									<T.Heading font="b2" level="3">
										{articleTags.map((tag, tagIndex) => (
											<span
												key={tag}
												css={[tw`text-grey`]}
											>
												{tag}
												{tagIndex < cms.tags.length - 1
													? `, `
													: ``}
											</span>
										))}
									</T.Heading>
								)}
							</div>

							<div>
								{cms?.author?.name && (
									<Go
										inject={{
											css: `
                        text-decoration: none !important;

                        p {
                          text-decoration: none !important;
                        }
                      `,
											tw: tw`relative block mt-2 md:mt-12 mb-16 md:mb-8`,
										}}
										to={`/team?member=${encodeURIComponent(
											cms.author.name
										)}`}
									>
										<T.Body
											font="3"
											styles={[tw`text-strong-amber`]}
										>
											{cms.author.name}
										</T.Body>
									</Go>
								)}
							</div>
						</header>

						<T.Heading
							css={[
								css`
									${A.Keyframes(
										`appearRight`,
										`1s ${A.EASING_CUBIC} forwards`,
										`${300}ms`
									)}
								`,
								tw`col-span-12 md:col-span-7 md:col-start-4 order-1 md:order-2 mt-6 md:mt-0 mb-8 md:mb-0`,
							]}
							font="3"
							level="1"
						>
							{cms.title}
						</T.Heading>
					</Grid>

					<section
						css={[
							css`
								${A.Keyframes(
									`appearRight`,
									`1s ${A.EASING_CUBIC} forwards`,
									`${450}ms`
								)}

								a {
									text-decoration: underline;
								}
							`,
						]}
					>
						{isDesktop() && parentDeepDive && (
							<Grid>
								<div
									css={[
										css`
											height: 4rem;
											// opacity: ${cms?.deepDive
												? `1`
												: `0`};
										`,
										tw`col-span-3 relative z-20`,
									]}
								>
									<div
										css={[
											css`
												bottom: -100%;
											`,
											tw`w-full relative block pt-4 pr-3 pb-4 pl-3 bg-dark-purple text-off-white`,
										]}
									>
										<T.Caption
											styles={[tw`block mb-12`]}
											weight={300}
										>
											This article forms part of our Deep Dive
											on:
										</T.Caption>

										<T.Body styles={[tw`mb-11 pr-8`]}>
											{parentDeepDive.title}
										</T.Body>

										<Go
											to="/perspectives/deepdives"
											inject={{
												css: `
													text-decoration: none !important;
												`,
											}}
										>
											<T.Body
												font="2"
												styles={[tw`text-strong-amber`]}
											>
												See more →
											</T.Body>
										</Go>
									</div>
								</div>
							</Grid>
						)}

						{/* // initial rawbody paragraph broken out for inlining with deep dive 'ads' // */}
						{/* <Grid>
              <div
                css={[
                  tw`col-span-12 md:col-span-6 md:col-start-4 relative mb-6 whitespace-pre-wrap`
                ]}
              >
                {!isDesktop() && parentDeepDive && (
                  <div
                    css={[
                      tw`relative z-10 mr-2 mb-1 p-2 flex flex-col justify-between float-left bg-dark-purple`
                    ]}
                    style={{
                      width: `calc(50vw - 1rem)`,
                      height: `calc(50vw - 1rem)`
                    }}
                  >
                    <T.Caption styles={[tw`text-light-grey`]}>
                      This article forms part of our Deep Dive on:
                    </T.Caption>

                    <T.Body font="2" styles={[tw`text-light-grey`]}>
                      {parentDeepDive.title}
                    </T.Body>

                    <Go
                      to="/perspectives/deepdives"
                      inject={{
                        css: `
                          text-decoration: none !important;
                        `
                      }}
                    >
                      <T.Body font="2" styles={[tw`text-strong-amber`]}>
                        See more →
                      </T.Body>
                    </Go>
                  </div>
                )}

                <div
                  css={[
                    css`
                      p {
                        font-style: ${rawBodyInitial?.children?.[0]?.marks?.includes(
                          `em`
                        )
                          ? `italic`
                          : `normal`};
                        font-weight: ${rawBodyInitial?.children?.[0]?.marks?.includes(
                          `strong`
                        )
                          ? `bolder`
                          : `300`};
                      }
                    `,
                    tw`relative whitespace-pre-wrap`
                  ]}
                >
                  <T.Body font="2">{rawBodyInitial.children[0].text}</T.Body>
                </div>
              </div>
            </Grid> */}

						<PortableArticleText blocks={rawBody} deepDive />
					</section>

					{parentDeepDive && (
						<Grid>
							<div
								css={[
									tw`col-span-full relative mt-12 pt-6 md:pt-6 pr-3 md:pr-6 pb-6 md:pb-6 pl-3 md:pl-6 bg-dark-purple text-off-white`,
								]}
							>
								<T.Body font="2">
									This article forms part of our Deep Dive on:
								</T.Body>

								<T.Heading
									font={isDesktop() ? `2` : `3`}
									styles={[
										tw`relative pt-10 md:pt-20 pb-10 md:pb-20`,
									]}
								>
									{parentDeepDive?.title}
								</T.Heading>

								<Go
									to="/perspectives/deepdives"
									inject={{
										css: `
											text-decoration: none !important;
										`,
									}}
								>
									<T.Body
										font="2"
										styles={[tw`text-strong-amber`]}
									>
										See more →
									</T.Body>
								</Go>
							</div>
						</Grid>
					)}

					<Grid node="section">
						<div
							css={[
								css`
									a {
										text-decoration: none;
										display: inline-block;

										&:hover {
											text-decoration: underline;
										}
									}
								`,
								tw`col-span-12 md:col-span-7 md:col-start-4 relative mt-20 md:mb-12`,
							]}
						>
							<Go to="/perspectives">
								<T.Body
									font="2"
									styles={[tw`text-strong-amber`]}
								>
									← Back to Perspectives
								</T.Body>
							</Go>
						</div>
					</Grid>

					{typeof window !== `undefined` && (
						<Grid>
							<ul
								css={[
									css`
										${A.Keyframes(
											`appearRight`,
											`1s ${A.EASING_CUBIC} forwards`,
											`${600}ms`
										)}
									`,
									tw`col-span-12 md:col-span-6 md:col-start-4 relative pt-8 md:pt-12 flex justify-start`,
								]}
							>
								<li>
									<div css={[tw`block mr-4 md:mr-6`]}>
										<T.Body
											font="2"
											styles={[
												tw`pt-3 px-1 pb-3 text-grey`,
											]}
										>
											Share via:
										</T.Body>
									</div>
								</li>

								<li>
									<div
										css={[
											css`
												&:hover {
													p {
														text-decoration: underline;
													}
												}
											`,
											tw`block mr-8 md:mr-6`,
										]}
									>
										<TwitterShareButton
											url={window?.location?.href}
										>
											<T.Body
												font="2"
												styles={[
													tw`pt-3 px-1 pb-3 text-strong-amber`,
												]}
											>
												Twitter
											</T.Body>
										</TwitterShareButton>
									</div>
								</li>

								<li>
									<div
										css={[
											css`
												&:hover {
													p {
														text-decoration: underline;
													}
												}
											`,
											tw`block mr-8 md:mr-6`,
										]}
									>
										<LinkedinShareButton
											url={window?.location?.href}
										>
											<T.Body
												font="2"
												styles={[
													tw`pt-3 px-1 pb-3 text-strong-amber`,
												]}
											>
												LinkedIn
											</T.Body>
										</LinkedinShareButton>
									</div>
								</li>

								<li>
									<div
										css={[
											css`
												&:hover {
													p {
														text-decoration: underline;
													}
												}
											`,
											tw`block mr-8 md:mr-6`,
										]}
									>
										<EmailShareButton
											url={window?.location?.href}
										>
											<T.Body
												font="2"
												styles={[
													tw`pt-3 px-1 pb-3 text-strong-amber`,
												]}
											>
												Email
											</T.Body>
										</EmailShareButton>
									</div>
								</li>
							</ul>
						</Grid>
					)}
				</div>
			</Layout>

			<Footer />
		</>
	)
}

export default ArticlePage