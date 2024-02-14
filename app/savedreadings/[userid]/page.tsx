export default async function Page({params}:{params:{userid:string}}){
    const {userid} = params
    return(
       <h1>{userid}</h1> 
    )
}