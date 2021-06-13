import React from "react"
import tw, { css } from "twin.macro"

import NewsLetter from "./newsletter";

const Footer = ({}) => {

	return (
		<footer
			css={[
				tw`relative pt-12 pb-16 lg:pt-8 lg:pb-6 bg-footer text-secondary`,
			]}
		>
			<div
				css={[
					tw`grid grid-cols-12 gap-x-1 relative px-2 lg:px-9 lg:gap-x-4`,
				]}
			>
				<div css={[tw`col-span-12 mb-4 lg:col-span-2 lg:mb-0`]}>
					<p css={[tw`font-extralight`]}>
						<span>©</span>
						<span css={[tw`font-medium`]}>Merus</span>
						<span>Capital</span>
					</p>
				</div>
				<div css={[tw`col-span-12 mb-4 lg:col-span-2 lg:mb-0`]}>
					<p css={[tw`font-extralight`]}>
						<a href="https://twitter.com" target="_blank">
							Twitter
						</a>
					</p>
					<p css={[tw`font-extralight`]}>
						<a href="https://twitter.com" target="_blank">
							LinkedIn
						</a>
					</p>
					<p css={[tw`font-extralight`, css`margin-top:12px;`]}>
						<a href="mailto:info@meruscap.com" target="_blank">
							info@meruscap.com
						</a>
					</p>
				</div>
				<div css={[tw`col-span-12 mb-4 lg:col-span-3 lg:mb-0`]}>
					<p css={[tw`font-extralight`]}>
						<a href="https://twitter.com" target="_blank" css={[tw`flex items-center`]}>
							<span>Investor Login</span>
							<svg viewBox="0 0 14 14" fill="none" css={[tw`w-3 relative ml-1`]}>
								<path d="M6.72599 0.378418V1.88338H10.7076L0.661621 12.0541L1.74719 13.1188L11.7931 2.94641V6.84361H13.33V0.378418H6.72599Z" fill="#707385"></path>
							</svg>
						</a>
					</p>
				</div>
				<div
					css={[
						tw`col-span-12 mb-4 mt-8 block relative lg:col-span-4 lg:mb-0 lg:mt-0`,
					]}
				>
					<p css={[tw`font-extralight`]}>
						Subscribe to our newsletter:
					</p>
					<NewsLetter />
				</div>
			</div>
		</footer>
	)

}

Footer.propTypes = {}

Footer.defaultProps = {}

export default Footer