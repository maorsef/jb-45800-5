import { profanityGuidelinesText } from "./profanity-guidelines-text";
import { medicalGuidelinesText } from "./medical-guidelines-text";
import { cryptoGuidelinesText } from "./crypto-guidelines-text";

export interface ContentGuidelineDocument {
    subject: string
    text: string
}

export const contentGuidelineDocuments: ContentGuidelineDocument[] = [
    { subject: 'profanity', text: profanityGuidelinesText },
    { subject: 'medical', text: medicalGuidelinesText },
    { subject: 'crypto', text: cryptoGuidelinesText },
]
