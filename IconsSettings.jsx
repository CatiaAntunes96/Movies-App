import * as React from "react"
import Svg, { Path } from "react-native-svg"

const IconSettings = (props) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="#000"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-8.707-3-3a1 1 0 0 0-1.414 1.414L10.586 9H7a1 1 0 1 0 0 2h3.586l-1.293 1.293a1 1 0 1 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414z"
      clipRule="evenodd"
    />
  </Svg>
)

export default IconSettings;