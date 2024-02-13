import styled from "styled-components"
import { CardType, ReadingType } from "./types"

export const ReadingDiv = styled.section`
margin:10px auto;
background-color:#eae2f0;
display:flex;
flex-direction: row;
align-items: center;
justify-content: center;    
`;

export const CelticCross = styled.section`
    margin:10px auto;
    border:0;
    background-color:#eae2f0;

    position:relative;

:nth-child(1){
    top: 30%;
    left: 5%;
}
:nth-child(2){
    transform: rotate(90deg);
    top: 30%;
    left: 25%;
    z-index:999;
}
:nth-child(3){
    top: 1%;
    left: 25%;
}
:nth-child(4){
    top: 30%;
    left:25%;
  
}
:nth-child(5){
    left: 25%;
    top: 60%;
}
:nth-child(6){
    top: 30%;
    left: 45%;
}
:nth-child(7){
    top: 1%;
    left: 75%;
}
:nth-child(8){
    top: 25%;
    left: 75%;
}
:nth-child(9){
    top: 50%;
    left: 75%;
}
:nth-child(10){
    top: 75%;
    left: 75%;
}
`


export const TarotCard = styled.section<{ $url?: string; $reversed?: boolean }>`
        height:60%;
        width:20%;
        background-image: url(${props => '/' + props.$url});
        background-size:cover;
        background-repeat: no-repeat;
        background-position: center;
        margin:5px auto;
        transform: ${props => props.$reversed && `scaley(-1)`};
        `;


export const CelticCrossCard = styled(TarotCard)`
        height:20%;
        width: 7%;
        position:absolute;
`