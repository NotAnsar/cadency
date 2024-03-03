'use client';

import { State, updateUser } from '@/actions/user-actions2';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@prisma/client';
import { useFormState } from 'react-dom';

export default function SettingFormServer({ user }: { user: User }) {
	const updateUserWithEmail = updateUser.bind(null, user.email);
	const initialState: State = { message: null, errors: {} };
	const [state, dispatch] = useFormState(updateUserWithEmail, initialState);

	return (
		<form action={dispatch} className='grid gap-4'>
			<div className='grid gap-2'>
				<Label>Name</Label>

				<Input
					type='name'
					name='name'
					placeholder='John'
					defaultValue={user.name || ''}
				/>

				{state?.errors?.name &&
					state.errors.name.map((error: string) => (
						<p className='text-sm font-medium text-destructive' key={error}>
							{error}
						</p>
					))}
			</div>

			<Button /* disabled={isLoading} */ className='mt-4 me-auto'>
				{/* {isLoading && (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						)} */}
				Update profile
			</Button>
		</form>
	);
}
