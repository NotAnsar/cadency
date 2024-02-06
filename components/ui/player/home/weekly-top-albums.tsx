import Image from 'next/image';

type Albums = {
	key: string;
	title: string;
	subtitle: string;
	image: string;
	text: string;
};
export default function WeeklyTopAlbums({ albums }: { albums: Albums[] }) {
	return (
		<div className='w-full'>
			<h2 className='text-xl font-medium mb-4 tracking-tight'>
				Weekly Top Albums
			</h2>

			<div className='flex items-center justify-between h-[200px] overflow-y-hidden flex-wrap'>
				{albums.map((album: Albums) => (
					<div key={album.key} className='w-[150px] h-[200px]'>
						<div className='overflow-hidden rounded-md'>
							<Image
								src={album.image}
								alt={album.text}
								width={150}
								height={150}
								className='rounded-md h-auto w-auto object-cover transition-all hover:scale-105 aspect-square'
							/>
						</div>
						<p className='leading-none mt-2 text-nowrap overflow-hidden text-[15px] font-medium'>
							{album.title}
						</p>
						<p className='text-xs text-muted-foreground mt-1'>
							{album.subtitle}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
