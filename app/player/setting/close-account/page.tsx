'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { deleteUser } from '@/actions/user-actions';

export default function Page() {
	return (
		<form>
			<p className='text-muted-foreground mb-4'>
				Confirming account deletion is irreversible and removes all personalized
				content. Enter your password for verification. OAuth tokens will be
				revoked, and data erased. Thank you for being part of our community.
				Reach out to support for questions.
			</p>

			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant={'destructive'}>Delete Account</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className={cn(buttonVariants({ variant: 'destructive' }))}
							onClick={async () => {
								const res = await deleteUser();

								if (res.message === 'Done') {
									signOut();
								} else {
									// toast(res.message)
								}
							}}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</form>
	);
}
