import styled from "styled-components"
import { CardType, ReadingType } from "./types"

export const ReadingDiv = styled.section`
margin:0px auto;
display:flex;
flex-direction: row;
align-items: center;
justify-content: center;    
`;

export const CelticCross = styled.section`
    height:600px;
    width: 800px;
    display:inline-table;
    margin-bottom: 5rem;
    border:0;
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
        content: url(${props => '/' + props.$url});
        display:inline-block;
        max-width:150px;
        max-height:265px;
        overflow: hidden;
        margin:5px;
        transform: ${props => props.$reversed && `scaley(-1)`};
        `;


export const CelticCrossCard = styled(TarotCard)`
        max-width:100px;
        max-height:177px;
        display: inline-table;
        position:absolute;
`