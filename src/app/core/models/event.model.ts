export interface eventModel {
    id: number,
    name: string,
    date: string,
    address: string,
    lat: number,
    lng: number,
    description: string,
    category: string,
    participants: number,
    price: string,
    eventImage: File | null;
}