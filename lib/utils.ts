import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatSongTime(seconds: number) {
	const minutes = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const returnedSeconds = secs < 10 ? `0${secs}` : `${secs}`;
	return `${returnedMinutes}:${returnedSeconds}`;
}
