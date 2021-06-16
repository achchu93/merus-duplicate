/* eslint-disable react/prop-types */

import React, { useContext, useState } from "react"
import tw, { css } from "twin.macro"
import { DocumentContext } from "~context/DocumentContext"
import Footer from "~components/Footer"
import Layout from "~components/Layout"
import Seo from "~components/SEO"
import Grid from "~components/styles/Grid"
import * as A from "~components/styles/Animations"
import * as T from "~components/styles/Typography"
import ScreenHeight from "~components/ScreenHeight"
import { useTimeout } from "~utils/hooks"

const IndexPage = ({ data, location }) => {
	const { isDesktop } = useContext(DocumentContext)

	const [rendered, setRendered] = useState(false)

	//

	const cms = {
		title: "Home",
		intro: "We empower ambitious teams building tomorrow’s industry-defining platforms",
		seoDescription: null,
		seoKeywords: "",
	}

	useTimeout(() => {
		setRendered(true)
	}, 1500)

	//

	return (
		<>
			<Seo
				title={cms?.title || ``}
				description={cms?.seoDescription || ``}
				customKeywords={cms?.seoKeywords || ``}
				path={location.pathname}
			/>

			<Layout
				styles={[
					css`
						min-height: 99vh;
					`,
					tw`bg-off-white`,
				]}
			>
				<ScreenHeight>
					<Grid styles={[tw`h-full`]}>
						<div
							css={[
								css`
									${A.Keyframes(
										`appearDown`,
										`1s ${A.EASING_CUBIC} forwards`,
										`0.75s`
									)}

									padding-left: ${isDesktop()
										? `3vw`
										: `0.25rem`};
								`,
								tw`col-span-6 md:col-span-3 col-start-7 md:col-start-9 flex items-end text-grey`,
							]}
						>
							<T.Body font="2">{cms.intro}</T.Body>
						</div>

						<div
							css={[
								css`
									transition: opacity 1s ${A.EASING_CUBIC},
										transform 1s ${A.EASING_CUBIC};

									opacity: ${rendered ? `1` : `0`};
									transform: translate3d(
										0,
										${rendered ? `0` : `2vw`},
										0
									);
								`,
								tw`col-span-12 h-full flex items-end pb-6 md:pb-12`,
							]}
						>
							<h1
								css={[
									tw`w-full relative block flex items-center justify-center text-center`,
								]}
							>
								<span
									css={[
										css`
											font-size: 18.5vw !important;
											line-height: 1 !important;
										`,
										tw`block text-h1 text-blue-black`,
									]}
								>
									Merus
								</span>
								<span
									css={[
										css`
											font-size: 18.5vw !important;
											font-weight: 200;
											line-height: 1 !important;
										`,
										tw`block text-h1 text-blue-black`,
									]}
								>
									Capital
								</span>
							</h1>
						</div>
					</Grid>
				</ScreenHeight>

				{rendered && <Footer />}
			</Layout>
		</>
	)
}

export default IndexPage