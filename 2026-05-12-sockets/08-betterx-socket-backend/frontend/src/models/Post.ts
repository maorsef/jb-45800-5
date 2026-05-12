import type PostComment from "./PostComment";
import type PostDraft from "./PostDraft";
import type User from "./User";

export default interface Post extends PostDraft{
    id: string,
    userId: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    comments: PostComment[],
    user: User
}