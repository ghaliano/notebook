export class Contact {
    id: number;
    name: string;
    email: string;
    adress: string;
    skype: string;
    photo: string;
    numbers: Number[];
    selected: boolean;
}

export class Number {
    id: number;
    num: string;
    contact: Contact;
    isUnderDelete: boolean;
}
