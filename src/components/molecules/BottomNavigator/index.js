import React from 'react'
import { View } from 'react-native'
import { colors } from '../../../utils'
import { TabItem } from '../../atoms'

const BottomNavigator = ({ state, descriptors, navigation }) =>
{
    // Hide bottom navigator on broadcast page (live broadcast)
    if(state.index === 2) return null

    return (
        <View style={container}>
            <View style={bottomNavigator}>
                {
                    state.routes.map((route, index) =>
                    {
                        const { options } = descriptors[route.key]
                        const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name

                        const isFocused = state.index === index

                        const onPress = () =>
                        {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true
                            })

                            if(!isFocused && !event.defaultPrevented)
                            {
                                navigation.navigate(route.name)
                            }
                        }

                        const onLongPress = () =>
                        {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            })
                        }

                        return (
                            <TabItem key={index} title={label} active={isFocused} onLongPress={onLongPress} onPress={onPress} />
                        )
                    })
                }
            </View>
        </View>
    )
}

const container =
{
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
}

const bottomNavigator =
{
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10
}

export default BottomNavigator