import Link from 'next/link';
import SignInForm from './signin-form';

export default function FormSection() {
	return (
		<div className='lg:p-8 '>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>
						Access an account
					</h1>
					<p className='text-sm text-muted-foreground'>
						Enter your email below to access your account
					</p>
				</div>

				<SignInForm />
				<p className='px-8 text-center text-sm text-muted-foreground'>
					By clicking continue, you agree to our{' '}
					<Link
						href='/'
						className='underline underline-offset-4 hover:text-primary'
					>
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link
						href='/'
						className='underline underline-offset-4 hover:text-primary'
					>
						Privacy Policy
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
