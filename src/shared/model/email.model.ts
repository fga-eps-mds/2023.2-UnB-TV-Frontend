
export interface IEmailData {
    tema?: string;
    descricao?: string;
    quando?: string;
    local?: string;
    responsavel?: string;
    telefone_responsavel?: string;
    email_contato?: string;
    recipients?: string[];
}

export class EmailData implements IEmailData {
    constructor(
        public tema?: string,
        public descricao?: string,
        public quando?: string,
        public local?: string,
        public responsavel?: string,
        public telefone_responsavel?: string,
        public email_contato?: string,
        public recipients?: string[],
    ) { }
}