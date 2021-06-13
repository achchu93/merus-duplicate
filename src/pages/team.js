import * as React from "react"
import tw, { theme, css } from "twin.macro"

import Layout from "../components/layout"
import Seo from "../components/seo"

const TeamPage = () => {
	return (
		<Layout styles={[tw`pt-32 lg:pt-64`]}>
			<Seo title="Team" />
			<section
				css={[
					css`
						backface-visibility: hidden;
						transform: translate3d(0px, 1rem, 0px);
					`,
					tw`opacity-0 animate-appear`,
				]}
			>
				<ul
					css={[
						tw`grid grid-cols-12 gap-x-1 relative px-2 lg:gap-x-4 lg:px-10`,
					]}
				></ul>
			</section>
		</Layout>
	)
}

export default TeamPage
