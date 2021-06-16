/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */

import React, { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import BlockContent from "@sanity/block-content-to-react"
import tw from "twin.macro"
import * as T from "~components/styles/Typography"
import Grid from "~components/styles/Grid"
import Button from "~components/Button"
import Video from "~components/Video"

const PortableText = ({ blocks }) => {

	const serializers = {
		types: {
			block: props => {
				switch (props.node.style) {
					case `h3`:
						return (
							<Grid>
								<T.Heading
									font="3"
									level="2"
									styles={[
										tw`col-span-12 md:col-span-7 md:col-start-4 whitespace-pre-wrap`,
									]}
								>
									{props.children}
								</T.Heading>
							</Grid>
						)

					case `normal`:
						return (
							<Grid>
								<div
									css={[
										tw`col-span-12 md:col-span-6 md:col-start-4 relative mb-6 whitespace-pre-wrap`,
									]}
								>
									<T.Body font="2">{props.children}</T.Body>
								</div>
							</Grid>
						)

					case `blockquote`:
						return (
							<Grid>
								<T.Heading
									font="2"
									level="3"
									styles={[
										tw`col-span-12 md:col-span-9 md:col-start-2 mt-10 md:mt-24 mb-16 md:mb-20`,
									]}
								>
									{props.children}
								</T.Heading>
							</Grid>
						)

					default:
						return <></>
				}
			},
			altImage: props => {
				let imageJSX

				switch (props?.node?.size) {
					case `tiny`:
						imageJSX = (
							<StaticImage
								tw="w-1/2 md:w-1/4"
								src="https://via.placeholder.com/2056"
								alt=""
							/>
						)

						break

					case `small`:
						imageJSX = (
							<StaticImage
								tw="w-full md:w-1/2"
								src="https://via.placeholder.com/2056"
								alt=""
							/>
						)

						break

					case `medium`:
						imageJSX = (
							<StaticImage
								tw="w-full md:w-3/4"
								src="https://via.placeholder.com/2056"
								alt=""
							/>
						)

						break

					case `large`:
					default:
						imageJSX = (
							<StaticImage
								tw="w-full md:w-full"
								src="https://via.placeholder.com/2056"
								alt=""
							/>
						)

						break
				}

				return (
					<Grid>
						<figure tw="col-span-12 md:col-span-8 md:col-start-3 relative flex items-center justify-center mt-4 mb-16">
							{imageJSX}
						</figure>
					</Grid>
				)
			},
			videoSection: props => (
				<Grid>
					<Video
						css={[
							tw`col-span-12 md:col-span-6 md:col-start-4 relative mb-6 whitespace-pre-wrap`,
						]}
						src={props.node.url}
					/>
				</Grid>
			),
			iframeSection: props => (
				<Grid>
					<div
						css={[
							tw`col-span-12 md:col-span-6 md:col-start-4 relative mb-6 whitespace-pre-wrap`,
						]}
						dangerouslySetInnerHTML={{ __html: props.node.url }}
					/>
				</Grid>
			),
		},
		list: ({ children, type }) => {
			let innerJSX = (
				<ol
					css={[
						tw`pl-10 pr-4 md:pr-0 font-body text-b2 md:text-b2-md list-decimal list-outside`,
					]}
				>
					{children}
				</ol>
			)

			if (type === `bullet`) {
				innerJSX = (
					<ul
						css={[
							tw`pl-10 pr-4 md:pr-0 font-body text-b2 md:text-b2-md list-disc list-outside`,
						]}
					>
						{children}
					</ul>
				)
			}

			return (
				<Grid>
					<div
						css={[
							tw`col-span-12 md:col-span-6 md:col-start-4 relative mt-4 mb-6 whitespace-pre-wrap`,
						]}
					>
						{innerJSX}
					</div>
				</Grid>
			)
		},
		listItem: ({ children }) => (
			<li>
				<T.Body font="2" styles={[tw`mb-2`]}>
					{children}
				</T.Body>
			</li>
		),
		marks: {
			link: ({ children, mark }) => {
				if (mark?.newTab) {
					return (
						<a
							href={mark.href}
							target="_blank"
							rel="noopener noreferrer"
						>
							{children}
						</a>
					)
				}

				return <a href={mark.href}>{children}</a>
			},
			button: ({ children, mark }) => {
				if (mark.internal) {
					return (
						<Link to={mark.url} tw="block w-1/2 m-auto">
							<Button
								tw="w-full mt-8"
								color="no-milk"
								transparent
							>
								<span tw="uppercase">{children}</span>
							</Button>
						</Link>
					)
				}
				return (
					<a
						href={mark.url}
						rel="noopener noreferrer"
						target="_blank"
						tw="block w-1/2 m-auto"
					>
						<Button tw="w-full mt-8" color="no-milk" transparent>
							<span tw="uppercase">{children}</span>
						</Button>
					</a>
				)
			},
		},
	}

	return <BlockContent blocks={blocks} serializers={serializers} />
}

export default PortableText
