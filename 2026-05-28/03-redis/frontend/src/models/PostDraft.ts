import type BasePost from "./BasePost";

export default interface PostDraft extends BasePost {
    image: File
}