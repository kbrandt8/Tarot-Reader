const URL = process.env.URL
const options = {
  method: 'GET',
  headers: {
    cache: 'no-store'
  },
};
export async function getReading(type) {

  const url = `${URL}/api/${type}`
  const { cards } = await fetch(url, options).then(response => response.json())
  const numCards = await cards.length
  return {title:type,numCards,cards}
}
