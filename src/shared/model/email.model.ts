
export interface IEmail {
    tema?: string;
    descricao?: string;
    quando?: string;
    local?: string;
    responsavel?: string;
    telefone_responsavel?: string;
    email_contato?: string;
}

export class Email implements IEmail {
    constructor(
        public tema?: string,
        public descricao?: string,
        public quando?: string,
        public local?: string,
        public responsavel?: string,
        public telefone_responsavel?: string,
        public email_contato?: string
    ) { }
}