import useMediaSize from "./../utils/useMediaSize"

export default useMenuWidth => {
	let width = "85vw"

	if( [ "xl", "lg", "md" ].includes( useMediaSize() ) ){
		width = "540px";
	}

	return width;
}
