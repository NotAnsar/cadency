import { Heart, Music, Share } from 'lucide-react';
import Wrapper from '../wrapper';

export default function Features() {
	return (
		<Wrapper className='mt-20 text-center mb-10' id='features'>
			<h2 className='text-4xl font-medium md:text-5xl'>
				Elevate Your Music Journey
			</h2>
			<p className='text-sm md:text-base mt-6 text-muted-foreground'>
				Immerse yourself in a world of extraordinary features designed to
				elevate every note and enhance your music exploration.
			</p>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 '>
				{features.map((feature, i) => (
					<div
						key={i}
						className='space-y-3 px-5 py-8 bg-[#fdfdfd] dark:bg-[#181818] flex items-center flex-col	rounded-md hover:opacity-80'
					>
						<feature.icon
							width={40}
							height={40}
							className='mb-4'
							color='#e11d48'
						/>
						<p className='text-xl font-medium'>{feature.title}</p>
						<p className='text-[15px] text-muted-foreground'>
							{feature.subtitle}
						</p>
					</div>
				))}
			</div>
		</Wrapper>
	);
}

const features = [
	{
		title: 'Discover New Music',
		subtitle:
			'Explore a vast collection of tracks across genres and uncover hidden gems.',
		icon: Music,
	},
	{
		title: 'Create Personalized Playlists',
		subtitle:
			'Curate your own playlists tailored to your mood, taste, and favorite artists.',
		icon: Heart,
	},
	{
		title: 'Share with Friends',
		subtitle:
			'Connect with friends, share your favorite tracks, and discover new music together.',
		icon: Share,
	},
];
