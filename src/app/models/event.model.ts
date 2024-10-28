export interface eventModel {
    id: number,
    name: string,
    date: string,
    place: string,
    description: string,
    category: string,
    participants: number,
    price: string,
    eventImage: File | null;
}