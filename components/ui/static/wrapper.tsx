import { cn } from '@/lib/utils';

interface WrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
	children: React.ReactNode;
	className?: string;
}

export default function Wrapper({
	children,
	className,
	...props
}: WrapperProps) {
	return (
		<section
			className={cn('md:max-w-7xl mx-auto py-3 px-4', className)}
			{...props}
		>
			{children}
		</section>
	);
}
