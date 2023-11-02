
export interface IEmailData {
    email?: string;
    message?: string;
}

export class EmailData implements IEmailData {
    constructor(
        public email?: string,
        public message?: string
    ) { }
}