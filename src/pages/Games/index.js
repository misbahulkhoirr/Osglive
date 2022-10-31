import React, { useEffect } from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, TabsLayout } from '../../components'
import { bucketURL, tokenValidation } from '../../utils'
import { getGamesByCategoryAction } from '../../config'

const Games = ({ navigation }) =>
{
    const dispatch = useDispatch()
    
    const gameCategories = useSelector(state => state.CategoryGameReducer.data)
    const gameListByCat  = useSelector(state => state.getGamesByCategoryReducer.data)

    const getGamesData = (id) => dispatch(getGamesByCategoryAction(id))

    useEffect(() =>
    {
        tokenValidation(null, navigation)
        getGamesData(gameCategories[0].id)
    }, [])

    return (
        <TabsLayout
            pageTitle="Game Center"
            navigation={navigation}
            tabNavigator={{ 
                tabList: gameCategories,
                initialTabName: gameCategories[0].label,
                onTabItemPress: (currTabId) => getGamesData(currTabId)
            }}
        >
            <Grid
                data={gameListByCat}
                columns={5}
                columnSpacing={15}
                gridItems={(item, index, defaultStyle) => (
                    <TouchableOpacity
                        style={defaultStyle.columnItem}
                        onPress={() => navigation.navigate('InGame', { apps: item.api })}
                    >
                        <Image
                            source={{ uri: `${bucketURL}/${item.cover}` }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )}
            />
        </TabsLayout>
    )
}

export default Games

const styles = StyleSheet.create({
    image:
    {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8
    },
})