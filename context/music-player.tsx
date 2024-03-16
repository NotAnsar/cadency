'use client';

import {
	AudioPlayerProps,
	initialValue,
	useAudioPlayer2,
} from '@/hooks/useNewAudioPlayer';

import React, { createContext, ReactNode, useContext } from 'react';

export const AudioPlayerContext = createContext<AudioPlayerProps>(initialValue);

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
	const audioPlayer = useAudioPlayer2();

	return (
		<AudioPlayerContext.Provider value={audioPlayer}>
			{children}
		</AudioPlayerContext.Provider>
	);
};

export function useMusicPlayerContext() {
	return useContext(AudioPlayerContext);
}
