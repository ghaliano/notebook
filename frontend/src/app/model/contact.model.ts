export class Contact {
    id: number;
    name: string;
    email: string;
    adress: string;
    skype: string;
    photo: string;
    numbers: Number[];

}

export class Number {
    id: number;
    num: string;
    contact: Contact;
}
