import { Headphones } from 'lucide-react';
import Marquee from 'react-fast-marquee';

export default function MarqueeSection() {
	return (
		<section>
			<Marquee speed={100} autoFill={true}>
				<div className='flex gap-8 items-center mr-8 '>
					<p className='text-4xl font-medium py-16 text-[#414141] '>
						Immerse Yourself in a World of Limitless Melodies
					</p>
					<Headphones
						width={'40px'}
						height={'40px'}
						className='text-primary '
						strokeWidth={2.5}
					/>
				</div>
			</Marquee>
		</section>
	);
}
