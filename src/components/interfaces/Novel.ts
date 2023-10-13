export interface Novel {
    _id: string,
    title: string,
    author: string,
    desc: string,
    alternative_title: string,
    rating: number,
    genre: string[],
    picture_link: string,
}