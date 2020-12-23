import React, { Fragment, useState,useEffect, useCallback} from 'react';
import PlayList from '../playlist/playlist';
import {Wrapper, FlexWrapper, SearchBar, Header, ButtonSide} from './style';
import {Button, TextField} from '@material-ui/core';
import FeaturedVideo from '../featured/featured';
import {db} from '../../firebase';
import axios from 'axios';


const MainWrapper = () => {
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState();
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
            console.log(videos)
            setPlayList( videos );
            setCurrent(videos[0])
        })
    }, [])

    useEffect(() => { // debounce function
        const delayDebounceFn = setTimeout(async() => {
            console.log(searchValue)
        }, 2000)
        return () => clearTimeout(delayDebounceFn)
      }, [searchValue])


    const handleSubmit = useCallback(async () => { // submit button that checks if the value is valid.
        if(searchValue){
            setSearchValue('')
            const apiEndPoint = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${searchValue}&key=AIzaSyDiYyqBeSz8n57FzYYhMUzues6wzFh24p4`;
            try {
                const response = await axios.get(apiEndPoint);
                const myResults = await response.data;
                const newVideo = await myResults.items[0];
                setPlayList(playList =>[...playList, newVideo]) // this whole object will be diffrenet
                console.log(response)
                await db.ref("videos").push(newVideo);
                setError(false)
                setErrorMessage('')
            } catch(e) {
                console.error(e);
            }

        } else {
            setError(true)
            setErrorMessage('Please enter a valid input')
        }
    },[searchValue])



    const handleClick = (ele, index) => {
        if(playList.length > 0) {
            setCurrent(playList[index])
        }
    }

    const handleFinishedVideo = () => {
        const myIndex = playList.indexOf(current);
        console.log(myIndex + 1)
        setCurrent(playList[myIndex + 1])
    }


    const handleRemove = async (ele, index) => {
        console.log(index)
        let targetVideo;
        db.ref("videos").on('value', snapshot => {
            snapshot.forEach((snap) => {
                if(snap.node_.children_.root_.left.value.value_ === ele.id) targetVideo = snap.ref_.path.pieces_[1];
              });
        })
        db.ref('videos').child(`${targetVideo}`).remove()
        setPlayList(playList.filter(item => item.id !== ele.id))
        if(current.id === ele.id && index !== playList.length - 1) {
            setCurrent(playList[index+1])
        }
    }

    return (
        <Wrapper>
            <Header>
                <SearchBar>
                    <TextField className="mg-right-3" helperText={errorMessage} onChange={(e) => setSearchValue(e.target.value)}label="Search Video Id" error={error}/>
                </SearchBar>
                <ButtonSide>
                    <Button disabled={isFetching} size="small" variant="contained" color="primary" type="submit" onClick={handleSubmit}>add</Button> 
                </ButtonSide>
            </Header>
            <FlexWrapper>
            <PlayList handleRemove={handleRemove} myPlayList={playList} handleClick={handleClick} current={current} />
                <FeaturedVideo handleFinishedVideo={handleFinishedVideo} id={current && current.id} />
            </FlexWrapper>

        </Wrapper>
    )
}

export default MainWrapper;