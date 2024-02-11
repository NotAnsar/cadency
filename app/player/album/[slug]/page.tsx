export default function page({ params }: { params: { slug: string } }) {
	console.log(params.slug);

	return <div>{params.slug}</div>;
}
