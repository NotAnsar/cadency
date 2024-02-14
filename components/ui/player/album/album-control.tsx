import { Icons } from '@/components/icons/audio-icons';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AlbumControl() {
	return (
		<div className='my-6 flex gap-4'>
			{/* <button className='w-12 h-12 flex justify-center items-center bg-primary rounded-full cursor-pointer text-white'> */}
			<button className='px-6 rounded-md flex justify-center items-center bg-primary  cursor-pointer text-white gap-1'>
				<Icons.play className='h-6 w-6' />
				<p className='font-medium'>Listen</p>
				{/* <Icons.pause className='h-6 w-6' />
				<p className='font-medium'>Listening</p> */}
			</button>
			<button className='w-12 h-12 flex justify-center items-center  rounded-full cursor-pointer'>
				<Icons.heart className='h-7 w-7' />
			</button>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Icons.MoreHorizontal />
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align='end'
					className='bg-background/80 backdrop-blur-md '
				>
					<DropdownMenuItem asChild>
						<button className='w-full'>Details</button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<button className='w-full'>Share</button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<button className='w-full'>Download</button>
					</DropdownMenuItem>

					<DropdownMenuSeparator />
					<DropdownMenuItem>Exit</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
