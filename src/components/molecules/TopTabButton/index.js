import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Gap } from '../../atoms'
import { colors, fonts, fontSizer } from '../../../utils'

const TopTabButton = ({ topTabsTitle, tabList, initialTabName, tabItemOnPress }) =>
{
    const [ active, setActive ] = useState(initialTabName ? initialTabName : tabList[0].label)

    return (
        <>
            {topTabsTitle &&
                <>
                    <Text style={styles.topTabsTitle}>
                        {topTabsTitle}
                    </Text>
                    <Gap height={15} />
                </>
            }

            <View style={styles.wrapper}>
                {tabList.map((item, index) => (
                    <TouchableOpacity
                        style={styles.button(active, item.label, (index+1), tabList.length)}
                        onPress={() =>
                        {
                            setActive(item.label)
                            tabItemOnPress(item.code)
                        }}
                        key={item.id}
                    >
                        <Text style={styles.text}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    )
}

export default TopTabButton

const styles = StyleSheet.create({
    topTabsTitle:
    {
        color: colors.text.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(15)
    },
    wrapper: { flexDirection: 'row' },
    button: (active, thisMenu, currSequence, dataLength) => ({
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        borderColor: active === thisMenu ? '#D1C4E9' : colors.border.secondary,  
        backgroundColor: active === thisMenu ? colors.primaryLight : 'transparent',
        marginRight: currSequence !== dataLength ? 5 : 0
    }),
    text:
    {
        color: colors.primary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(12),
        textAlign: 'center',
    }
})