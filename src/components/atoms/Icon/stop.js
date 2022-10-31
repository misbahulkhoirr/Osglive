import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import { colors } from '../../../utils'

const IconStop = ({ filled, size, color }) =>
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
                fill={actualColor}
            >
                <Path d="M392 432H120a40 40 0 01-40-40V120a40 40 0 0140-40h272a40 40 0 0140 40v272a40 40 0 01-40 40z"/>
            </Svg>
        )
    }

    return (
        <Svg
            width={actualSize}
            height={actualSize}
            viewBox="0 0 512 512"
        >
            <Rect x="96" y="96" width="320" height="320" rx="24" ry="24" fill="none" stroke={actualColor} strokeLinejoin="round" strokeWidth="32"/>
        </Svg>
    )
}

export default IconStop