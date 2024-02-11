'use client';

import { Button } from '@/components/ui/button';

import { useForm } from 'react-hook-form';

import {
	FormControl,
	FormMessage,
	FormField,
	FormItem,
	Form,
	FormLabel,
	FormDescription,
} from '@/components/ui/form';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const appearanceFormSchema = z.object({
	theme: z.enum(['light', 'dark'], {
		required_error: 'Please select a theme.',
	}),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

const defaultValues: Partial<AppearanceFormValues> = {
	theme: 'dark',
};
export default function Page() {
	const { theme, setTheme } = useTheme();

	const form = useForm<AppearanceFormValues>({
		resolver: zodResolver(appearanceFormSchema),
		defaultValues,
	});

	useEffect(() => {
		if (theme === 'light' || theme === 'dark') form.reset({ theme: theme });
	}, [theme, form]);

	function onSubmit(data: AppearanceFormValues) {
		setTheme(data.theme);
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					{/* <FormField
						control={form.control}
						name='font'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Font</FormLabel>
								<div className='relative w-max'>
									<FormControl>
										<select
											className={cn(
												buttonVariants({ variant: 'outline' }),
												'w-[200px] appearance-none font-normal'
											)}
											{...field}
										>
											<option value='inter'>Inter</option>
											<option value='manrope'>Manrope</option>
											<option value='system'>System</option>
										</select>
									</FormControl>
									<ChevronDownIcon className='absolute right-3 top-2.5 h-4 w-4 opacity-50' />
								</div>
								<FormDescription>
									Set the font you want to use in the dashboard.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					<FormField
						control={form.control}
						name='theme'
						render={({ field }) => (
							<FormItem className='space-y-1'>
								<FormLabel>Theme</FormLabel>
								<FormDescription>
									Select the theme for the dashboard.
								</FormDescription>
								<FormMessage />
								<RadioGroup
									onValueChange={field.onChange}
									value={field.value}
									className='grid max-w-md grid-cols-2 gap-8 pt-2'
								>
									<FormItem>
										<FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
											<FormControl>
												<RadioGroupItem value='light' className='sr-only' />
											</FormControl>
											<div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent'>
												<div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
													<div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
														<div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
														<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
													</div>
													<div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
														<div className='h-4 w-4 rounded-full bg-[#ecedef]' />
														<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
													</div>
													<div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
														<div className='h-4 w-4 rounded-full bg-[#ecedef]' />
														<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
													</div>
												</div>
											</div>
											<span className='block w-full p-2 text-center font-normal'>
												Light
											</span>
										</FormLabel>
									</FormItem>
									<FormItem>
										<FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
											<FormControl>
												<RadioGroupItem value='dark' className='sr-only' />
											</FormControl>
											<div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground'>
												<div className='space-y-2 rounded-sm bg-slate-950 p-2'>
													<div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-sm'>
														<div className='h-2 w-[80px] rounded-lg bg-slate-400' />
														<div className='h-2 w-[100px] rounded-lg bg-slate-400' />
													</div>
													<div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
														<div className='h-4 w-4 rounded-full bg-slate-400' />
														<div className='h-2 w-[100px] rounded-lg bg-slate-400' />
													</div>
													<div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
														<div className='h-4 w-4 rounded-full bg-slate-400' />
														<div className='h-2 w-[100px] rounded-lg bg-slate-400' />
													</div>
												</div>
											</div>
											<span className='block w-full p-2 text-center font-normal'>
												Dark
											</span>
										</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormItem>
						)}
					/>

					<Button type='submit'>Update preferences</Button>
				</form>
			</Form>
		</>
	);
}
