'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<main className='flex h-[80vh] flex-col items-center justify-center gap-2 font-medium text-lg'>
			<h2 className='text-center'>
				{error ? error.message : 'Something went wrong!'}
			</h2>
			<Button onClick={() => reset()}>Try again</Button>
		</main>
	);
}
