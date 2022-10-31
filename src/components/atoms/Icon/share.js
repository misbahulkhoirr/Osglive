import React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'
import { colors } from '../../../utils'

const IconShare = ({ filled, size, color }) =>
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
                <Path d="M384 336a63.78 63.78 0 00-46.12 19.7l-148-83.27a63.85 63.85 0 000-32.86l148-83.27a63.8 63.8 0 10-15.73-27.87l-148 83.27a64 64 0 100 88.6l148 83.27A64 64 0 10384 336z"/>
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
            <Circle cx="128" cy="256" r="48"/>
            <Circle cx="384" cy="112" r="48"/>
            <Circle cx="384" cy="400" r="48"/>
            <Path d="M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94"/>
        </Svg>
    )
}

export default IconShare