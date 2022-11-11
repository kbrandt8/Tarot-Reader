function Card({item}) {
    return(
      
        <div className="cards">
        <img src={item.url} alt={item.name} className={item.reverse ? "reversed" : ""}/>   
        </div>
    )
}
export default Card
