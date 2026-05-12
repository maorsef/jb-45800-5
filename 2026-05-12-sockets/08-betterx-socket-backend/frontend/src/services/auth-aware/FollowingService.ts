import type User from "../../models/User";
import AuthAwareService from "./AuthAware";

export default class FollowingService extends AuthAwareService {
    async getFollowing(): Promise<User[]> {
        const { data } = await this.axiosInstance<User[]>(`/follows/following`)
        return data
    }

    async unfollow(userId: string): Promise<void> {
        await this.axiosInstance.post(`/follows/unfollow/${userId}`)
    }

    async follow(userId: string): Promise<void> {
        await this.axiosInstance.post(`/follows/follow/${userId}`)
    }

}