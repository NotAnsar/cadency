import { signIn, signOut, useSession } from 'next-auth/react';

function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				{session?.user?.name}
				<br />
				<button onClick={() => signOut()}></button>
			</>
		);
	}

	return (
		<>
			not Signed In
			<br />
			<button onClick={() => signIn()}></button>
		</>
	);
}

export default function NavMenu() {
	return (
		<div>
			<AuthButton />
		</div>
	);
}
