import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IconClose } from '../../atoms'
import { bucketURL, colors, fonts, fontSizer } from '../../../utils'

const GiftsModal = forwardRef(({ data, giftItemOnPress }, ref) =>
{
    const [ isVisible, setIsVisible ] = useState(false)
    
    useImperativeHandle(ref, () =>
    {
        return {
            show: () => setIsVisible(true),
            hide: () => setIsVisible(false)
        }
    })

    const modalContentWidth = Dimensions.get('screen').width - 100
    const currColumns  = 3
    const currSpacing  = 10
    const columnSize   = (modalContentWidth / currColumns) - (currSpacing - (currSpacing / currColumns))
    const columnHeight = (columnSize + currSpacing)
    const gridHeight   = columnHeight * ((data.length < currColumns ? currColumns : data.length) / currColumns)
    const scrollHeight = (columnHeight * 2) + (columnHeight / 6)
    
    return (
        <>
            <Modal visible={isVisible} transparent animationType="slide">
                <View style={styles.container}>
                    <View style={styles.modal}>
                        {/* Title and Buttons on Header */}
                        <View style={styles.headerButtonWrapper}>
                            <Text style={styles.title}>Choose Gift</Text>

                            <TouchableOpacity onPress={() => setIsVisible(false)}>
                                <IconClose />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.content}>
                            <ScrollView
                                style={styles.scrollHeight(scrollHeight)}
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={styles.gridStyle(gridHeight)}>
                                    {
                                        data.map((item, idx) => (
                                            <TouchableOpacity
                                                style={styles.gridItemWrapper((idx+1), currColumns, currSpacing, columnSize)}
                                                onPress={() => giftItemOnPress(item)}
                                                key={idx}
                                            >
                                                <View style={styles.gridItemOuter}>
                                                    <View style={styles.gridItem}>
                                                        <Image
                                                            source={{uri: `${bucketURL}/${item.image}`}}
                                                            style={styles.image}
                                                        />
                                                        <Text style={styles.gridItemLabel}>{item.name} - ({item.diamonds} Diamonds)</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
})

export default GiftsModal

const styles = StyleSheet.create({
    container:
    {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25
    },
    modal:
    {
        width: '100%',
        borderRadius: 15,
        padding: 25,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    headerButtonWrapper:
    {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title:
    {
        color: colors.text.secondary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(16),
        lineHeight: fontSizer(23)
    },
    content:
    {
        width: '100%',
        marginTop: 10
    },
    scrollHeight: scrollHeight => ({ height: scrollHeight }),
    gridStyle: gridHeight => ({
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: gridHeight
    }),
    gridItemWrapper: (currPosition, currColumns, currSpacing, columnSize) => ({
        height: undefined,
        aspectRatio: 1/1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: (currPosition % currColumns) === 0 ? 0 : currSpacing,
        marginBottom: currSpacing,
        width: columnSize
    }),
    gridItemOuter: { flex: 1 },
    gridItem:
    {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: colors.border.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:
    {
        width: 35,
        height: 35
    },
    gridItemLabel:
    {
        color: colors.text.secondary,
        fontFamily: fonts.regular,
        fontSize: fontSizer(12),
        marginTop: 5
    }
})