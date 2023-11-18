export interface IComment {
    id?: number;
    user_id?: number;
    user_name?: string;
    video_id?: number;
    content?: string;
    created_at?: Date;
}

export class Comment implements IComment {
    constructor(
        public id?: number,
        public user_id?: number,
        public user_name?: string,
        public video_id?: number,
        public content?: string,
        public created_at?: Date
    ) { }
}