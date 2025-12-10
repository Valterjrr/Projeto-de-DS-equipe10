import React from 'react'
import './LoadingOverlay.css'

type LoadingOverlayProps = {
    text?: string
    children?: React.ReactNode
}

const LoadingOverlay = ({ text = 'Aguarde...', children }: LoadingOverlayProps) => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner" />
            <p style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{text}</p>
            {children}
        </div>
    )
}

export default LoadingOverlay
