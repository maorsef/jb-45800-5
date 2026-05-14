import type BasePost from "./BasePost";
import type PostComment from "./PostComment";
import type User from "./User";

export default interface Post extends BasePost{
    id: string,
    userId: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    comments: PostComment[],
    user: User
}