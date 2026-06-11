import './Logo.css'

interface LogoProps {
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
    return (
        <div className={`Logo Logo--${size}`} aria-label="BetterX">
            <div className="Logo-mark" aria-hidden="true">
                <svg className="Logo-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="bx-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#60a5fa" />
                            <stop offset="0.5" stopColor="#3b82f6" />
                            <stop offset="1" stopColor="#1d4ed8" />
                        </linearGradient>
                    </defs>
                    <rect width="40" height="40" rx="10" fill="url(#bx-grad)" />
                    <text
                        x="20"
                        y="26"
                        textAnchor="middle"
                        fill="white"
                        fontFamily="Inter, system-ui, sans-serif"
                        fontSize="15"
                        fontWeight="700"
                        letterSpacing="-1"
                    >
                        BX
                    </text>
                </svg>
            </div>
            {showText && <span className="Logo-text">BetterX</span>}
        </div>
    )
}
