/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import "lazysizes"

import React from "react"
import AppProvider from "~context/AppContext"
import CursorProvider from "~context/CursorContext"
import DocumentProvider from "~context/DocumentContext"
import Header from "~components/Header"
import Nav from "~components/Nav"

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