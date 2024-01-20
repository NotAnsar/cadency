'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { useState } from 'react';

const formSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	// password: z
	// 	.string()
	// 	.min(6, { message: 'Password must be at least 6 characters long.' })
	// 	.max(30, { message: 'Password must be no longer than 30 characters.' }),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginPage({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: '' /* password: '' */ },
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='grid gap-1'>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='name@example.com'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button disabled={isLoading} className='mt-4'>
						{isLoading && (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						)}
						Sign In with Email
					</Button>
				</form>
			</Form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						Or continue with
					</span>
				</div>
			</div>
			<form className='grid gap-3 w-full'>
				<Button variant='outline' type='button' disabled={isLoading}>
					{isLoading ? (
						<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<Icons.google className='mr-2 h-4 w-4' />
					)}{' '}
					Google
				</Button>
				<Button variant='outline' type='button' disabled={isLoading}>
					{isLoading ? (
						<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<Icons.gitHub className='mr-2 h-4 w-4' />
					)}{' '}
					GitHub
				</Button>
			</form>
		</div>
	);
}
