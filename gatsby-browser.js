/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react";

import Header from "./src/components/header";
import Menu from "./src/components/menu";
import AppProvider from "./src/context/app-context";

import "./src/styles/global.css";


export const wrapRootElement = ({ element }) => {

	return (
		<AppProvider>
			<Header />
			<Menu />
			{element}
		</AppProvider>
	)
}