export class User {
    static fromFirestore({ email, uid, name }: any): User {
        return new User(uid, name, email);
    }

    constructor(
        public uid: string,
        public name: string,
        public email: string) {}
}
