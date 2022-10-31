import React from 'react'
import { Dimensions, View } from 'react-native'
import { colors, fonts, fontSizer } from '../../../utils'

const Grid = ({ data, aspectRatio, columns, columnSpacing, disableSpacing, gridItems }) =>
{
    const screenWidth = Dimensions.get('screen').width
    const currAspectRatio = aspectRatio ? aspectRatio : 1/1
    const currColumns = columns ? (columns > 6 ? 6 : columns) : 2
    const currSpacing = columnSpacing ? columnSpacing : 10
    const columnWidth = ((screenWidth - 20) / currColumns) - (currSpacing - (currSpacing / currColumns))

    // Styles
    const grid =
    {
        container:
        {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        columnWrapper:
        {
            width: columnWidth,
            height: undefined,
            aspectRatio: currAspectRatio,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        column: { flex: 1 },
        columnItemDefaultStyle:
        {
            columnItem:
            {
                flex: 1,
                borderRadius: 5,
                backgroundColor: '#f5f5f5',
                borderWidth: 1,
                borderColor: colors.border.primary,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5
            },
            columnItemLabel:
            {
                color: colors.text.secondary,
                fontFamily: fonts.regular,
                fontSize: fontSizer(14)
            }
        }
    }

    return (
        <View style={grid.container}>
            {
                data && data.map((item, index) => (
                    <View
                        style={[
                        {
                            marginRight: disableSpacing ? 0 : ((index + 1) % currColumns) !== 0 ? currSpacing : 0,
                            marginBottom: disableSpacing ? 0 : currSpacing
                        },
                            grid.columnWrapper
                        ]}
                        key={index}
                    >
                        <View style={grid.column}>
                            {gridItems(item, index, grid.columnItemDefaultStyle)}
                        </View>
                    </View>
                ))
            }
        </View>
    )
}

export default Grid