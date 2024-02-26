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

export type UserType = {
    id: string,
    name: string,
    birthCard: string,
    birthDate: string,
    email: string,
    readings: [ReadingType]
}

export type SavedReadingType={
    _id:string,
    date:string,
    notes:string,
    title:string,
    cards:[CardType]
}