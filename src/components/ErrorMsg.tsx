import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from './Button'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  retryText?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message,
    onRetry,
    retryText = 'Try Again'
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <FontAwesomeIcon
                icon="exclamation-triangle"
                className="text-4xl text-red-500 mb-4"
            />
            <h3 className="text-lg font-semibold text-zinc-700 dark:text-gray-100 mb-2">
                Something went wrong
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                {message}
            </p>
            {onRetry && (
                <Button onClick={onRetry} icon="redo" variant="outline">
                    {retryText}
                </Button>
            )}
        </div>
    )
}