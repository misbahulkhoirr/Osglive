import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
import { colors } from '../../../utils'

const IconLive = ({ filled, size, color }) =>
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
                <Circle cx="256" cy="256" r="36"/>
                <Path d="M190.24 341.77a22 22 0 01-16.46-7.38 118 118 0 010-156.76 22 22 0 1132.87 29.24 74 74 0 000 98.29 22 22 0 01-16.43 36.61zM321.76 341.77a22 22 0 01-16.43-36.61 74 74 0 000-98.29 22 22 0 1132.87-29.24 118 118 0 010 156.76 22 22 0 01-16.44 7.38z"/>
                <Path d="M139.29 392.72a21.92 21.92 0 01-16.08-7 190 190 0 010-259.49 22 22 0 1132.13 30.06 146 146 0 000 199.38 22 22 0 01-16.06 37zM372.71 392.72a22 22 0 01-16.06-37 146 146 0 000-199.38 22 22 0 1132.13-30.06 190 190 0 010 259.49 21.92 21.92 0 01-16.07 6.95z"/>
                <Path d="M429 438a22 22 0 01-16.39-36.67 218.34 218.34 0 000-290.66 22 22 0 0132.78-29.34 262.34 262.34 0 010 349.34A22 22 0 01429 438zM83 438a21.94 21.94 0 01-16.41-7.33 262.34 262.34 0 010-349.34 22 22 0 0132.78 29.34 218.34 218.34 0 000 290.66A22 22 0 0183 438z"/>
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
            <Circle cx="256" cy="256.02" r="32"/>
            <Path d="M184.25 192.25a96 96 0 000 127.52M327.77 319.77a96 96 0 000-127.52M133.28 141.28a168 168 0 000 229.44M378.72 370.72a168 168 0 000-229.44M435 416a240.34 240.34 0 000-320M77 96a240.34 240.34 0 000 320"/>
        </Svg>
    )
}

export default IconLive