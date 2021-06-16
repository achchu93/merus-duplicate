/* eslint-disable react/prop-types */

// import React, { useContext, useEffect } from "react";
import React, { useContext, useState } from "react"
import tw, { css, theme } from "twin.macro"
import * as A from "~components/styles/Animations"
import Grid from "~components/styles/Grid"
import * as Icon from "~components/svg/Icons"
import * as T from "~components/styles/Typography"
import Go from "~components/Go"
import Footer from "~components/Footer"
import Layout from "~components/Layout"
import SEO from "~components/SEO"
import McxData from "../content/mcx.json"

const MCxPage = ({ data, location }) => {
	// const { isDesktop } = useContext(DocumentContext);

	const cms = McxData.sanityMcx

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
						min-height: 100vh;
					`,
					tw`pt-32 md:pt-64 bg-off-white`,
				]}
			>
				{cms?.intro && (
					<Grid>
						<div
							css={[
								css`
									${A.Keyframes(
										`appearRight`,
										`1s ${A.EASING_CUBIC} forwards`,
										`0.5s`
									)}
								`,
								tw`col-span-12 md:col-span-7 mb-24 md:mb-48 text-grey whitespace-pre-wrap`,
							]}
						>
							<T.Heading font="3">{cms.intro}</T.Heading>

							{cms?.loginTarget && (
								<T.Heading
									font="3"
									styles={[
										tw`mt-16 md:mt-24 flex items-center`,
									]}
								>
									<Go to={cms.loginTarget}>Login ↗</Go>
								</T.Heading>
							)}
						</div>
					</Grid>
				)}

				{cms?.body && (
					<Grid>
						<div
							css={[
								css`
									${A.Keyframes(
										`appearLeft`,
										`1s ${A.EASING_CUBIC} forwards`,
										`0.75s`
									)}
								`,
								tw`col-span-12 md:col-span-5 md:col-start-7 mb-24 md:mb-48 text-grey whitespace-pre-wrap`,
							]}
						>
							<T.Body>{cms.body}</T.Body>
						</div>
					</Grid>
				)}

				<Footer />
			</Layout>
		</>
	)
}

export default MCxPage
