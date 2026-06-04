import AuthAwareService from "./AuthAware";
import type DraftImproveResponse from "../../models/DraftImproveResponse";
import type DraftGeneratePicResponse from "../../models/DraftGeneratePicResponse";

export default class DraftsService extends AuthAwareService {
    async improve(body: string): Promise<DraftImproveResponse> {
        const { data } = await this.axiosInstance.post<DraftImproveResponse>(`/drafts/improve`, { body })
        return data
    }

    async userImprove(body: string, prompt: string, chatId: string): Promise<DraftImproveResponse> {
        const { data } = await this.axiosInstance.post<DraftImproveResponse>(`/drafts/user-improve`, { body, prompt, chatId })
        return data
    }

    async generatePic(title: string, body: string): Promise<DraftGeneratePicResponse> {
        const { data } = await this.axiosInstance.post<DraftGeneratePicResponse>(`/drafts/pic`, { title, body })
        return data
    }
}

