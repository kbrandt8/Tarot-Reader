import React from "react"

function Card({item}) {
    return(
        <div>
        <div className="card">
        <h4>{item.name}</h4>
        <img src={item.url} alt={item.name}/>
        <h1>Meaning:</h1><p> { item.upright}</p>
       </div>
        </div>
    )
}
export default Card
