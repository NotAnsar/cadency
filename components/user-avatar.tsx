import { User } from '@prisma/client';
import { AvatarProps } from '@radix-ui/react-avatar';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons/icons';
import { User as UserIcon } from 'lucide-react';

interface UserAvatarProps extends AvatarProps {
	user: Pick<User, 'image' | 'name'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
	return (
		<Avatar {...props}>
			{user.image ? (
				<AvatarImage alt='Picture' src={user.image} className='object-cover' />
			) : (
				<AvatarFallback>
					<span className='sr-only'>{user.name}</span>
					<UserIcon className='h-4 w-4' />
				</AvatarFallback>
			)}
		</Avatar>
	);
}
