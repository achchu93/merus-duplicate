/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */

import React, { useContext, useEffect, useState } from "react"
import Img from "gatsby-image"
import tw, { css, theme } from "twin.macro"
import { useQueryParam, StringParam } from "use-query-params"
import { StaticImage } from "gatsby-plugin-image"
import { DocumentContext } from "~context/DocumentContext"
import Grid from "~components/styles/Grid"
import * as A from "~components/styles/Animations"
import * as Icon from "~components/svg/Icons"
import * as T from "~components/styles/Typography"
import Footer from "~components/Footer"
import Layout from "~components/Layout"
import Seo from "~components/SEO"
import { useKeyPress } from "~utils/hooks"
import TeamData from "../content/team.json"

const TeamPage = ({ data, location }) => {
	const { isDesktop } = useContext(DocumentContext)

	const [activeTeamMember, setActiveTeamMember] = useState(null)
	const [overlayed, setOverlayed] = useState(false)
	const [overlayStyles, setOverlayStyles] = useState({
		background: theme`colors.strong-amber`,
		color: theme`colors.off-white`,
	})

	const [member] = useQueryParam(`member`, StringParam)

	//

	const cms = TeamData.sanityTeam

	//

	const teamMembers = []

	if (cms?.teamMembers?.[0]) {
		cms.teamMembers.forEach(teamMember => {
			teamMembers.push(teamMember)
		})
	}

	//

	const escKeyPressed = useKeyPress(`Escape`)

	useEffect(() => {
		if (escKeyPressed) {
			setActiveTeamMember(false)
		}
	}, [escKeyPressed])

	useEffect(() => {
		if (member) {
			teamMembers.forEach(teamMember => {
				if (teamMember?.name === member) {
					setTimeout(() => {
						setActiveTeamMember(teamMember)
					}, 1000)
				}
			})
		}
	}, [member])

	useEffect(() => {
		if (activeTeamMember) {
			setOverlayed(true)
			setOverlayStyles({
				background: theme`colors`[activeTeamMember.backgroundColor],
				color: theme`colors`[activeTeamMember.fontColor],
			})
		} else {
			setOverlayed(false)
		}
	}, [activeTeamMember])

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

	//

	return (
		<>
			<Seo
				title={cms?.title || ``}
				description={cms?.seoDescription || ``}
				customKeywords={cms?.seoKeywords || ``}
				path={location.pathname}
			/>

			<div
				css={[
					css`
						transition: opacity 0.5s ${A.EASING_CUBIC},
							transform 0.5s ${A.EASING_CUBIC};

						opacity: ${overlayed ? `1` : `0`};
						pointer-events: ${overlayed ? `auto` : `none`};
						transform: scale(${overlayed ? `1.025` : `1`});

						background: ${overlayStyles.background};
						color: ${overlayStyles.color};
					`,
					tw`w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50 overflow-y-scroll px-4 md:px-0`,
				]}
			>
				<Grid node="section">
					<div
						css={[
							css``,
							tw`col-span-12 md:col-span-8 md:col-start-3 relative mt-16 md:mt-48 md:mb-16`,
						]}
					>
						<div
							css={[
								css``,
								tw`w-8 h-8 absolute top-0 right-0 -mt-10 md:-mt-8 -mr-2 md:-mr-8`,
							]}
						>
							<button
								type="button"
								onClick={() => setActiveTeamMember(null)}
								css={[css``, tw`w-8 h-8 relative block`]}
							>
								<Icon.Cross
									color={overlayStyles.color}
									styles={[css``, tw`w-8 h-8`]}
								/>
							</button>
						</div>

						{activeTeamMember?.image && (
							<div
								css={[
									css`
										padding-bottom: 70%;
									`,
									tw`w-full relative`,
								]}
							>
								<figure tw="w-full h-full absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
									<Img
										css={[
											css``,
											tw`w-full h-full relative block object-cover`,
										]}
										fluid={
											activeTeamMember.image.asset.fluid
										}
										alt={activeTeamMember.name}
									/>
								</figure>
							</div>
						)}
					</div>

					<header
						css={[
							tw`col-span-12 md:col-span-3 md:col-start-3 mt-4 md:mt-0`,
						]}
					>
						<T.Heading font="3" level="2">
							{activeTeamMember?.name || ``}
						</T.Heading>

						<T.Heading font="b1" styles={[tw`mt-2 mb-8 md:mb-0`]}>
							{activeTeamMember?.title || ``}
						</T.Heading>
					</header>

					<div
						css={[
							css`
								font-family: ${theme`fontFamily`.body.join()};
								font-weight: 300;
							`,
							tw`col-span-12 md:col-span-5 mb-24 md:mb-64 text-b1 whitespace-pre-wrap`,
						]}
						dangerouslySetInnerHTML={{
							__html: activeTeamMember?.profile || ``,
						}}
					/>
				</Grid>
			</div>

			{/* // */}

			<Layout
				styles={[
					css`
						overflow: ${overlayed ? `hidden` : `auto`};
					`,
					tw`pt-32 md:pt-64 bg-off-white`,
				]}
			>
				{cms?.bannerImage?.asset?.fluid && (
					<Grid>
						<div
							css={[
								css`
									${A.Keyframes(
										`appearRight`,
										`0.75s ${A.EASING_CUBIC} forwards`,
										`0.8s`
									)}

									padding-bottom: 100%;

									@media screen and (min-width: 1024px) {
										padding-bottom: 0;
									}
								`,
								tw`col-span-12 relative pt-12 md:pt-64`,
							]}
						>
							{(isDesktop() && (
								<figure css={[tw`w-full relative block`]}>
									<Img
										css={[tw`w-full relative block`]}
										fluid={cms.bannerImage.asset.fluid}
										alt="Team members posing"
									/>
								</figure>
							)) || (
								<figure
									css={[
										tw`w-full h-full absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center`,
									]}
								>
									<Img
										css={[
											tw`w-full h-full relative object-cover`,
										]}
										fluid={cms.bannerImage.asset.fluid}
										alt="Team members posing"
									/>
								</figure>
							)}
						</div>
					</Grid>
				)}

				<section
					css={[
						css`
							${A.Keyframes(
								`appear`,
								`1s ${A.EASING_CUBIC} forwards`,
								`0.25s`
							)}
						`,
					]}
				>
					{teamMembers?.[0] && (
						<Grid node="ul">
							{teamMembers.map((teamMember, teamMemberIndex) => (
								<li
									key={teamMember.name
										.toLowerCase()
										.replace(/ /g, `-`)}
									css={[
										css`
											&:hover {
												@media screen and (min-width: 1024px) {
													article {
														transform: scale(1);
														opacity: 1;
													}

													figure {
														transform: scale(0.975);
													}
												}
											}

											figure {
												transition: transform 0.3s
													${A.EASING_CUBIC};

												transform: scale(1);
											}

											article {
												transition: opacity 0.3s
														${A.EASING_CUBIC},
													transform 0.3s
														${A.EASING_CUBIC};

												opacity: 0;
												transform: scale(1.05);
											}
										`,
										tw`col-span-6 md:col-span-4 relative block overflow-hidden mb-8 md:mb-5`,
									]}
								>
									<div
										css={[
											css`
												@media screen and (min-width: 1025px) {
													padding-bottom: 83.333%;
												}
											`,
											tw`relative`,
										]}
									>
										<button
											type="button"
											onClick={() =>
												setActiveTeamMember(teamMember)
											}
											css={[
												tw`w-full md:h-full md:absolute md:top-0 md:right-0 md:bottom-0 md:left-0`,
											]}
										>
											{(teamMember?.image?.asset
												?.fluid && (
												<figure
													css={[
														tw`w-full md:h-full md:absolute md:top-0 md:right-0 md:bottom-0 md:left-0`,
													]}
												>
													<Img
														css={[
															tw`w-full h-full relative block object-cover`,
														]}
														fluid={
															teamMember.image
																.asset.fluid
														}
														alt={teamMember.name}
													/>
												</figure>
											)) || (
												<div
													css={[
														tw`w-full h-full absolute top-0 right-0 bottom-0 left-0 border`,
													]}
												/>
											)}

											<div
												css={[
													css`
														${A.Keyframes(
															`disappear`,
															`1s ${A.EASING_CUBIC} forwards`,
															`1s`
														)}
														animation-delay: ${0.75 +
														teamMemberIndex *
															0.125}s;

														background: ${theme`colors`[
															teamMember
																.backgroundColor
														]};
													`,
													tw`w-full h-full absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none`,
												]}
											/>

											{isDesktop() && (
												<article
													css={[
														css`
															background: ${theme`colors`[
																teamMember
																	.backgroundColor
															]};
															color: ${theme`colors`[
																teamMember
																	.fontColor
															]};
														`,
														tw`w-full h-full relative z-10 flex flex-col items-center justify-center px-8`,
													]}
												>
													<T.Heading font="b1">
														{teamMember.name}
													</T.Heading>

													<T.Body
														font="2"
														styles={[tw`mt-2`]}
													>
														{teamMember.title}
													</T.Body>
												</article>
											)}
										</button>

										{!isDesktop() && (
											<>
												<T.Body
													font="2"
													styles={[tw`mt-1`]}
												>
													{teamMember.name}
												</T.Body>
												<T.Caption
													styles={[tw`block`]}
													weight={300}
												>
													{teamMember.title}
												</T.Caption>
											</>
										)}
									</div>
								</li>
							))}
						</Grid>
					)}
				</section>

				<section css={[tw`pt-20 md:pt-48 pb-32 md:pb-48`]}>
					{titleJSX}
				</section>

				{cms?.body && (
					<Grid>
						<div
							css={[
								tw`col-span-12 md:col-span-5 md:col-start-7 mb-32 md:mb-48 whitespace-pre-wrap text-grey`,
							]}
						>
							<T.Body font="2">{cms.body}</T.Body>
						</div>
					</Grid>
				)}

				<section
					css={[
						tw`w-full relative pt-4 md:pt-6 pb-4 md:pb-6 bg-grey text-off-white`,
					]}
				>
					<Grid>
						<figure
							css={[
								tw`col-span-6 md:col-span-4 lg:col-span-3 h-full relative flex items-center`,
							]}
						>
							<StaticImage
								css={[tw`w-full relative block`]}
								src="../images/peter-hsing.jpg"
								alt="Peter Hsing"
								layout={"fullWidth"}
							/>
						</figure>

						<div
							css={[
								tw`col-span-6 md:col-span-8 lg:col-span-9 relative pl-3 md:pl-12 flex flex-col justify-center`,
							]}
						>
							{(isDesktop() && (
								<T.Heading font="3">Peter Hsing</T.Heading>
							)) || <T.Body font="1">Peter Hsing</T.Body>}

							{(isDesktop() && (
								<T.Body
									font="2"
									styles={[tw`mt-3 md:mt-6 mb-3 md:mb-8`]}
								>
									1968-2020
								</T.Body>
							)) || (
								<T.Caption
									styles={[tw`mt-3 md:mt-6 mb-3 md:mb-8`]}
								>
									1968-2020
								</T.Caption>
							)}

							{(isDesktop() && (
								<T.Body font="2">
									Friend, colleague, and fierce
									<br />
									advocate for founders
								</T.Body>
							)) || (
								<T.Caption>
									Friend, colleague, and fierce advocate for
									founders
								</T.Caption>
							)}
						</div>
					</Grid>
				</section>

				<Footer />
			</Layout>
		</>
	)
}

export default TeamPage
