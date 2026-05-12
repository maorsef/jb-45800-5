import type User from "../../models/User";
import AuthAwareService from "./AuthAware";

export default class FollowersService extends AuthAwareService {
    async getFollowers(): Promise<User[]> {
        const { data } = await this.axiosInstance<User[]>(`/follows/followers`)
        return data
    }
}