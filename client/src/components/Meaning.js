function Meaning({item}) {
    return(

      <div className="cards">    
      {item.title &&  <h2>{item.title}</h2>}
      
        <h1>{item.name}</h1>
 <p>
        <h2>Meaning:</h2>
        
        { item.reverse ? item.reversed : item.upright}</p>
        
        </div>  
 
    )
}
export default Meaning
