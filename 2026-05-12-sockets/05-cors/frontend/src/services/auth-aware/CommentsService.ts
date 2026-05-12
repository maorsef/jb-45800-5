import type PostComment from "../../models/PostComment";
import type PostCommentDraft from "../../models/PostCommentDraft";
import AuthAwareService from "./AuthAware";

export default class CommentsService extends AuthAwareService {
    async createComment(postId: string, draft: PostCommentDraft): Promise<PostComment> {
        const { data } = await this.axiosInstance.post<PostComment>(`/comments/${postId}`, draft) 
        return data
    }
}