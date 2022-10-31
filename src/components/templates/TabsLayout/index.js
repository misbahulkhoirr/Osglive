import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Gap, PageHeader, TopTabNavigator } from '../../../components'

const TabsLayout = ({ pageTitle, tabNavigator, children }) =>
{
    return (
        <View style={styles.container}>
            <PageHeader title={pageTitle} />
            <TopTabNavigator
                tabList={tabNavigator.tabList}
                initialTabName={tabNavigator.initialTabName}
                onTabItemPress={tabNavigator.onTabItemPress}
            />
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={10} />
                    {children}
                    <Gap height={75} />
                </ScrollView>
            </View>
        </View>
    )
}

export default TabsLayout

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white'
    },
    content: { paddingHorizontal: 10, flex: 1 }
})