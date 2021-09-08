import React from "react"

function Card({item}) {
    return(
        <div>
            {item.when!=null &&  <h4>{item.when}</h4>}
        <div className="card">
        <h4>{item.name}</h4>
        {item.reverse!=null && <p>{item.reverse ?  "reversed":"upright" }</p>}
        <img src={item.url} alt={item.name} className={item.reverse ? "cardimage  reversed" : ""}/>
        <h1>Meaning:</h1><p> { item.reverse ? item.reversed : item.upright}</p>
       </div>
        </div>
    )
}
export default Card
