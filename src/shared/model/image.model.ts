export interface IImage {
    type?: string;
    href?: string;
}

export class Image implements IImage {
    constructor(
        public type?: string,
        public href?: string
    ) { }
}