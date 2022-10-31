import React, { useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { SelectedItemImage } from '../../../assets'
import { colors } from '../../../utils'
import { Grid } from '../../molecules'

const OptionGrid = ({ 
    options, aspectRatio, columns, columnSpacing, onChange, 
    flexDir, bgColor, borderColor, divider, selectedItemPattern, renderItems 
}) =>
{
    const [ activeOption, setActiveOption ] = useState()

    const updateActiveOption = (active) => setActiveOption(active)

    const currBorderColor = bgColor ? borderColor : colors.border.primary
    const currBgColor = bgColor ? bgColor : '#f5f5f5'

    return (
        <Grid
            data={options}
            aspectRatio={aspectRatio ? aspectRatio : 16/9}
            columns={columns ? columns : null}
            columnSpacing={columnSpacing ? columnSpacing : null}
            gridItems={(option) => (
                <TouchableOpacity
                    style={[
                        optionGrid.itemContainer,
                        flexDir ? { flexDirection: flexDir, alignItems: 'center' } : null,
                        {
                            borderWidth: 1,
                            borderColor: activeOption === option ? '#D1C4E9' : currBorderColor
                        },
                        !selectedItemPattern
                        ? { backgroundColor: activeOption === option ? colors.primaryLight : currBgColor }
                        : null,
                        divider && activeOption !== option
                        ?
                        {
                            borderBottomWidth: 1,
                            borderBottomColor: colors.border.primary
                        }
                        : null
                    ]}
                    onPress={() =>
                    {
                        onChange ? onChange(option) : null
                        updateActiveOption(option)
                    }}
                >
                        {renderItems(option)}
                        {
                            selectedItemPattern && activeOption === option
                            ?
                            <View
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    elevation: -1
                                }}
                            >
                                <Image
                                    source={SelectedItemImage}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        borderBottomRightRadius: 10,
                                        opacity: 0.5
                                    }}
                                />
                            </View>
                            : null
                        }
                </TouchableOpacity>
            )}
        />
    )
}

const optionGrid =
{
    itemContainer:
    {
        flex: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    }
}

export default OptionGrid