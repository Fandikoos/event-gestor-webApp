export interface Event {
    id:            number;
    name:          string;
    date:          Date;
    address:       string;
    lat:           number;
    lng:           number;
    description:   string;
    category:      string;
    participants:  number;
    price:         string;
    eventImage:    string;
    registrations: Registration[];
    ratings:       Rating[];
}

export interface User {
    id:            number;
    name:          string;
    email:         string;
    phone:         string;
    registrations: Registration[];
    ratings:       Rating[];
}

export interface Rating {
    id:                number;
    organizationSpeed: number;
    eventQuality:      number;
    customerService:   number;
    valueForMoney:     number;
    averageRating:     number;
    eventId:           number;
    userId:            number;
}

export interface Registration {
    id:               number;
    eventId:          number;
    userId:           number;
    registrationDate: null;
}

