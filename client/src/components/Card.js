function Card({item}) {
    return(
        <div>
            {item.when &&  <h1>{item.when}</h1>}
        <div className="cards">
        <h1>{item.name}</h1>
        <img src={item.url} alt={item.name} className={item.reverse ? "reversed" : ""}/>
        <h2>Meaning:</h2><p> { item.reverse ? item.reversed : item.upright}</p>
       </div>
        </div>
    )
}
export default Card
