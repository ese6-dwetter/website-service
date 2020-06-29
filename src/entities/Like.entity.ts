import User from "./User.entity";

export default interface Like {
    datetime: Date;
    user: User;
}