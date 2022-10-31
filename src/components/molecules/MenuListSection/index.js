import React from 'react'
import { Text, View } from 'react-native'
import { MenuListItem } from '../../atoms'
import { colors, fonts, fontSizer } from '../../../utils'

const MenuListSection = ({ title, dataList }) =>
{
    return (
        <View style={menuList.section}>
            <Text style={menuList.sectionTitle}>{title}</Text>

            <View style={menuList.card}>
                {
                    dataList.map((menu, index) =>
                    {
                        return (
                            <MenuListItem
                                icon={menu.icon}
                                name={menu.name}
                                onPress={menu.onPress}
                                idx={index}
                                numberOfMenus={dataList.length}
                                notificationTick={menu.notificationTick}
                                unMessage={menu.unMessage}
                                key={index}
                            />
                        )
                    })
                }
            </View>
        </View>
    )
}

const menuList =
{
    section:
    {
        marginHorizontal: 10
    },
    sectionTitle:
    {
        color: colors.text.secondary,
        fontFamily: fonts.medium,
        fontSize: fontSizer(14),
        lineHeight: fontSizer(21),
        paddingLeft: 5,
        marginBottom: 5
    },
    card:
    {
        padding: 15,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: 10,
        backgroundColor: '#ffffff'
    }
}

export default MenuListSection