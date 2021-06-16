/* eslint-disable import/prefer-default-export */

import React, { useContext } from "react"
import { PropTypes } from "prop-types"
import { theme } from "twin.macro"
import { DocumentContext } from "~context/DocumentContext"

/**
 * -----------------------------------------------------------------------------
 * Transform the screen value from the DocumentContext. Required to sanitise
 * desktop values; typically md/lg/xl will use the same font size.
 * @return {node} Sanitised screen variable
 */
export const adjustScreen = screen =>
	screen === `lg` || screen === `xl` ? `md` : screen

/**
 * -----------------------------------------------------------------------------
 * Receive a h1-h6 node from the style guide. The type of node returned is
 * determined by the level supplied.
 * @param  {node}   children  Inner text
 * @param  {string} font      The font style (accepts 1, 2, 3, 4, b1, b2, b3)
 * @param  {string} level     The heading level (accepts 1, 2, 3, 4, 5, 6)
 * @param  {object} styles    Additional Emotion/Tailwind CSS
 * @return {node}             The resulting <h?> node
 */
export const Heading = ({
	children,
	className,
	font,
	level,
	styles,
	weight,
}) => {
	const { screen } = useContext(DocumentContext)
	const adjustedScreen = adjustScreen(screen)

	let fontKey = `h${font}`

	if (font.includes(`b`)) {
		fontKey = font
	}

	const tailwindStyles = theme`fontSize`[
		`${fontKey}${adjustedScreen !== `xs` ? `-${adjustedScreen}` : ``}`
	]

	let css = {}

	if (tailwindStyles?.[0] && tailwindStyles?.[1]) {
		css = {
			...styles?.[0],
			fontFamily: theme`fontFamily`.head.join(),
			fontSize: tailwindStyles[0],
			fontWeight: weight,
			...tailwindStyles[1],
		}
	}

	const H = `h${level}`

	return (
		<H className={className} css={css}>
			{children}
		</H>
	)
}

Heading.defaultProps = {
	className: ``,
	font: `1`,
	level: `2`,
	styles: [],
	weight: 300,
}
Heading.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	font: PropTypes.string,
	level: PropTypes.string,
	styles: PropTypes.arrayOf(PropTypes.shape({})),
	weight: PropTypes.number,
}

/**
 * -----------------------------------------------------------------------------
 * Receive a <p> (body) node from the style guide.
 * @param  {node}   children  Inner text
 * @param  {string} font      The font style (accepts 1, 2, 3)
 * @param  {object} styles    Additional Emotion/Tailwind CSS
 * @return {node}             The resulting <p> node
 */
export const Body = ({ children, font, styles }) => {
	const { screen } = useContext(DocumentContext)
	const adjustedScreen = adjustScreen(screen)
	const tailwindStyles = theme`fontSize`[
		`b${font}${adjustedScreen !== `xs` ? `-${adjustedScreen}` : ``}`
	]

	let css = {}

	if (tailwindStyles?.[0] && tailwindStyles?.[1]) {
		css = {
			...styles?.[0],
			fontFamily: theme`fontFamily`.body.join(),
			fontSize: tailwindStyles[0],
			fontWeight: 300,
			...tailwindStyles[1],
		}
	}

	return <p css={css}>{children}</p>
}

Body.defaultProps = {
	font: `1`,
	styles: [],
}
Body.propTypes = {
	children: PropTypes.node.isRequired,
	font: PropTypes.string,
	styles: PropTypes.arrayOf(PropTypes.shape({})),
}

/**
 * -----------------------------------------------------------------------------
 * Receive a button-styled <?> node from the style guide.
 * @param  {node}   children  Inner text
 * @param  {object} styles    Additional Emotion/Tailwind CSS
 * @return {node}             The resulting <?> node (defaults to <span>)
 */
export const Button = ({ children, nodeType, styles }) => {
	const { screen } = useContext(DocumentContext)
	const adjustedScreen = adjustScreen(screen)
	const tailwindStyles = theme`fontSize`[
		`button${adjustedScreen !== `xs` ? `-${adjustedScreen}` : ``}`
	]

	let css = {}

	if (tailwindStyles?.[0] && tailwindStyles?.[1]) {
		css = {
			...styles?.[0],
			fontFamily: theme`fontFamily`.head.join(),
			fontSize: tailwindStyles[0],
			...tailwindStyles[1],
		}
	}

	const B = `${nodeType}`

	return <B css={css}>{children}</B>
}

Button.defaultProps = {
	nodeType: `span`,
	styles: [],
}
Button.propTypes = {
	children: PropTypes.node.isRequired,
	nodeType: PropTypes.string,
	styles: PropTypes.arrayOf(PropTypes.shape({})),
}

/**
 * -----------------------------------------------------------------------------
 * Receive a <p> (caption) node from the style guide.
 * @param  {node}   children  Inner text
 * @param  {object} styles    Additional Emotion/Tailwind CSS
 * @return {node}             The resulting <p> node
 */

export const Caption = ({ children, nodeType, styles, weight }) => {
	const { screen } = useContext(DocumentContext)
	const adjustedScreen = adjustScreen(screen)
	const tailwindStyles = theme`fontSize`[
		`caption${adjustedScreen !== `xs` ? `-${adjustedScreen}` : ``}`
	]

	let css = {}

	if (tailwindStyles?.[0] && tailwindStyles?.[1]) {
		css = {
			...styles?.[0],
			fontFamily: theme`fontFamily`.body.join(),
			fontSize: tailwindStyles[0],
			fontWeight: weight,
			...tailwindStyles[1],
		}
	}

	const C = `${nodeType}`

	return <C css={css}>{children}</C>
}

Caption.defaultProps = {
	nodeType: `span`,
	styles: [],
	weight: 400,
}
Caption.propTypes = {
	children: PropTypes.node.isRequired,
	nodeType: PropTypes.string,
	styles: PropTypes.arrayOf(PropTypes.shape({})),
	weight: PropTypes.number,
}
