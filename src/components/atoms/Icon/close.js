import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from '../../../utils'

const IconClose = ({ filled, size, color }) =>
{
    const actualSize = size ? size : '24'
    let actualColor  = color ? color : colors.text.secondary

    if(filled === true)
    {
        actualColor = color ? color : colors.primary

        return (
            <Svg
                width={actualSize}
                height={actualSize}
                viewBox="0 0 512 512"
                fill="none"
                stroke={actualColor}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            >
                <Path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"/>
            </Svg>
        )
    }

    return (
        <Svg
            width={actualSize}
            height={actualSize}
            viewBox="0 0 512 512"
            fill="none"
            stroke={actualColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
        >
            <Path d="M368 368L144 144M368 144L144 368"/>
        </Svg>
    )
}

export default IconClose