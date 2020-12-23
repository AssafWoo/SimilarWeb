import styled from 'styled-components';
import {mainGrey} from '../common/colors';

export const PlayListWrapper = styled.div`
    padding-right:2rem;
    flex:2 0 35%;
    justify-content: center;
    align-items: center;
`

export const List = styled.ul`
    list-style-type: none;
    overflow-y:auto;
    text-align:left;
    padding:0;
    transition: ease-in all .3s;
    .current {
        background-color:${mainGrey};
    }
`

export const Li = styled.li`
    border:1px solid ${mainGrey};
    display:flex;
    border-radius:20px;
    padding:.4rem;
    margin-bottom:1rem;
    transition: ease-in all .3s;
    &:hover{
        background-color:${mainGrey};
    }
`

export const Image = styled.img`
    margin:.5rem;
    border-radius:20px;
`
export const VideoHeader = styled.div`
    text-align: center;
    vertical-align: middle;
    line-height: 100%; 
    display:flex;
    flex-direction:column;
`
