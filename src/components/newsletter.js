import React from "react"
import tw, { css } from "twin.macro"

const NewsLetter = () => {
	return (
		<>
			<form
				css={[
					tw`transition-opacity ease-header-in duration-300 opacity-100 w-full relative block mt-2 lg:mt-8 py-1 border-secondary border-b`,
				]}
				onSubmit={e => e.preventDefault()}
			>
				<input
					placeholder="Email"
					required
					type="email"
					css={[
						tw`bg-transparent font-theme tracking-normal font-light w-full relative block py-1 focus:outline-none`,
						css`
							font-size: 16px;
							line-height: 22px;
						`,
					]}
				/>
				<div css={[tw`h-full absolute inset-y-0 right-0`]}>
					<button
						type="submit"
						css={[
							tw`w-full h-full relative block text-portfolio font-light focus:outline-none`,
						]}
					>
						Submit
					</button>
				</div>
			</form>
		</>
	)
}

export default NewsLetter;