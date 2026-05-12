import type PostCommentDraft from "./PostCommentDraft";
import type User from "./User";

export default interface PostComment extends PostCommentDraft{
    id: string,
    postId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    user: User
}