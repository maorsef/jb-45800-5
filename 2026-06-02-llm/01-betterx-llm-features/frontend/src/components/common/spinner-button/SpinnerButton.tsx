import './SpinnerButton.css'
import spinnerSrc from '../../../assets/spinner.gif'

interface SpinnerButtonProps {
    isSpinning: boolean
    buttonText: string
    spinningText: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
    type?: 'button' | 'submit'
}

export default function SpinnerButton(props: SpinnerButtonProps) {

    const { isSpinning, buttonText, spinningText, onClick, className = '', type = 'submit' } = props

    return (
        <div className='SpinnerButton'>
            {isSpinning && (
                <span className='SpinnerButton-loading'>
                    {spinningText}
                    <img src={spinnerSrc} alt="" />
                </span>
            )}
            {!isSpinning && (
                <button type={type} className={className} onClick={onClick}>
                    {buttonText}
                </button>
            )}
        </div>
    )
}
