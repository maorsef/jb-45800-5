import './ContentGuidelinesModal.css'
import { contentGuidelinesText } from './content-guidelines-text'

interface ContentGuidelinesModalProps {
    onClose: () => void
}

export default function ContentGuidelinesModal(props: ContentGuidelinesModalProps) {
    const { onClose } = props

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
                <div className='ContentGuidelinesModal-content'>
                    {contentGuidelinesText}
                </div>
            </div>
        </div>
    )
}
