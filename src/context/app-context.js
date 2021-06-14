import React, { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { theme } from "twin.macro"

const MENU_WIDTH = `540px`
const MENU_WIDTH_XS = `85vw`

export const AppContext = createContext({});

const AppProvider = ({children}) => {

	const [isMenuOpen, setMenuState] = useState(false)
	const [screen, setScreen] = useState(null)


	const getMenuWidth = () => {
		return ["xl", "lg", "md"].includes(screen) ? MENU_WIDTH : MENU_WIDTH_XS
	}

	const handleResize = () => {
		const sizes = theme`screens`
		const screenNames = Object.keys(sizes)
		Object.values(sizes).forEach((_size, i) => {
			if (i < 1) {
				return
			}
			if (window.matchMedia(`(min-width: ${_size})`).matches) {
				setScreen(screenNames[i - 1])
			}
		})
	}

	const handleMenuState = () => {
		setMenuState(!isMenuOpen)
	}


	useEffect(() => {

		if (typeof window !== `undefined` && window?.addEventListener) {
			window.addEventListener(`resize`, handleResize, false)
			handleResize()
		}

		return () => {
			if (typeof window !== `undefined` && window?.addEventListener) {
				window.removeEventListener("resize", handleResize);
			}
		}
	})

	return (
		<AppContext.Provider
			value={{
				isMenuOpen,
				handleMenuState,
				screen,
				getMenuWidth,
			}}
		>
			{children}
		</AppContext.Provider>
	)

}

AppProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export default AppProvider