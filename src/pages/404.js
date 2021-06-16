import React, { useContext } from "react"
import tw, { css, theme } from "twin.macro"
import * as A from "~components/styles/Animations"
import * as T from "~components/styles/Typography"
import { DocumentContext } from "~context/DocumentContext"
import Grid from "~components/styles/Grid"
import Footer from "~components/Footer"
import Go from "~components/Go"
import Layout from "~components/Layout"

const NotFoundPage = () => {
	const { isDesktop } = useContext(DocumentContext)

	return (
		<>
			<Layout>
				<section
					css={[
						css`
							@media screen and (min-width: 1025px) {
								height: calc(100vh - 120px);
							}
						`,
						tw`w-full relative pt-48 md:pt-72 pb-64 md:pb-0 bg-off-white`,
					]}
				>
					<Grid node="article" styles={[tw`grid text-grey`]}>
						<header
							css={[
								css`
									${A.Keyframes(
										`appearDown`,
										`1s ${A.EASING_CUBIC} forwards`,
										`0.5s`
									)}
								`,
								tw`col-span-12 md:col-span-4 md:col-start-1 relative`,
							]}
						>
							<T.Heading font={isDesktop ? `2` : `1`} level="1">
								This page does not exist.
							</T.Heading>
						</header>

						<div
							css={[
								css`
									${A.Keyframes(
										`appearDown`,
										`1s ${A.EASING_CUBIC} forwards`,
										`0.66s`
									)}

									a {
										color: ${theme`colors.strong-amber`};
									}
								`,
								tw`col-span-12 md:col-span-4 md:col-start-1 relative mt-12 md:mt-20 md:pr-24`,
							]}
						>
							<T.Body font="2">
								<span>Please go to our </span>
								<Go to="/">home page</Go>
								<span>
									{` `}
									or click on the menu icon on the top left to
									navigate elsewhere.
								</span>
							</T.Body>
						</div>
					</Grid>
				</section>
			</Layout>

			<Footer />
		</>
	)
}

export default NotFoundPage
