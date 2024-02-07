import { useState, useCallback, useRef, MutableRefObject } from 'react';

export const useAudioPlayer = (
	audioRef: MutableRefObject<HTMLAudioElement | null>,
	progressBarRef: MutableRefObject<HTMLInputElement | null>
) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const animationRef = useRef<number>();

	const onLoadedMetadata = useCallback(() => {
		if (audioRef.current) {
			const seconds = Math.floor(audioRef.current.duration);
			setDuration(seconds);
		}
	}, [audioRef]);

	function tooglePlay() {
		if (isPlaying) pause();
		else play();
	}

	function pause() {
		audioRef.current?.pause();
		cancelAnimationFrame(Number(animationRef.current));
		setIsPlaying(false);
	}

	function play() {
		audioRef.current?.play();
		animationRef.current = requestAnimationFrame(whilePlaying);
		setIsPlaying(true);
	}

	function restart() {
		cancelAnimationFrame(Number(animationRef.current));
		setIsPlaying(false);
		updateCurrentTime(0);
	}

	function updateCurrentTime(value: number) {
		progressBarRef.current!.value = '' + value;
		setCurrentTime(value);
	}

	function whilePlaying() {
		if (audioRef.current && progressBarRef.current) {
			updateCurrentTime(audioRef.current.currentTime);
			animationRef.current = requestAnimationFrame(whilePlaying);
			if (+progressBarRef.current?.value >= duration) {
				restart();
			}
		}
	}

	function handleCurrentTime(e: React.ChangeEvent<HTMLInputElement>) {
		const value = Number(e.target.value);
		if (audioRef.current) {
			audioRef.current.currentTime = value;
			setCurrentTime(value);
		}
	} 

	return {
		isPlaying,
		duration,
		currentTime,
		tooglePlay,
		onLoadedMetadata,
		handleCurrentTime,
	};
};
