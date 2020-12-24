import React from 'react';
import { List, PlayListWrapper, Li, VideoHeader, Image} from './style';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



const PlayList = ({myPlayList, handleRemove}) => {

    const Remove = (ele, index) => {handleRemove(ele, index)}

    return (
            <PlayListWrapper>
                <List>
                    {myPlayList && myPlayList.map((ele, index) => (
                        <Li key={ele.id}>
                            <Image style={{margin:'.5rem'}} src={ele.snippet.thumbnails.default.url} />
                            <VideoHeader>
                                <span><b>{ele.snippet.title}</b></span>
                                <p>By: {ele.snippet.channelTitle}</p>

                            </VideoHeader>
                            <br />
                            <IconButton style={{height:'fit-content'}}  size="small" variant="contained" color="secondary" onClick={() => Remove(ele, index)}>
                                    <DeleteIcon fontSize="small" />
                            </IconButton >                   
                        </Li>
                    ))}
                </List>
            </PlayListWrapper>
         
    )
}

export default PlayList;