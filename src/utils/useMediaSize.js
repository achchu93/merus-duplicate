import { useEffect, useState } from "react"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "./../../tailwind.config"

const fullConfig = resolveConfig(tailwindConfig)

export default useMediaSize => {
	let [size, setMediaSize] = useState("xs");

	const changeMediaSize = () => {
		const screenNames = Object.keys(fullConfig.theme.screens)
		Object.values(fullConfig.theme.screens).forEach((_size, i) => {
			if (i < 1) {
				return
			}
			if (window.matchMedia(`(min-width: ${_size})`).matches) {
				setMediaSize(screenNames[i - 1])
			}
		})
	}

	useEffect(() => {

		changeMediaSize();

		window.addEventListener("resize", changeMediaSize)

		return () => {
			window.removeEventListener("resize", changeMediaSize)
		}
	})

	return size;
}
