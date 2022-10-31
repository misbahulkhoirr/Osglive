import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { LiveGrid, TabsLayout } from '../../components'
import { tokenValidation } from '../../utils'
import { getLiveCategoryAction, getRoomsByCategoryAction, getRoomsByCatFollowAction } from '../../config'

const Live = ({ navigation }) =>
{
    const dispatch = useDispatch()
    
    const [ tabList, setTabList ] = useState([])
    const [ currLiveList, setCurrLiveList ] = useState([])

    const getTabsLabel = () =>
    {
        const tabs = [
            { id: 'A', label: 'Follow' },
            { id: 'B', label: 'Popular' }
        ]

        dispatch(getLiveCategoryAction()).then(res =>
        {
            const data = res.data
            data.map(item => tabs.push({id: item.id, label: item.label}))

            setTabList(tabs)
        })
    }

    const getLiveDataFollow = () =>
    {
        dispatch(getRoomsByCatFollowAction()).then(res =>
        {
            const data = res.data
            setCurrLiveList(data)
        })
    }

    const getLiveData = (id) =>
    {
        if(id !== 'A')
        {
            if(id !== 'B')
            {
                dispatch(getRoomsByCategoryAction(id)).then(res =>
                {
                    const data = res.data
                    setCurrLiveList(data)
                })
            }
            else setCurrLiveList([])
        }
        else getLiveDataFollow()
    }

    useEffect(() =>
    {
        tokenValidation(null, navigation)
        getTabsLabel()
        getLiveDataFollow()
    }, [])

    return (
        <TabsLayout
            pageTitle="Live Stream"
            navigation={navigation}
            tabNavigator={{ 
                tabList: tabList,
                initialTabName: "Follow",
                onTabItemPress: (currTabId) => getLiveData(currTabId)
            }}
        >
            <LiveGrid data={currLiveList} />
        </TabsLayout>
    )
}

export default Live