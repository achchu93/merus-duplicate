import React, { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { theme } from "twin.macro"
import { globalHistory } from "@reach/router"

const MENU_WIDTH = `540px`
const MENU_WIDTH_XS = `85vw`

export const AppContext = createContext({});

const AppProvider = ({children}) => {

	const [isMenuOpen, setMenuState] = useState(false)
	const [screen, setScreen] = useState(null)
	const [pathname, setPathname] = useState(null)

	useEffect(() => {
		if (typeof window !== `undefined` && window?.location?.pathname) {
			setPathname(window.location.pathname)
		}

		return globalHistory.listen(({ location }) => {
			setPathname(location.pathname)
		})
	})


	const getMenuWidth = () => {
		return ["xl", "lg"].includes(screen) ? MENU_WIDTH : MENU_WIDTH_XS
	}

	const handleResize = () => {

		let detectedScreen = "xs"

		const sizes = theme`screens`
		const screenNames = Object.keys(sizes)
		Object.values(sizes).forEach((_size, i) => {
			if (window.matchMedia(`(min-width: ${_size})`).matches) {
				detectedScreen = screenNames[i]
			}
		})

		setScreen(detectedScreen)
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
				pathname
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