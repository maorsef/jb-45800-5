import type Post from "../../models/Post";
import type PostDraft from "../../models/PostDraft";
import AuthAwareService from "./AuthAware";

export default class ProfileService extends AuthAwareService {
    async getProfile(): Promise<Post[]> {
        const { data } = await this.axiosInstance.get<Post[]>(`/profile`)
        return data
    }

    async getSinglePost(postId: string): Promise<Post> {

        const { data } = await this.axiosInstance.get<Post>(`/profile/${postId}`)
        return data
    }

    async deletePost(id: string): Promise<void> {
        await this.axiosInstance.delete(`/profile/${id}`)
    }

    async createPost(draft: PostDraft): Promise<Post> {
        const { data } = await this.axiosInstance.post<Post>(`/profile`, draft)
        return data
    }

    async updatePost(postId: string, draft: PostDraft): Promise<Post> {
        const { data } = await this.axiosInstance.patch<Post>(`/profile/${postId}`, draft)
        return data
    }
}