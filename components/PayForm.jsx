'use client'
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk'
import { submitPayment } from 'app/actions/actions'

export default function PayForm() {
	const appId = 'process.env.APP_ID'
	const locationId = 'process.env.LOCATION_ID'

	return (
		<PaymentForm
			applicationId={appId}
			locationId={locationId}
			cardTokenizeResponseReceived={async (token) => {
				const result = await submitPayment(token.token)
				console.log(result)
			}}
		>
			<CreditCard />
		</PaymentForm>
	)
}
