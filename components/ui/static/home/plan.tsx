import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { buttonVariants } from '../../button';
import Link from 'next/link';
import Wrapper from '../wrapper';

export default function PlanSection() {
	return (
		<Wrapper className='pt-20 text-center mb-10' id='pricing'>
			<h2 className='text-4xl font-medium md:text-5xl'>
				{"Choose the plan that's right for you."}
			</h2>
			<p className='text-sm md:text-base mt-6 text-muted-foreground'>
				Join Our Premium Subscription for Uninterrupted Melodies and Excelusive
				Perks
			</p>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 text-left'>
				{PLANS.map((plan, i) => (
					<article
						key={i}
						className={cn(
							'bg-[#fdfdfd] dark:bg-[#181818] rounded-lg px-6 py-8 ',
							plan.best && 'border-2 border-primary ',
							i === 1 && 'md:-translate-y-12  md:z-10 '
						)}
					>
						<div className='space-y-4 pb-2 border-b-2 h-48'>
							<h3 className='text-xl font-medium'>{plan.title}</h3>

							<h4 className='text-muted-foreground'>
								<span className='text-foreground font-medium text-4xl'>
									${plan.price}
								</span>
								/month
							</h4>
							<p className='text-muted-foreground text-sm'>
								{plan.description}
							</p>
						</div>
						<ul className='mt-8 h-52  '>
							{plan.perks.map((perk, i) => (
								<li key={i} className='flex my-2 gap-4 text-sm items-center'>
									<span className='w-6 h-6'>
										<CheckCircle2 className='text-muted-foreground ' />
									</span>
									{perk}
								</li>
							))}
						</ul>
						<Link
							href='/#'
							className={cn(
								buttonVariants({ variant: 'hero_secondary', size: 'hero' }),
								'w-full rounded-lg'
							)}
						>
							Choose plan
						</Link>
					</article>
				))}
			</div>
		</Wrapper>
	);
}

const PLANS = [
	{
		title: 'Free Plan',
		description:
			'Explore the app with basic features and enjoy music with occasional ads.',
		perks: ['Limited access to features', 'Occasional ads', 'Free forever'],
		price: 0, // Free plan is priced at $0
		best: false,
	},
	{
		title: 'Premium Plan',
		description:
			'Ad-free experience, unlimited access to a vast music library, high-quality streaming, and offline listening.',
		perks: [
			'Ad-free experience',
			'Unlimited access to a vast music library',
			'High-quality streaming',
			'Offline listening',
		],
		price: 9.99, // Price for the Premium Plan
		best: true,
	},
	{
		title: 'Family Plan',
		description:
			'All benefits of the Premium Plan, shared access for multiple family members, and centralized billing.',
		perks: [
			'Ad-free experience',
			'Shared access for multiple family members',
			'Centralized billing',
		],
		price: 14.99, // Price for the Family Plan
		best: false,
	},
];
