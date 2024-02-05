import Image from 'next/image';

type Prop = {
	thumbnail: string;
	title: string;
	author: string;
};

export default function SongDetails({ thumbnail, title, author }: Prop) {
	return (
		<div className='flex gap-3 items-center flex-none'>
			<Image
				src={thumbnail}
				alt='n.h.i.e.'
				width={56}
				height={56}
				className='rounded-sm'
			/>

			<div className='hidden md:block'>
				<p className='text-sm font-medium'>{title}</p>
				<p className='text-sm text-muted-foreground'>{author}</p>
			</div>
		</div>
	);
}
