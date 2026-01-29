'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const InformlyWidget = () => {
	const searchParams = useSearchParams()
	const showWidget = searchParams.get('widget') === '1'

	useEffect(() => {
		if (!showWidget) return

		const script = document.createElement('script')
		script.src = process.env.NEXT_PUBLIC_INFORMLY_WIDGET_SRC || ''
		script.setAttribute('data-informly-api-url', process.env.NEXT_PUBLIC_INFORMLY_API_URL || '')
		script.setAttribute('data-informly-widget-key', process.env.NEXT_PUBLIC_INFORMLY_WIDGET_KEY || '')
		document.head.appendChild(script)

		return () => {
			document.head.removeChild(script)
		}
	}, [showWidget])

	return null
}

export default InformlyWidget
