import React, { Fragment, useState } from 'react';
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
            <ReactPlayer onEnded={() => handleDone()} url={`https://www.youtube.com/watch?v=${id}`} />
        </Wrapper>
    )
}

export default FeaturedVideo;