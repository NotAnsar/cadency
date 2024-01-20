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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long.' })
		.max(30, { message: 'Password must be no longer than 30 characters.' }),
	name: z
		.string()
		.min(3, { message: 'Name must be at least 3 characters long.' })
		.max(30, { message: 'Name must be no longer than 30 characters.' }),
	gender: z.enum(['male', 'female'], {
		required_error: 'Please select a valid gender (male or female).',
	}),
	dateBirth: z
		.date({
			required_error: 'A date of birth is required.',
		})
		.min(new Date('1900-01-01'), { message: 'Too old' })
		.max(
			new Date(
				new Date().getFullYear() - 13,
				new Date().getMonth(),
				new Date().getDate()
			),
			{ message: 'You must be at least 13 years old.' }
		),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RegisterPage({
	className,
	...props
}: UserAuthFormProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
			gender: undefined,
			dateBirth: undefined,
		},
	});
	const searchParams = useSearchParams();

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
						name='name'
						render={({ field }) => (
							<FormItem className='grid gap-1'>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										type='name'
										placeholder='John'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
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
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='grid gap-1'>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										type='password'
										placeholder='********'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='dateBirth'
						render={({ field }) => (
							<FormItem className='flex flex-col '>
								<FormLabel>Date of birth</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant={'outline'}
											className={cn(
												' justify-start text-left font-normal w-full',
												!field.value && 'text-muted-foreground'
											)}
										>
											<CalendarIcon className='mr-2 h-4 w-4' />
											{field.value ? (
												format(field.value, 'PPP')
											) : (
												<span>Pick a date</span>
											)}
										</Button>
									</PopoverTrigger>
									<PopoverContent align='start' className=' w-auto p-0'>
										<Calendar
											mode='single'
											captionLayout='dropdown-buttons'
											selected={field.value}
											onSelect={field.onChange}
											fromYear={1960}
											toYear={new Date().getFullYear()}
										/>
									</PopoverContent>
								</Popover>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='gender'
						render={({ field }) => (
							<FormItem className='grid gap-1'>
								<FormLabel>Gender</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className='flex gap-4 space-y-1'
									>
										<FormItem className='flex items-center space-x-3 space-y-0'>
											<FormControl>
												<RadioGroupItem value='male' />
											</FormControl>
											<FormLabel className='font-normal'>Male</FormLabel>
										</FormItem>
										<FormItem className='flex items-center space-x-3 space-y-0'>
											<FormControl>
												<RadioGroupItem value='female' />
											</FormControl>
											<FormLabel className='font-normal'>Female</FormLabel>
										</FormItem>
									</RadioGroup>
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
			<div className='flex justify-between gap-2 w-full'>
				<Button
					variant='outline'
					type='button'
					className='w-full'
					disabled={isLoading}
					onClick={() => {
						setIsLoading(true);
						signIn('google', { callbackUrl: '/player' });
					}}
				>
					{isLoading ? (
						<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<Icons.google className='mr-2 h-4 w-4' />
					)}{' '}
					Google
				</Button>
				<Button
					variant='outline'
					type='button'
					disabled={isLoading}
					className='w-full'
					onClick={() => {
						setIsLoading(true);
						signIn('github', { callbackUrl: '/player' });
					}}
				>
					{isLoading ? (
						<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
					) : (
						<Icons.gitHub className='mr-2 h-4 w-4' />
					)}{' '}
					GitHub
				</Button>
			</div>
		</div>
	);
}
