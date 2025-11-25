import { CTAButton } from './CTAButton'
import { AlertCircle } from 'lucide-react'

interface ErrorDisplayProps {
  title?: string
  message: string
  onRetry?: () => void
  retryLabel?: string
  showIcon?: boolean
  className?: string
}

export function ErrorDisplay({
  title = 'An Error Occurred',
  message,
  onRetry,
  retryLabel = 'Try Again',
  showIcon = true,
  className = '',
}: ErrorDisplayProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 px-4 py-8 ${className}`}>
      {showIcon && (
        <div className="rounded-full bg-red-100 p-3">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
      )}
      
      <div className="text-center space-y-2 max-w-md">
        <h2 className="text-2xl font-bold text-red-600">{title}</h2>
        <p className="text-gray-600">{message}</p>
      </div>

      {onRetry && (
        <CTAButton
          type="button"
          onClick={onRetry}
          size="lg"
        >
          {retryLabel}
        </CTAButton>
      )}
    </div>
  )
}

