import React from 'react';
import ReactPlayer from 'react-player'
import {Wrapper} from './style';

const FeaturedVideo = ({id, handleFinishedVideo}) => {


    const handleDone = () => {
        if(handleFinishedVideo){
            handleFinishedVideo();
        }
    }

    return (
        <Wrapper>
            {id ? <ReactPlayer style={{width:'100%', display:'inline-block'}} controls={true} playing={true} onEnded={() => handleDone()} url={`https://www.youtube.com/watch?v=${id}`} /> 
            : 'Add Videos...' }
        </Wrapper>
    )
}

export default FeaturedVideo;