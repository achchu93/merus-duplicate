/* eslint-disable import/prefer-default-export */

// import React;
import { PropTypes } from "prop-types"
import { css } from "twin.macro"

export const EASING_CUBIC = `cubic-bezier(0.215, 0.61, 0.355, 1)`

const KEYFRAMES = {
	appear: `
    backface-visibility: hidden;
    opacity: 0;
    transform: translate3d(0, 1rem, 0);

    @keyframes appear {
      0% {
        opacity: 0;
        transform: translate3d(0, 1rem, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  `,
	appearSlight: `
    backface-visibility: hidden;
    opacity: 0;
    transform: translate3d(0, 0.5rem, 0);

    @keyframes appearSlight {
      0% {
        opacity: 0;
        transform: translate3d(0, 0.5rem, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  `,
	appearDown: `
    backface-visibility: hidden;
    opacity: 0;
    transform: translate3d(0, -1rem, 0);

    @keyframes appearDown {
      0% {
        opacity: 0;
        transform: translate3d(0, -1rem, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  `,
	appearDownSlight: `
    backface-visibility: hidden;
    opacity: 0;
    transform: translate3d(0, -0.5rem, 0);

    @keyframes appearDownSlight {
      0% {
        opacity: 0;
        transform: translate3d(0, -0.5rem, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  `,
	appearLeft: `
    backface-visibility: hidden;
    opacity: 0;
    transform: translate3d(1rem, 0, 0);

    @keyframes appearLeft {
      0% {
        opacity: 0;
        transform: translate3d(1rem, 0, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  `,
	appearLeftSlight: `
    backface-visibility: hidden;
    opacity: 0;
    transform: translate3d(0.5rem, 0, 0);

    @keyframes appearLeftSlight {
      0% {
        opacity: 0;
        transform: translate3d(0.5rem, 0, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  `,
	appearRight: `
    backface-visibility: hidden;
    opacity: 0;
    transform: translate3d(-1rem, 0, 0);

    @keyframes appearRight {
      0% {
        opacity: 0;
        transform: translate3d(-1rem, 0, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  `,
	appearRightSlight: `
    backface-visibility: hidden;
    opacity: 0;
    transform: translate3d(-0.5rem, 0, 0);

    @keyframes appearRightSlight {
      0% {
        opacity: 0;
        transform: translate3d(-0.5rem, 0, 0);
      }
      100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  `,
	appearSpin: `
    backface-visibility: hidden;
    opacity: 0;
    transform: rotate(-359deg);

    @keyframes appearSpin {
      0% {
        opacity: 0;
        transform: rotate(-359deg);
      }
      100% {
        opacity: 1;
        transform: rotate(0);
      }
    }
  `,
	appearSpinSlight: `
    backface-visibility: hidden;
    opacity: 0;
    transform: rotate(-180deg);

    @keyframes appearSpinSlight {
      0% {
        opacity: 0;
        transform: rotate(-180deg);
      }
      100% {
        opacity: 1;
        transform: rotate(0);
      }
    }
  `,
	disappear: `
    backface-visibility: hidden;
    opacity: 1;

    @keyframes disappear {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `,
	focus: `
    -webkit-perspective: 1000;
    -webkit-font-smoothing: subpixel-antialiased;
    backface-visibility: hidden;
    font-smooth: always !important;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale !important;
    will-change: filter;

    filter: blur(2px);
    opacity: 0;

    @keyframes focus {
      0% {
        filter: blur(4px);
        opacity: 0;
      }
      100% {
        filter: blur(.0px);
        opacity: 1;
      }
    }
  `,
}

export const Keyframes = (id, keyframeCSS, delay) => css`
	${KEYFRAMES[id]}
	animation: ${id} ${keyframeCSS};
	animation-delay: ${delay || 0};
`

export const TransitionFade = on => `
    transition: 0.3s ${EASING_CUBIC} opacity;
    opacity: ${on ? 1 : 0};
  `

export const TransitionFadeUp = on => `
    transition: 0.3s ${EASING_CUBIC} opacity, 0.3s ${EASING_CUBIC} transform;

    transform: translate3d(0, ${on ? `0` : `1rem`}, 0);
    opacity: ${on ? 1 : 0};
  `

export const TransitionFadeDown = on => `
    transition: 0.3s ${EASING_CUBIC} opacity, 0.3s ${EASING_CUBIC} transform;

    transform: translate3d(0, ${on ? `0` : `-1rem`}, 0);
    opacity: ${on ? 1 : 0};
  `

export const TransitionFadeLeft = on => `
    transition: 0.3s ${EASING_CUBIC} opacity, 0.3s ${EASING_CUBIC} transform;

    transform: translate3d(${on ? `0` : `-1rem`}, 0, 0);
    opacity: ${on ? 1 : 0};
  `

export const TransitionFadeRight = on => `
    transition: 0.3s ${EASING_CUBIC} opacity, 0.3s ${EASING_CUBIC} transform;

    transform: translate3d(${on ? `0` : `1rem`}, 0, 0);
    opacity: ${on ? 1 : 0};
  `

// Keyframes.defaultProps = {};
Keyframes.propTypes = {
	id: PropTypes.string.isRequired,
}
