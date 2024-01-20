import LoginPage from './login';
import TermsPrivacyText from './terms';
import RegisterPage from './register';

export default function FormSection({ type }: { type: 'login' | 'register' }) {
	const isRegister = type === 'register';
	const title = isRegister ? 'Create an account' : 'Welcome back!';
	const description = isRegister
		? 'Enter your email below to create your account'
		: 'Enter your login credentials below to access your account';

	return (
		<div className='lg:p-8 '>
			<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
				<div className='flex flex-col space-y-2 text-center'>
					<h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
					<p className='text-sm text-muted-foreground'>{description}</p>
				</div>

				{isRegister ? <RegisterPage /> : <LoginPage />}
				<TermsPrivacyText />
			</div>
		</div>
	);
}
