import { profanityGuidelinesText } from "./profanity-guidelines-text";
import { medicalGuidelinesText } from "./medical-guidelines-text";
import { cryptoGuidelinesText } from "./crypto-guidelines-text";

const contentGuidelineDocuments = [
    profanityGuidelinesText,
    medicalGuidelinesText,
    cryptoGuidelinesText,
]

export const allContentGuidelinesText = contentGuidelineDocuments.join('\n\n---\n\n')
