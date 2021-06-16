/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "lazysizes"

import React from "react"
import AppProvider from "~context/AppContext"
import CursorProvider from "~context/CursorContext"
import DocumentProvider from "~context/DocumentContext"
import Header from "~components/Header"
import Nav from "~components/Nav"

import "./src/styles/global.css"

export const wrapRootElement = ({ element }) => (
	<>
		<DocumentProvider>
			<CursorProvider>
				<AppProvider>
					<Header />
					<Nav />
					{element}
				</AppProvider>
			</CursorProvider>
		</DocumentProvider>
	</>
)