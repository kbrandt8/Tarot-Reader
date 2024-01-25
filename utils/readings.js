const URL = process.env.URL
const options = {
    method: 'GET',
    headers: {
      cache:'no-store'
    },
  };
export  async function getReading(Type){
   const url =  `${URL}/api/${Type}`
   const {cards} = await fetch(url,options).then(response=>response.json())
   return cards
}
