import User from "./User.entity";

export default interface Profile {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    location: string;
    bio: string;
    followers: User[];
    following: User[];
}