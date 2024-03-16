import VolumeSection, { VolumeSkeleton } from './volume-section';
import SongDetails from './song-details';

import { getUserLikedTracks } from '@/actions/user-actions';
import AudioPlaybar from './audio-playbar';

export default async function AudioPlayer() {
	const likedTracks = await getUserLikedTracks();

	return (
		<div className='h-20 bg-background w-full sticky backdrop-blur-sm border-t-4 border-primary flex justify-between items-center px-3 focus-visible:outline-none gap-4'>
			<SongDetails />

			<AudioPlaybar />
			<div className='hidden lg:grid'>
				{likedTracks ? (
					<VolumeSection likedTracks={likedTracks} />
				) : (
					<VolumeSkeleton />
				)}
			</div>
		</div>
	);
}
