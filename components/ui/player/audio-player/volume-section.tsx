'use client';
import { Volume1, Volume2, VolumeX } from 'lucide-react';

import { Progress } from '../../progress';
import { useState } from 'react';
import { Input } from '../../input';

export default function VolumeSection() {
	const [volume, setvolume] = useState(50);
	const [mute, setmuted] = useState(false);

	return (
		<div className='w-1/4 grid '>
			<div className='flex items-center gap-1 flex-row-reverse mr-4'>
				{/* <Progress
					value={mute ? 0 : volume}
					className='max-w-20 min-w-10 h-1 '
				/> */}
				<Input type='range' className='h-1 max-w-20 min-w-10' />

				{mute ? (
					<VolumeX className='cursor-pointer' onClick={() => setmuted(false)} />
				) : (
					<Volume1 className='cursor-pointer' onClick={() => setmuted(true)} />
				)}
			</div>
		</div>
	);
}
