import { Playlist } from '@/types/playlist';
import { ListMusic, User } from 'lucide-react';
import Image from 'next/image';

export default function PlaylistDetails({ playlist }: { playlist: Playlist }) {
	return (
		<>
			<div className='w-full flex gap-4'>
				<div className='relative'>
					{playlist.image ? (
						<Image
							alt={playlist.name}
							src={playlist.image}
							className='rounded-sm border border-border aspect-square object-cover'
							width={224}
							height={224}
						/>
					) : (
						<div className='w-56 h-56 aspect-square border border-border rounded-sm bg-secondary flex items-center justify-center'>
							<ListMusic className='w-16 h-16 text-muted-foreground' />
						</div>
					)}
				</div>
				<div className='space-y-2 mt-auto mb-2'>
					<span
						className={'text-xs rounded-sm uppercase font-medium text-white'}
					>
						Playlist
					</span>
					<h2 className='text-5xl font-bold'>{playlist.name}</h2>
					{playlist.description && (
						<p className='text-sm text-muted-foreground'>
							{playlist.description}
						</p>
					)}
					<div className='flex gap-2 items-center'>
						{playlist.user.image ? (
							<Image
								alt={playlist.user.name || ''}
								src={playlist.user.image}
								className='rounded-full aspect-square object-cover'
								width={24}
								height={24}
							/>
						) : (
							<div className='w-6 h-6 aspect-square border border-border bg-secondary flex items-center justify-center rounded-full'>
								<User className='w-4 h-4 text-muted-foreground' />
							</div>
						)}

						<span className='text-sm hover:underline cursor-pointer'>
							{playlist.user.name}
						</span>
					</div>

					<p className='text-[15px] text-muted-foreground'>
						{`${playlist?._count.tracks} tracks`}
					</p>
				</div>
			</div>
		</>
	);
}
