import { Student } from "./student";
export class Response {
    constructor (public error:boolean,
        public code: number,
        public message: string,
        public data: Student[]){}
}
