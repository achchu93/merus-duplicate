import React, { useContext, useEffect, useState } from "react"
import tw, { theme, css } from "twin.macro"
import Img from "gatsby-image"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import JSONData from "../content/team.json"
import { AppContext } from "../context/app-context"
import { Cross } from "../components/icons"

const TeamPage = () => {
	// console.log(theme());

	const [activeTeamMember, setActiveTeamMember] = useState(null)
	const {screen} = useContext(AppContext)
	const isDesktop = () => !["xs", "sm", "md"].includes( screen )
	const [overlayed, setOverlayed] = useState(false)
	const [overlayStyles, setOverlayStyles] = useState({
		background: theme`backgroundColor.portfolio`,
		color: theme`colors.primaryGrey`,
	})

	const title = `A clarity of purpose.

We founded Merus in 2008 in order to bring a unique ethos to venture investing.`

	const body = `We believe in analytical rigor, deep integrity and radical transparency. All tied together by a strictly non-hierarchical approach to getting the job done.

It’s this ‘peer-to-peer’ ethos that not only informs how we manage our firm, but also how we partner with founders.

Merus means ‘pure’ in Latin. We believe this undiluted commitment to true partnership allows us to best serve our founding teams.`

	useEffect(() => {

		if( activeTeamMember ){
			setOverlayed(true)
			setOverlayStyles({
				background: theme`backgroundColor`[activeTeamMember.backgroundColor],
				color: theme`colors`[activeTeamMember.fontColor]
			})
		}else{
			setOverlayed(false)
		}
	}, [activeTeamMember])

	return (
		<>
			<div
				css={[
					css`
						transition: opacity 0.5s
								${theme`transitionTimingFunction.header-in`},
							transform 0.5s
								${theme`transitionTimingFunction.header-in`};
						opacity: ${overlayed ? `1` : `0`};
						pointer-events: ${overlayed ? `auto` : `none`};
						transform: scale(${overlayed ? `1.025` : `1`});
						background: ${overlayStyles.background};
						color: ${overlayStyles.color};
					`,
					tw`w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-50 overflow-y-scroll px-4 lg:px-0`,
				]}
			>
				<section
					css={[
						tw`grid grid-cols-12 gap-x-1 relative px-2 lg:gap-x-4 lg:px-10`,
					]}
				>
					<div
						css={[
							tw`col-span-12 lg:col-span-8 lg:col-start-3 relative mt-16 lg:mt-48 lg:mb-16`,
						]}
					>
						<div
							css={[
								tw`w-8 h-8 absolute top-0 right-0 -mt-10 md:-mt-8 -mr-2 md:-mr-8`,
							]}
						>
							<button
								type="button"
								onClick={() => setActiveTeamMember(null)}
								css={[
									tw`w-8 h-8 relative block focus:outline-none`,
								]}
							>
								<Cross
									color={
										activeTeamMember
											? theme`colors`[
													activeTeamMember.fontColor
											  ]
											: theme`colors.primaryGrey`
									}
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
						<h2
							css={[
								tw`font-theme text-h-1 font-light leading-h-1`,
								css`
									letter-spacing: -0.01em;
								`,
							]}
						>
							{activeTeamMember?.name || ``}
						</h2>

						<h2
							css={[
								tw`mt-2 mb-8 lg:mb-0 font-theme text-h-2 font-light leading-h-2`,
								css`
									letter-spacing: -0.01em;
								`,
							]}
						>
							{activeTeamMember?.title || ``}
						</h2>
					</header>

					<div
						css={[
							tw`col-span-12 md:col-span-5 mb-24 md:mb-64 text-p-1 whitespace-pre-wrap font-theme font-light`,
						]}
						dangerouslySetInnerHTML={{
							__html: activeTeamMember?.profile || ``,
						}}
					/>
				</section>
			</div>

			<Layout
				styles={[
					tw`pt-32 lg:pt-64`,
					activeTeamMember && tw`overflow-hidden z-10`,
				]}
			>
				<Seo title="Team" />

				<section
					css={[
						css`
							backface-visibility: hidden;
							transform: translate3d(0px, 1rem, 0px);
							animation-delay: 0.25s;
						`,
						tw`opacity-0 animate-appear`,
					]}
				>
					<ul
						css={[
							tw`grid grid-cols-12 gap-x-1 relative px-2 lg:gap-x-4 lg:px-10`,
						]}
					>
						{JSONData.teamMembers.map((member, index) => {
							return (
								<li
									key={member.name
										.toLowerCase()
										.replace(/ /g, `-`)}
									css={[
										tw`col-span-6 lg:col-span-4 relative block overflow-hidden mb-8 lg:mb-5`,
										css`
											&:hover {
												@media (min-width: ${theme`screens.lg`}) {
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
													${theme`transitionTimingFunction.header-in`};
												transform: scale(1);
											}

											article {
												transition: opacity 0.3s
														${theme`transitionTimingFunction.header-in`},
													transform 0.3s
														${theme`transitionTimingFunction.header-in`};

												opacity: 0;
												transform: scale(1.05);
											}
										`,
									]}
								>
									<div
										css={[
											css`
												@media screen and (min-width: ${theme`screens.lg`}) {
													padding-bottom: 83.333%;
												}
											`,
											tw`relative`,
										]}
									>
										<div
											onClick={() =>
												setActiveTeamMember(member)
											}
											css={[
												tw`w-full lg:h-full lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:left-0 cursor-pointer text-center`,
											]}
										>
											{(member?.image?.asset?.fluid && (
												<figure
													css={[
														tw`w-full lg:h-full lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:left-0`,
													]}
												>
													<Img
														css={[
															tw`w-full h-full relative block object-cover`,
														]}
														fluid={
															member.image.asset
																.fluid
														}
														alt={member.name}
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
														backface-visibility: hidden;
														opacity: 1;
														animation: disappear 1s
															cubic-bezier(
																0.215,
																0.61,
																0.355,
																1
															)
															forwards;
														animation-delay: ${0.75 +
														index * 0.125}s;
														background: ${theme`backgroundColor`[
															member
																.backgroundColor
														]};
													`,
													tw`w-full h-full absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none`,
												]}
											></div>

											{isDesktop() && (
												<article
													css={[
														css`
															background: ${theme`backgroundColor`[
																member
																	.backgroundColor
															]};
															color: ${theme`colors`[
																member.fontColor
															]};
														`,
														tw`w-full h-full relative z-10 flex flex-col items-center justify-center px-8`,
													]}
												>
													<h2
														css={[
															tw`font-theme font-light`,
															css`
																font-size: 34px;
																line-height: 34px;
																letter-spacing: -0.01em;
															`,
														]}
													>
														{member.name}
													</h2>

													<p
														css={[
															tw`font-theme text-p-1 leading-p-1 font-light`,
															css`
																letter-spacing: 0.01em;
															`,
														]}
													>
														{member.title}
													</p>
												</article>
											)}
										</div>
										{!isDesktop() && (
											<>
												<p
													css={[
														tw`mt-1 font-theme text-p-2 leading-p-2 font-light tracking-normal`,
													]}
												>
													{member.name}
												</p>
												<span
													css={[
														tw`block font-theme text-p-3 leading-p-3 font-light tracking-normal`,
													]}
												>
													{member.title}
												</span>
											</>
										)}
									</div>
								</li>
							)
						})}
					</ul>
				</section>

				<section css={[tw`pt-20 pb-32 lg:py-48`]}>
					<div
						css={[
							tw`grid grid-cols-12 gap-x-1 relative h-full px-2 lg:gap-x-4 lg:px-10`,
						]}
					>
						<div
							css={[
								css`
									backface-visibility: hidden;
									transform: translate3d(-1rem, 0, 0);
									animation: appearRight 0.75s
										cubic-bezier(0.215, 0.61, 0.355, 1)
										forwards;
									animation-delay: 0.8s;
								`,
								tw`h-full flex items-center opacity-0 col-span-12 lg:col-span-6`,
							]}
						>
							<h2
								css={[
									css`
										letter-spacing: -0.01em;
									`,
									tw`whitespace-pre-wrap text-secondary font-theme text-h-1 font-light leading-h-1`,
								]}
							>
								{title}
							</h2>
						</div>
					</div>
				</section>

				<div
					css={[
						tw`grid grid-cols-12 gap-x-1 px-2 lg:gap-x-4 lg:px-10`,
					]}
				>
					<div
						css={[
							tw`col-span-12 whitespace-pre-wrap mb-32 lg:col-span-5 lg:mb-48 text-secondary lg:col-start-7`,
						]}
					>
						<p
							css={[
								css`
									letter-spacing: 0.01em;
								`,
								tw`font-theme text-p-1 font-light leading-p-1`,
							]}
						>
							{body}
						</p>
					</div>
				</div>

				<section
					css={[
						tw`w-full relative py-4 bg-secondary text-primaryGrey lg:py-6`,
					]}
				>
					<div
						css={[
							tw`grid grid-cols-12 gap-x-1 px-2 lg:gap-x-4 lg:px-10`,
						]}
					>
						<figure
							css={[
								tw`col-span-6 lg:col-span-4 xl:col-span-3 h-full relative flex items-center`,
							]}
						>
							<StaticImage
								src="../images/peter-hsing.jpg"
								css={[tw`w-full relative block`]}
								alt="Peter Hsing"
							/>
						</figure>
						<div
							css={[
								tw`col-span-6 relative pl-3 flex flex-col justify-center lg:col-span-8 lg:pl-12 xl:col-span-9`,
							]}
						>
							<h2
								css={[
									css`
										letter-spacing: -0.01em;
									`,
									tw`font-theme text-h-1 font-light leading-h-1`,
								]}
							>
								Peter Hsing
							</h2>
							<p
								css={[
									css`
										letter-spacing: 0.01em;
									`,
									tw`my-3 font-theme text-p-1 font-light leading-p-1 lg:my-6`,
								]}
							>
								1968-2020
							</p>
							<p
								css={[
									css`
										letter-spacing: 0.01em;
									`,
									tw`font-theme text-p-1 font-light leading-p-1`,
								]}
							>
								Friend, colleague, and fierce
								<br />
								advocate for founders
							</p>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}

export default TeamPage
