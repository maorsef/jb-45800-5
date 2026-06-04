import './ContentGuidelinesModal.css'
import { contentGuidelineDocuments } from './content-guidelines'
import { useState } from 'react'

interface ContentGuidelinesModalProps {
    onClose: () => void
}

const tabLabels: Record<string, string> = {
    profanity: 'Profanity',
    medical: 'Medical',
    crypto: 'Crypto',
}

export default function ContentGuidelinesModal(props: ContentGuidelinesModalProps) {
    const { onClose } = props
    const [activeTab, setActiveTab] = useState(contentGuidelineDocuments[0].subject)

    const activeDocument = contentGuidelineDocuments.find((document) => document.subject === activeTab)

    return (
        <div className='ContentGuidelinesModal-overlay' onClick={onClose}>
            <div
                className='ContentGuidelinesModal'
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="content-guidelines-title"
            >
                <div className='ContentGuidelinesModal-header'>
                    <h2 id="content-guidelines-title">Content Guidelines</h2>
                    <button type="button" onClick={onClose}>Close</button>
                </div>

                <div className='ContentGuidelinesModal-tabs' role="tablist">
                    {contentGuidelineDocuments.map((document) => (
                        <button
                            key={document.subject}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === document.subject}
                            className={activeTab === document.subject ? 'active' : ''}
                            onClick={() => setActiveTab(document.subject)}
                        >
                            {tabLabels[document.subject] ?? document.subject}
                        </button>
                    ))}
                </div>

                <div className='ContentGuidelinesModal-content' role="tabpanel">
                    {activeDocument?.text}
                </div>
            </div>
        </div>
    )
}
