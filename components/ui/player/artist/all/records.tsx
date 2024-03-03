'use client';

import { cn } from '@/lib/utils';
import { Record } from '@/types/music';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Records({ records }: { records: Record[] }) {
	return (
		<>
			{records.map((record) => (
				<div key={record.id} className='w-full'>
					<Link
						href={`/player/album/${record.id}`}
						className='overflow-hidden rounded-md block border border-border cursor-pointer mb-1 relative'
					>
						{record.explicit_lyrics ? (
							<span className='text-[10px] px-2 py-1 rounded-sm bg-black/70 backdrop-blur-sm text-white absolute right-2 bottom-2 font-bold'>
								E
							</span>
						) : null}
						<Image
							alt={record.title}
							src={record.cover_medium}
							height={200}
							width={200}
							className='w-full border border-border'
						/>
					</Link>
					<Link
						href={`/player/album/${record.id}`}
						className='font-medium block hover:underline'
					>
						{record.title}
					</Link>
					<p className='text-sm text-muted-foreground mb-1 '>
						{record.release_date}
					</p>
					<span
						className={cn(
							'text-xs px-2 py-1 rounded-sm uppercase font-medium text-white',
							record.record_type === 'album' ? 'bg-primary ' : null,
							record.record_type === 'ep' ? 'bg-blue-700 ' : null,
							record.record_type === 'single' ? 'bg-gray-700 ' : null
						)}
					>
						{record.record_type}
					</span>
				</div>
			))}
		</>
	);
}
