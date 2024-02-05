import { useState, MutableRefObject } from 'react';

export const useVolume = (
	audioRef: MutableRefObject<HTMLAudioElement | null>
) => {
	const [volume, setvolume] = useState<number>(audioRef.current!.volume);
	const [mute, setmuted] = useState(false);

	function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target;
		const volume = Number(value);
		if (audioRef.current) {
			audioRef.current.volume = volume;
			setvolume(volume);
			audioRef.current.muted = false;
			setmuted(false);
		}
	}

	function toggleMute() {
		if (audioRef.current) {
			if (mute) {
				audioRef.current.muted = false;
				setmuted(false);
			} else {
				audioRef.current.muted = true;
				setmuted(true);
			}
		}
	}

	return { toggleMute, handleVolume, mute, volume };
};
