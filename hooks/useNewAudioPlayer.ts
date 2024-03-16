import { Track } from '@/types/music';
import {
	useState,
	useCallback,
	useRef,
	MutableRefObject,
	SyntheticEvent,
} from 'react';

export type AudioPlayerProps = {
	isPlaying: boolean;
	currentTime: number;
	togglePlay: () => void;
	OnEnded: () => void;
	handleCurrentTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
	audioRef: MutableRefObject<HTMLAudioElement | null>;
	progressBarRef: MutableRefObject<HTMLInputElement | null>;
	play: () => void;
	pause: () => void;
	playNext: () => void;
	playPrevious: () => void;

	playNewSong: (song: Track[], index?: number) => void;
	currentIndex: number;
	songs: Track[];

	handleVolume: (e: React.ChangeEvent<HTMLInputElement>) => void;
	toggleMute: () => void;
	volume: number;
	mute: boolean;

	onLoadedMetadata: (e: SyntheticEvent<HTMLAudioElement, Event>) => void;
};

export const initialValue: AudioPlayerProps = {
	isPlaying: false,
	currentTime: 0,
	playNewSong: (song: Track[], index?: number) => {},
	togglePlay: () => {},

	playNext: () => {},
	playPrevious: () => {},
	handleCurrentTime: (e: React.ChangeEvent<HTMLInputElement>) => {},

	progressBarRef: { current: null },
	audioRef: { current: null },
	play: () => {},
	pause: () => {},

	currentIndex: 0,
	songs: [],

	handleVolume: (e: React.ChangeEvent<HTMLInputElement>) => {},
	toggleMute: () => {},
	volume: NaN,
	mute: false,

	OnEnded: () => {},
	onLoadedMetadata: (e: SyntheticEvent<HTMLAudioElement, Event>) => {},
};

export const useAudioPlayer2 = (): AudioPlayerProps => {
	const [isPlaying, setIsPlaying] = useState(initialValue.isPlaying);
	const [currentTime, setCurrentTime] = useState(initialValue.currentTime);
	const animationRef = useRef<number | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [songs, setSongs] = useState<Track[]>([]);

	const [volume, setVolume] = useState<number>(1);
	const [mute, setMuted] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(
		initialValue.audioRef.current
	);
	const progressBarRef = useRef<HTMLInputElement>(
		initialValue.progressBarRef.current
	);

	function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target;
		const volume = Number(value);
		if (audioRef.current) {
			audioRef.current.volume = volume;
			setVolume(volume);
			audioRef.current.muted = false;
			setMuted(false);
		}
	}

	function toggleMute() {
		if (audioRef.current) {
			if (mute) {
				audioRef.current.muted = false;
				setMuted(false);
			} else {
				audioRef.current.muted = true;
				setMuted(true);
			}
		}
	}

	function togglePlay() {
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

	const updateCurrentTime = (value: number) => {
		progressBarRef.current!.value = '' + value;
		setCurrentTime(value);
	};

	const handleCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		if (audioRef.current) {
			audioRef.current.currentTime = value;
			setCurrentTime(value);
		}
	};

	const whilePlaying = () => {
		if (audioRef.current && progressBarRef.current) {
			updateCurrentTime(audioRef.current.currentTime);
			animationRef.current = requestAnimationFrame(whilePlaying);
		}
	};

	const playNewSong = (tracks: Track[], index: number = 0) => {
		setSongs(tracks);
		setCurrentIndex(index);
	};

	function OnEnded() {
		const isLastSong = currentIndex + 1 >= songs.length;
		setCurrentIndex(isLastSong ? currentIndex : currentIndex + 1);

		if (isLastSong) pause();
		else play();
	}

	const playNext = () => {
		const nextIndex = (currentIndex + 1) % songs.length;
		setCurrentIndex(nextIndex);
	};

	function playPrevious() {
		const previousIndex =
			currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
		setCurrentIndex(previousIndex);
	}

	function onLoadedMetadata(e: SyntheticEvent<HTMLAudioElement, Event>) {
		if (progressBarRef.current) {
			progressBarRef.current.max = e.currentTarget.duration + '';
		}
		play();
	}

	return {
		// refs
		audioRef,
		progressBarRef,
		// play pause
		play,
		pause,
		togglePlay,
		isPlaying,
		playNext,
		playPrevious,

		// durration
		currentTime,
		handleCurrentTime,

		// songs
		currentIndex,
		songs,
		playNewSong,
		OnEnded,
		onLoadedMetadata,

		// volume
		handleVolume,
		mute,
		toggleMute,
		volume,
	};
};
