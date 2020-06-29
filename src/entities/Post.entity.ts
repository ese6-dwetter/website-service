import User from "./User.entity";
import Like from "./Like.entity";

export default interface Post {
    id: string;
    content: string;
    datetime: Date;
    user: User;
    likes: Like[];
}