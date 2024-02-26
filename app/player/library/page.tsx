import { getArtist } from '@/lib/db';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function page() {
	const favorites = await getArtist('4050205');

	if (!favorites) {
		redirect('/player');
	}

	return (
		<div className='px-8 py-6 mb-16'>
			<h1 className='text-4xl font-semibold '>Library</h1>
			<p className='text-muted-foreground mt-2 text-[15px] '>
				Explore your favorite albums, artists, and songs. Create your own
				playlists.
			</p>

			<div className='my-6'>
				<div className='flex justify-between'>
					<h2 className='text-[22px] font-semibold mb-4'>Favorite Albums</h2>
					<Link
						href={'/player/library/albums'}
						className='text-primary text-sm font-semibold hover:underline'
					>
						View all
					</Link>
				</div>
				<div className=' grid grid-cols-3 md:grid-cols-5 gap-5'>
					{favorites.albums.slice(0, 5).map((album) => (
						<div key={album.id} className=''>
							<Link href={`/player/album/${album.id}`}>
								<Image
									alt={album.title}
									src={album.cover_medium}
									height={200}
									width={200}
									className='w-auto h-auto border border-border rounded-sm'
								/>
							</Link>
							<div>
								<p className='text-sm my-1 font-medium'>{album.title}</p>
								<span className='text-xs mb-1 text-muted-foreground block'>
									by&nbsp;
									<Link
										href={`/player/artist/${album.artist.id}`}
										className='hover:underline'
									>
										{album.artist.name}
									</Link>
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='mb-6'>
				<div className='flex justify-between'>
					<h2 className='text-[22px] font-semibold mb-4'>Followed Artists</h2>
					<Link
						href={'/player/library/artists'}
						className='text-primary text-sm font-semibold hover:underline'
					>
						View all
					</Link>
				</div>
				<div className='grid  grid-cols-3 md:grid-cols-5 gap-5'>
					{favorites.related.slice(0, 5).map((artist) => (
						<div key={artist.id} className=''>
							<Link href={`/player/artist/${artist.id}`}>
								<Image
									alt={artist.name}
									src={artist.picture_medium}
									height={200}
									width={200}
									className='w-auto h-auto border border-border rounded-full'
								/>
							</Link>

							<Link
								href={`/player/artist/${artist.id}`}
								className='hover:underline text-sm text-center block mt-2'
							>
								{artist.name}
							</Link>
							<p className='text-xs text-muted-foreground text-center'>
								{artist.nb_fan} fans
							</p>
						</div>
					))}
				</div>
			</div>
			<div className='mb-6'>
				<div className='flex justify-between'>
					<h2 className='text-[22px] font-semibold mb-4'>Favorite Songs</h2>
					<Link
						href={'/player/library/songs'}
						className='text-primary text-sm font-semibold hover:underline'
					>
						View all
					</Link>
				</div>

				<div className=' grid grid-cols-3 md:grid-cols-5 gap-5'>
					{favorites.songs.slice(0, 5).map((song) => (
						<div key={song.id} className=''>
							<Link href={`/player/album/${song.album.id}`}>
								<Image
									alt={song.title}
									src={song.album.cover_medium}
									height={200}
									width={200}
									className='w-auto h-auto border border-border rounded-sm'
								/>
							</Link>
							<div>
								<p className='text-sm my-1 font-medium'>{song.title}</p>
								<span className='text-xs mb-1 text-muted-foreground block'>
									by&nbsp;
									{song.contributors.map((a, i) => (
										<span key={a.id}>
											<Link
												href={`/player/artist/${a.id}`}
												className='hover:underline'
											>
												{a.name}
											</Link>
											{`${song.contributors.length - 1 === i ? '' : ', '}`}
										</span>
									))}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='mb-6'>
				<div className='flex justify-between'>
					<h2 className='text-[22px] font-semibold mb-4'>Your Playlists</h2>
					<Link
						href={'/player/library/playlists'}
						className='text-primary text-sm font-semibold hover:underline'
					>
						View all
					</Link>
				</div>

				<div className=' grid grid-cols-3 md:grid-cols-5 gap-5'>
					<div>
						<button className='w-full aspect-square flex justify-center items-center bg-secondary rounded-sm'>
							<Plus className='w-8 h-8' />
						</button>

						<p className='text-sm my-1 font-medium'>Create a playlist</p>
					</div>
					{favorites.songs.slice(0, 4).map((song) => (
						<div key={song.id} className=''>
							<Link href={`/player/album/${song.album.id}`}>
								<Image
									alt={song.title}
									src={song.album.cover_medium}
									height={200}
									width={200}
									className='w-auto h-auto border border-border rounded-sm'
								/>
							</Link>
							<div>
								<p className='text-sm my-1 font-medium'>{song.title}</p>
								<span className='text-xs mb-1 text-muted-foreground block'>
									by&nbsp;
									{song.contributors.map((a, i) => (
										<span key={a.id}>
											<Link
												href={`/player/artist/${a.id}`}
												className='hover:underline'
											>
												{a.name}
											</Link>
											{`${song.contributors.length - 1 === i ? '' : ', '}`}
										</span>
									))}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
