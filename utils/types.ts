export type CardType={
    _id:number,
    name:string,
    url:string,
    num:string,
    upright:string,
    reversed:string,
    title:string,
    isReversed:boolean

}

export type ReadingType={
    title:string,
    numCards:number,
    cards:[CardType]
}