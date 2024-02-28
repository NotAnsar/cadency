'use client';

import { updateUserInfo } from '@/actions/user-actions';
import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	FormControl,
	FormMessage,
	FormField,
	FormItem,
	Form,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '../../use-toast';

const formSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
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

export default function SettingForm({
	email,
	name,
	birthDate,
	gender,
}: {
	email: string;
	name: string | null;
	birthDate: Date | null;
	gender: 'male' | 'female' | null;
}) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email,
			dateBirth: birthDate || undefined,
			gender: gender || undefined,
			name: name || undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		const res = await updateUserInfo(values, email);
		if (res?.message) {
			toast({
				title: 'Something went Wrong',
				description: res.message,
				variant: 'destructive',
			});
		} else {
			toast({
				title: 'Data updated',
				description: 'Your Information Was Updated Successfully',
			});
		}

		setIsLoading(false);
	}
	return (
		<Form {...form}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='grid gap-2'>
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
										disabled={true}
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
											disabled={isLoading}
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

					<Button disabled={isLoading} className='mt-4 me-auto'>
						{isLoading && (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						)}
						Update profile
					</Button>
				</form>
			</Form>
		</Form>
	);
}
