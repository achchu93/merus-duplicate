import * as React from "react"
import tw, { theme, css } from "twin.macro"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage = () => (
	<Layout>
		<Seo title="Home" />
		<section css={[tw`h-screen`]}>
			<div
				css={[
					tw`grid grid-cols-12 relative h-full gap-x-1 px-2 lg:gap-x-4 lg:px-10`,
				]}
			>
				<div
					css={[
						css`
							backface-visibility: hidden;
							transform: translate3d(0, -1rem, 0);
							animation-delay: 0.75s;
							padding-left: 3vw;
						`,
						tw`opacity-0 col-span-6 lg:col-span-3 col-start-7 lg:col-start-9 flex items-end text-secondary animate-appearDown`,
					]}
				>
					<p css={[tw`font-theme text-p-1 font-light leading-p-1`]}>
						We empower ambitious teams building tomorrow’s
						industry-defining platforms
					</p>
				</div>
				<div
					css={[
						tw`opacity-0 col-span-12 h-full flex items-end pb-6 lg:pb-12 animate-appearUp`,
						css`
							transition: opacity 1s
									cubic-bezier(0.215, 0.61, 0.355, 1) 0s,
								transform 1s cubic-bezier(0.215, 0.61, 0.355, 1)
									0s;
							animation-delay: 1s;
						`,
					]}
				>
					<h1
						css={[
							tw`w-full relative flex items-center justify-center text-center`,
						]}
					>
						<span
							css={[
								css`
									font-size: 18.5vw;
									letter-spacing: -0.01em;
								`,
								tw`block leading-none text-home`,
							]}
						>
							Merus
						</span>
						<span
							css={[
								css`
									font-size: 18.5vw;
									letter-spacing: -0.01em;
								`,
								tw`block leading-none text-home font-extralight`,
							]}
						>
							Capital
						</span>
					</h1>
				</div>
			</div>
		</section>
	</Layout>
)

export default IndexPage
