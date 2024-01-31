import FAQ from '@/components/ui/static/home/FAQ';
import Features from '@/components/ui/static/home/features';
import Hero from '@/components/ui/static/home/hero';
import MarqueeSection from '@/components/ui/static/home/marquee';
import PlanSection from '@/components/ui/static/home/plan';

export default async function Home() {
	return (
		<>
			<Hero />
			<MarqueeSection />
			<Features />
			<PlanSection />
			<FAQ />
		</>
	);
}
