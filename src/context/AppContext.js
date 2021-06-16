/* eslint-disable camelcase */
import React, { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useCookies } from "react-cookie"
import { globalHistory } from "@reach/router"
// import { trigger } from "~utils/analytics";
// import { fancyError } from "~utils/helpers";

export const AppContext = createContext({})

const AppProvider = ({ children }) => {
	const [cookies, setCookie] = useCookies(null)
	const [cookiesAccepted, setCookiesAccepted] = useState(false)
	const [cookieMessageActive, setCookieMessageActive] = useState(false)
	const [menuActive, setMenuActive] = useState(false)
	const [menuTransitioning, setMenuTransitioning] = useState(false)
	const [pathname, setPathname] = useState(null)

	//

	useEffect(() => {
		if (typeof window !== `undefined` && window?.location?.pathname) {
			setPathname(window.location.pathname)
		}

		//

		if (!cookies?.accepted) {
			setCookieMessageActive(true)
		} else {
			setCookiesAccepted(true)
		}

		//

		return globalHistory.listen(({ location }) => {
			setPathname(location.pathname)
		})
	}, [])

	//

	useEffect(() => {
		if (cookiesAccepted) {
			setCookie(`accepted`, true, { path: `/` })
		}
	}, [cookiesAccepted])

	//

	return (
		<AppContext.Provider
			value={{
				cookiesAccepted,
				setCookiesAccepted,
				cookieMessageActive,
				setCookieMessageActive,
				menuActive,
				setMenuActive,
				menuTransitioning,
				setMenuTransitioning,
				pathname,
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
