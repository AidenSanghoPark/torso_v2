"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
    transform: scale(0.95) translate(10px, 10px);
  }
  25%, 75% {
    opacity: 1;
    transform: scale(1) translate(0, 0);
  }
`;

const AnimatedSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

const LogoPath = styled.path`
  fill: ${(props) => props.theme.logoColor};
  opacity: 0;
  transform-origin: center;
  animation: ${fadeInOut} 20s ease-in-out infinite;
`;

const LogoAnimation = () => (
  <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
    <AnimatedSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 227.9661 195.86903">
      <LogoPath
        d="m 67.0935 5.63848 l 2.10669 3.15994 l 2.10661 -3.15994 h 1.9459 v 8.10502 h -1.90984 v -4.82239 l -2.14267 3.21409 l -2.14275 -3.21409 v 4.82239 h -1.9098 V 5.63848 h 1.94586 Z m 9.33394 5.01868 h 3.59978 v -1.90413 h -3.59978 v -1.18221 h 4.11323 v -1.90413 h -6.01736 v 8.07681 h 6.01736 v -1.90413 h -4.11323 v -1.18221 Z m 5.1951 -4.99047 v 8.07681 h 1.90417 v -4.81126 l 3.20551 4.81126 h 1.93461 V 5.66668 h -1.89851 v 4.81126 l -3.20555 -4.81126 h -1.94023 Z"
        style={{ animationDelay: "0s" }}
      />
      <LogoPath
        d="m 12.69254 5.68353 h -6.96731 v 1.83039 h 2.51754 v 14.9253 h 1.93205 V 7.51391 h 2.51771 v -1.83039 Z m 4.47475 -0.13558 c -2.33872 0 -4.02216 1.75128 -4.02216 4.09 c 0 2.35008 1.68345 4.10136 4.02216 4.10136 c 2.33888 0 4.02233 -1.75128 4.02233 -4.10136 c 0 -2.33872 -1.68345 -4.09 -4.02233 -4.09 Z m 0 6.32713 c -1.37837 0 -2.07891 -1.11857 -2.07891 -2.23713 c 0 -1.11848 0.70054 -2.22577 2.07891 -2.22577 c 1.37853 0 2.07891 1.10729 2.07891 2.22577 c 0 1.11857 -0.70038 2.23713 -2.07891 2.23713 Z"
        style={{ animationDelay: "0.5s" }}
      />
      <LogoPath
        d="m 28.74889 13.59244 l -1.68345 -3.08445 c 0.75702 -0.42938 1.22031 -1.1412 1.22031 -2.09019 c 0 -1.58186 -1.02818 -2.73426 -3.03926 -2.73426 h -3.03942 v 7.90891 h 1.93205 v -2.6438 h 1.22031 l 1.33326 2.6438 h 2.05619 Z m -4.60976 -6.07852 h 1.10737 c 0.64391 0 1.08465 0.31628 1.08465 0.90388 c 0 0.67783 -0.51977 0.90388 -1.08465 0.90388 h -1.10737 v -1.80775 Z m 8.67802 1.37837 c -0.61016 -0.1695 -1.54795 -0.31636 -1.54795 -0.93779 c 0 -0.45194 0.37291 -0.75702 0.93779 -0.75702 c 0.68918 0 1.01682 0.38419 1.11857 0.76838 l 1.78519 -0.44066 c -0.30508 -1.25415 -1.45756 -1.97725 -2.81337 -1.97725 c -1.64953 0 -2.90376 0.90388 -2.90376 2.41791 c 0 1.3219 0.7119 2.05628 2.2936 2.44046 c 0.89268 0.22589 1.67225 0.31628 1.67225 0.90388 c 0 0.51969 -0.49721 0.77957 -1.16368 0.77957 c -0.85876 0 -1.27678 -0.48585 -1.37853 -0.93779 l -1.78519 0.5536 c 0.35035 1.46884 1.72872 2.03372 3.18628 2.03372 c 1.97717 0 3.09573 -1.17504 3.09573 -2.46302 c 0 -1.23151 -0.56488 -1.84167 -2.49694 -2.38399 Z"
        style={{ animationDelay: "1s" }}
      />
      <LogoPath
        d="m 39.90178 5.54795 c -2.33872 0 -4.02216 1.75128 -4.02216 4.09 c 0 2.35008 1.68345 4.10136 4.02216 4.10136 c 2.33888 0 4.02233 -1.75128 4.02233 -4.10136 c 0 -2.33872 -1.68345 -4.09 -4.02233 -4.09 Z m 0 6.32713 c -1.37837 0 -2.07891 -1.11857 -2.07891 -2.23713 c 0 -1.11848 0.70054 -2.22577 2.07891 -2.22577 c 1.37853 0 2.07891 1.10729 2.07891 2.22577 c 0 1.11857 -0.70038 2.23713 -2.07891 2.23713 Z m 11.0171 -4.9374 c 0.1355 0 0.2598 0.01128 0.33883 0.02256 v -1.48012 c -0.21453 -0.03383 -0.44058 -0.07903 -0.79077 -0.07903 c -1.80775 0 -2.1693 1.40101 -2.1693 2.46302 h -0.70054 v 1.51403 h 0.70054 v 4.2143 h 1.84167 v -4.2143 h 1.1184 v -1.51403 h -1.1184 c 0 -0.5988 0.18078 -0.92643 0.77957 -0.92643 Z"
        style={{ animationDelay: "1.5s" }}
      />
      <LogoPath
        d="m 54.83347 6.9684 c -1.78519 0 -3.07318 1.29934 -3.07318 3.00543 c 0 1.69473 1.28798 3.00535 3.07318 3.00535 c 1.79639 0 3.07318 -1.31062 3.07318 -3.00535 c 0 -1.70609 -1.27678 -3.00543 -3.07318 -3.00543 Z m 0 4.22566 c -0.73446 0 -1.22031 -0.5536 -1.22031 -1.22023 s 0.48585 -1.23151 1.22031 -1.23151 c 0.74566 0 1.23151 0.56488 1.23151 1.23151 s -0.48585 1.22023 -1.23151 1.22023 Z m 5.75154 -3.22012 v -0.86996 h -1.83047 v 5.72833 h 1.83047 v -2.25969 c 0 -0.96035 0.18078 -1.88686 1.80775 -1.63825 v -1.96597 c -0.67799 0 -1.40109 0.36155 -1.80775 1.00554 Z"
        style={{ animationDelay: "2s" }}
      />
      <LogoPath
        d="m 36.95181 92.08309 h 4.83534 V 20.3034 h 4.42973 v 71.7797 h 4.83565 V 20.3034 h 88.2554 v -4.04241 H 14.9582 v 4.04241 h 21.9936 v 71.7797 Z m 14.1007 68.1527 v -65.188 h -14.1007 v 72.951 h 14.1007 v -4.83534 h -9.26538 v -63.28 h 4.42973 v 60.3523 h 4.83565 Z"
        style={{ animationDelay: "2.5s" }}
      />
      <LogoPath
        d="M 213.008 37.5063 v -4.83573 h -115.39 v 14.1477 h 81.4214 v 79.2734 h 4.83565 V 46.8183 h 4.47652 v 144.013 h 4.8358 V 41.9826 h -90.7338 v -4.47629 h 110.554 Z m -47.7341 125.657 h -58.3438 v 9.27452 H 36.9517 v 4.83534 h 74.8136 v -9.27452 h 48.6731 v 9.27452 h 23.4364 v -4.83534 h -18.6011 v -9.27452 Z"
        style={{ animationDelay: "3s" }}
      />
      <LogoPath
        d="m 179.0393 163.1633 h -4.45328 v -9.27499 h -76.9682 v 9.27499 h -42.9374 v 4.83534 h 47.773 v -9.27452 h 67.2969 v 9.27452 h 14.1246 v -38.184 h -4.83565 v 33.3487 Z m 6.38447 -138.384 h -38.0026 v -4.47637 h 40.9303 v 9.37585 h 4.8358 v -14.2115 h -50.6017 v 14.1477 h 42.8382 v -4.83573 Z"
        style={{ animationDelay: "3.5s" }}
      />
    </AnimatedSvg>
  </div>
);

export default LogoAnimation;
