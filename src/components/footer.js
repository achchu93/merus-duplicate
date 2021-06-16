/* eslint-disable no-console */
import React, { useRef, useState } from "react"
import tw, { css, theme } from "twin.macro"
import Grid from "~components/styles/Grid"
import * as A from "~components/styles/Animations"
import * as T from "~components/styles/Typography"
import * as Icon from "~components/svg/Icons"
import Go from "~components/Go"

const Footer = () => {
	const submitRef = useRef()

	const [email, setEmail] = useState(null)
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)

	//

	const submitProxy = () => {
		if (submitRef?.current) {
			submitRef.current.click()
		}
	}

	const onSubmit = e => {
		e.preventDefault()

		if (!email || email === `` || submitting || submitted) {
			return false
		}

		if (
			typeof window !== `undefined` &&
			window.location.href.includes(`localhost:8000`)
		) {
			setSubmitting(true)

			setTimeout(() => {
				setSubmitting(false)
				setSubmitted(true)
			}, 3000)

			return false
		}

		setSubmitting(true)

		const mailchimpData = {
			email,
		}

		fetch(`${process.env.GATSBY_NETLIFY_FUNCTIONS}/mailchimp`, {
			body: JSON.stringify(mailchimpData),
			method: `POST`,
		})
			.then(() => {
				console.log(`Mailchimp Complete`)

				setSubmitting(false)
				setSubmitted(true)
			})
			.catch(error => {
				console.error(error)
			})

		return false
	}

	return (
		<footer tw="relative pt-12 md:pt-8 pb-16 md:pb-6 bg-light-grey text-grey">
			<Grid node="nav">
				<div tw="col-span-12 md:col-span-2 mb-4 md:mb-0">
					<T.Body
						font="3"
						styles={[
							css`
								font-weight: 200;
							`,
						]}
					>
						<span>©{` `}</span>
						<span
							css={[
								css`
									font-weight: 500;
								`,
							]}
						>
							Merus
						</span>
						<span>Capital</span>
					</T.Body>
				</div>

				<div tw="col-span-12 md:col-span-2 mb-4 md:mb-0">
					<T.Body
						font="3"
						styles={[
							css`
								font-weight: 200;

								&:hover {
									text-decoration: underline;
								}
							`,
						]}
					>
						<Go to="https://twitter.com/meruscapital" newTab>
							Twitter
						</Go>
					</T.Body>

					<T.Body
						font="3"
						styles={[
							css`
								font-weight: 200;

								&:hover {
									text-decoration: underline;
								}
							`,
						]}
					>
						<Go
							to="https://www.linkedin.com/company/merus-capital"
							newTab
						>
							LinkedIn
						</Go>
					</T.Body>

					<T.Body
						font="3"
						styles={[
							css`
								font-weight: 200;
								margin-top: 12px;

								&:hover {
									text-decoration: underline;
								}
							`,
						]}
					>
						<a href="mailto:info@meruscap.com">info@meruscap.com</a>
					</T.Body>
				</div>

				<div tw="col-span-12 md:col-span-3 mb-4 md:mb-0">
					<T.Body
						font="3"
						styles={[
							css`
								font-weight: 200;

								&:hover {
									text-decoration: underline;
								}
							`,
						]}
					>
						<Go
							to="https://services.intralinks.com/login/"
							newTab
							inject={{ tw: tw`flex items-center` }}
						>
							<span>Investor Login</span>
							<Icon.ArrowUp
								styles={[tw`w-3 relative block ml-1`]}
								color={theme`colors.grey`}
							/>
						</Go>
					</T.Body>
				</div>

				<div
					css={[
						tw`col-span-12 md:col-span-4 relative block mt-8 md:mt-0 mb-4 md:mb-0 `,
					]}
				>
					<T.Body
						font="3"
						styles={[
							css`
								font-weight: 200;
							`,
						]}
					>
						Subscribe to our newsletter:
					</T.Body>

					<form
						onSubmit={onSubmit}
						css={[
							css`
								transition: opacity 0.3s ${A.EASING_CUBIC};
								opacity: ${submitting || submitted
									? `0.5`
									: `1`};
							`,
							tw`w-full relative block mt-2 md:mt-8 pt-1 pb-1 border-grey border-b`,
						]}
					>
						<input
							ref={submitRef}
							tw="w-0 h-0 absolute top-0 right-0 opacity-0 pointer-events-none"
							type="submit"
						/>

						<input
							css={[
								css`
									background: transparent;
									font-family: "ABC Monument Grotesk";
									font-size: 16px;
									line-height: 22px;
									letter-spacing: 0;
									font-weight: 300;

									//

									&::-webkit-input-placeholder {
										color: ${theme`colors.grey`};
									}

									&::-moz-placeholder {
										color: ${theme`colors.grey`};
									}

									&:-ms-input-placeholder {
										color: ${theme`colors.grey`};
									}

									&:-moz-placeholder {
										color: ${theme`colors.grey`};
									}
								`,
								tw`w-full relative block pt-1 pb-1`,
							]}
							onChange={e => setEmail(e.currentTarget.value)}
							placeholder="Email"
							required
							type="email"
						/>

						<div css={[tw`h-full absolute top-0 right-0 bottom-0`]}>
							<button
								type="button"
								css={[
									tw`w-full h-full relative block text-strong-amber`,
								]}
								onClick={submitProxy}
							>
								<T.Body
									font="3"
									styles={[
										css`
											font-weight: 300;

											@media not all and (pointer: coarse) {
												&:hover {
													text-decoration: underline;
												}
											}
										`,
									]}
								>
									{!submitting && !submitted && `Submit`}
									{submitting && `Submitting...`}
									{submitted && `Thanks!`}
								</T.Body>
							</button>
						</div>
					</form>
				</div>
			</Grid>
		</footer>
	)
}

export default Footer
