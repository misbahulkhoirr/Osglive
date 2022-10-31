import React from 'react'
import { Avatar } from 'native-base'
import { DefaultAvatar } from '../../../assets'
import { bucketURL } from '../../../utils'

const FollowerGroup = ({ followersData }) =>
{
    console.log('Konsoleeeeee', followersData)
    return (
        <Avatar.Group size="sm" max={3}>
            {
                followersData && followersData.map((followerData, index) =>
                {
                    return (
                        <Avatar
                            source={ followerData.photo !== null ? { uri: `${bucketURL}/${followerData.photo}` } : DefaultAvatar }
                            key={index}
                        >
                            --
                        </Avatar>
                    )
                })
            }
        </Avatar.Group>
    )
}

export default FollowerGroup