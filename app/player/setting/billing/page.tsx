import { Button } from '@/components/ui/button';

type PLAN = 'FREE' | 'PREMIUM' | 'FAMILY';

export default function Page() {
	const plan: PLAN = 'FREE';

	return (
		<>
			<h4 className='text-xl font-semibold '>Subscription Plan</h4>
			<p className='text-muted-foreground text-sm mb-4'>
				You are currently on the{' '}
				<span className='text-primary font-semibold '>{plan}</span> plan.
			</p>

			{plan === 'FREE' && (
				<p className=''>
					The Free plan includes basic access to the app with limited features.
				</p>
			)}

			{/* {plan === 'PREMIUM' && (
				<p>
					The Premium plan offers an ad-free experience, unlimited access to a
					vast music library, high-quality streaming, and offline listening.
				</p>
			)}

			{plan === 'FAMILY' && (
				<p>
					The Family plan includes all the benefits of the Premium plan, shared
					access for multiple family members, and centralized billing.
				</p>
			)} */}
			<Button className='mt-4'>Manage Subscription</Button>
		</>
	);
}
