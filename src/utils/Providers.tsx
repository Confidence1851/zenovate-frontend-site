'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import React, { useState } from 'react'

export default function Provider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient())
	const [showDevtools, setShowDevtools] = React.useState(false);

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<GoogleReCaptchaProvider
					reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
					scriptProps={{
						async: false,
						defer: false,
						appendTo: 'head',
						nonce: undefined,
					}}
				>
					{/* <ReactQueryDevtools initialIsOpen={false} /> */}
					{showDevtools && <ReactQueryDevtools initialIsOpen={false} />}
					{children}
				</GoogleReCaptchaProvider>
			</QueryClientProvider>
		</SessionProvider>
	)
}
