import { Plus } from 'lucide-react';
import PlaylistModal from '../../playlist-modal/playlist-modal';

export default function NewPlaylist() {
	return (
		<PlaylistModal>
			<div>
				<button className='w-full aspect-square flex justify-center items-center bg-secondary rounded-sm'>
					<Plus className='w-8 h-8' />
				</button>

				<p className='text-sm my-1 font-medium'>Create a playlist</p>
			</div>
		</PlaylistModal>
	);
}
