import React, { useState } from "react"
import tw, { theme, css } from "twin.macro"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import JSONData from "../content/team.json"

const TeamPage = () => {

	const [activeTeamMember, setActiveTeamMember] = useState(null)

	return (
		<Layout styles={[tw`pt-32 lg:pt-64`]}>
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
													tw`w-full md:h-full md:absolute md:top-0 md:right-0 md:bottom-0 md:left-0`,
												]}
											>
												<Img
													css={[
														tw`w-full h-full relative block object-cover`,
													]}
													fluid={
														member.image.asset.fluid
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
														member.backgroundColor
													]};
												`,
												tw`w-full h-full absolute top-0 right-0 bottom-0 left-0 z-20 pointer-events-none`,
											]}
										></div>

										<article
											css={[
												css`
													background: ${theme`backgroundColor`[member.backgroundColor]};
													color: ${theme`colors`[member.fontColor]}
												`,
												tw`w-full h-full relative z-10 flex flex-col items-center justify-center px-8`,
											]}
										>
											<h2 css={[
												tw`font-theme font-light`,
												css`
													font-size: 34px;
													line-hight: 34px;
													letter-spacing: -0.01em
												`
											]}>{member.name}</h2>

											<p css={[
												tw`font-theme text-p-1 leading-p-1 font-light`,
												css`letter-spacing:0.01em;`
											]}>{member.title}</p>
										</article>
									</div>
								</div>
							</li>
						)}
				)}
				</ul>
			</section>
		</Layout>
	)
}

export default TeamPage
