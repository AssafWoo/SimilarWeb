import React, { Fragment } from 'react';
import { List, PlayListWrapper, Li, VideoHeader, Image} from './style';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



const PlayList = ({myPlayList, handleClick, handleRemove, current}) => {

    const Click = (ele, index) => {handleClick(ele, index)}

    const Remove = (ele, index) => {handleRemove(ele, index)}

    return (
        <Fragment>
            <PlayListWrapper>
                <List>
                    {myPlayList && myPlayList.map((ele, index) => (
                        <Li className={ele.id === current.id ? 'current' : ''} key={ele.id} onClick={() => Click(ele, index)}>
                            <Image style={{margin:'.5rem'}} src={ele.snippet.thumbnails.default.url} />
                            <VideoHeader>
                                <span><b>{ele.snippet.title}</b></span>
                                <p>By: {ele.snippet.channelTitle}</p>

                            </VideoHeader>
                            <br />
                            <IconButton  size="small" variant="contained" color="secondary" onClick={() => Remove(ele, index)}>
                                    <DeleteIcon fontSize="small" />
                            </IconButton >                   
                        </Li>
                    ))}
                </List>
            </PlayListWrapper>
         
        </Fragment>
    )
}

export default PlayList;