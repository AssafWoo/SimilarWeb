import React, { useState,useEffect, useCallback} from 'react';
import PlayList from '../playlist/playlist';
import {Wrapper, FlexWrapper, Header} from './style';
import {Button, TextField} from '@material-ui/core';
import FeaturedVideo from '../featured/featured';
import {db} from '../../services/firebase/firebase';
import{validateURL} from '../../services/validation/validate';
import {FetchUrl} from '../../services/api/api_call';


const MainWrapper = () => {
    const [searchValue, setSearchValue] = useState('');
    const [playList, setPlayList] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)
    const [current, setCurrent] = useState([])
    const [isFetching, setIsFetching] = useState(false)


    useEffect(async () => { // intial call to server to get data in the playlist array.
        db.ref("videos").on('value', snapshot => {
            let videos = [];
            snapshot.forEach((snap) => {
                videos.push(snap.val());
              });
            setPlayList( videos );
            if(playList) setCurrent(videos[0]);
        })
    }, [])

    useEffect(() => {
        if(playList.length === 0) setCurrent([])
    },[playList])

    useEffect(() => { 
        const delayDebounceFn = setTimeout(async() => {
            // can be a future options call for autocomplete.
        }, 1500)
        return () => clearTimeout(delayDebounceFn)
      }, [searchValue])


    const handleSubmit = useCallback(async () => { // submit button that checks if the value is valid.
        if(searchValue && validateURL(searchValue)){
            let videoID = extractIdFromURL(searchValue);
            try {
                const myVideo = await FetchUrl(videoID)
                if(checkExist(myVideo)) {
                    setError(true)
                    setErrorMessage('Already Exists')
                } else {
                    setIsFetching(true);
                    setPlayList(playList =>[...playList, myVideo])
                    await db.ref("videos").push(myVideo);
                    setError(false)
                    setErrorMessage('')
                    setSearchValue('')
                    setIsFetching(false);
                }
            } catch(e) {
                setError(true)
                setErrorMessage('Something went wrong...')
                console.error(e);
            }
        } else {
            setError(true)
            setErrorMessage('Please enter a valid input')
        }
    })

    const checkExist = (ele) => {
        for(let i = 0; i< playList.length; i++){
            if(playList[i].id === ele.id) return true;
        }
        return false;
    }

    const extractIdFromURL = (url) => {
        let id = url.substring(
            url.lastIndexOf("v=")+2, 
            url.lastIndexOf("&")
        );
        return id;
    }

    const handleFinishedVideo = () => {
        const myIndex = playList.indexOf(current);
        setCurrent(playList[myIndex + 1])
        handleRemove(current, myIndex)
    }


    const handleRemove = async (ele) => {
        let targetVideo;
        db.ref("videos").on('value', snapshot => {
            snapshot.forEach((snap) => {
                if(snap.node_.children_.root_.left.value.value_ === ele.id) targetVideo = snap.ref_.path.pieces_[1];
              });
        })
        db.ref('videos').child(`${targetVideo}`).remove()
        setPlayList(playList.filter(item => item.id !== ele.id))
    }

    return (
        <Wrapper>
            <Header>
                <div>
                    <TextField className="mg-right-3" value={searchValue} helperText={errorMessage} onChange={(e) => setSearchValue(e.target.value)}label="Enter Video URL" error={error}/>
                    <Button disabled={isFetching} size="small" variant="contained" color="primary" type="submit" onClick={handleSubmit}>add</Button> 
                </div>
            </Header>
            <FlexWrapper>
            <PlayList handleRemove={handleRemove} myPlayList={playList}/>
                <FeaturedVideo handleFinishedVideo={handleFinishedVideo} id={current && current.id} />
            </FlexWrapper>

        </Wrapper>
    )
}

export default MainWrapper;