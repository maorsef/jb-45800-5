import type Post from "../../models/Post";
import AuthAwareService from "./AuthAware";

export default class FeedService extends AuthAwareService {
    async getFeed(): Promise<Post[]> {
        const { data } = await this.axiosInstance.get<Post[]>(`/feed`)
        return data
    }
}