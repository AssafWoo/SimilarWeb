import {API_KEY} from './api_key';
import axios from 'axios';

export const FetchUrl = async (videoID) => { // submit button that checks if the value is valid.
        const apiEndPoint = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${API_KEY}`;
        let data;
        let errors;
        try {
            const response = await axios.get(apiEndPoint);
            const myResults = await response.data;
            const myVideo = await myResults.items[0]
            data = myVideo;
            return data;
        } catch(e) {
            console.error(e);
            errors = e;
            return errors;
        }
    }