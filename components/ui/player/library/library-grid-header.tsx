import Link from 'next/link';

type Prop = { title: string; children: React.ReactNode; link: string };

export default function LibraryGridHeader({ title, children, link }: Prop) {
	return (
		<div>
			<div className='flex justify-between'>
				<h2 className='text-[22px] font-semibold mb-4'>{title}</h2>
				<Link
					href={link}
					className='text-primary text-sm font-semibold hover:underline'
				>
					View all
				</Link>
			</div>

			<div className='grid grid-cols-3 md:grid-cols-5 gap-5'>{children}</div>
		</div>
	);
}
