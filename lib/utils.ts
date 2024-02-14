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

export function formatTime(seconds: number): string {
	let hours: number = Math.floor(seconds / 3600);
	let minutes: number = Math.floor((seconds % 3600) / 60);
	let remainingSeconds: number = seconds % 60;

	// Format hours, minutes, and seconds
	const formattedHours = hours > 0 ? `${hours} hr` : '';
	const formattedMinutes = minutes > 0 ? `${minutes} min` : '';
	const formattedSeconds =
		remainingSeconds > 0 ? `${remainingSeconds} sec` : '';

	// Combine formatted parts
	const formattedTimeParts = [
		formattedHours,
		formattedMinutes,
		formattedSeconds,
	].filter(Boolean);
	return formattedTimeParts.join(' ');
}
