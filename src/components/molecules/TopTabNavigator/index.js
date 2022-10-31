import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fonts } from '../../../utils'

const TopTabNavigator = ({ tabList, initialTabName, onTabItemPress }) =>
{
    const [ active, setActive ] = useState(initialTabName)

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.content}>
                    {tabList.map((item, index) =>
                    {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                {
                                    setActive(item.label)
                                    onTabItemPress(item.id)
                                }}
                                key={index}
                                style={styles.button(active, item.label)}
                            >
                                <Text style={styles.text(active, item.label)}>{item.label}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

export default TopTabNavigator

const styles = StyleSheet.create({
    container:
    {
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary
    },
    content: { flexDirection: 'row' },
    button: (active, thisMenu) => ({
        borderBottomWidth: 3,
        borderBottomColor: active === thisMenu ? colors.primary : 'transparent',
        backgroundColor: active === thisMenu ? colors.primaryLight : 'transparent',
        paddingHorizontal: 25,
        justifyContent: 'center'
    }),
    text: (active, thisMenu) => ({
        color: active === thisMenu ? colors.primary : colors.text.secondary,
        fontFamily: fonts.medium,
        textAlign: 'center',
    })
})