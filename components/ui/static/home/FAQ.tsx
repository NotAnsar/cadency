import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../../../ui/accordion';
import Wrapper from '../wrapper';

export default function FAQ() {
	return (
		<Wrapper className='mt-16 text-center ' id='FAQ'>
			<h2 className='text-4xl font-medium md:text-5xl mb-16'>
				Questions? Answers.
			</h2>
			<div className='mb-20'>
				{faqs.map((faq, i) => (
					<Accordion type='single' collapsible key={i}>
						<AccordionItem value='item-1'>
							<AccordionTrigger
								className='md:text-2xl hover:no-underline pb-8 pt-6 text-left' /* [&[data-state=open]]:text-primary' */
							>
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className='md:text-base hover:no-underline text-left '>
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</Wrapper>
	);
}

const faqs = [
	{
		question: 'What is Cadency?',
		answer:
			'Cadency is a music app that allows you to discover, create, and experience music in a unique and seamless way. It offers a range of features for music lovers of all kinds.',
	},
	{
		question: 'How can I create an account?',
		answer: `Creating an account on Cadency is easy. Simply click on the "Sign Up" button, provide the required information, and you'll be ready to explore the world of music with Cadency.`,
	},
	{
		question: 'What plans does Cadency offer?',
		answer:
			'Cadency offers various plans, including a Free Plan with basic features and ad-supported music. Premium and Family Plans provide ad-free experiences, unlimited access to a vast music library, high-quality streaming, and more.',
	},
	{
		question: 'Can I use Cadency on multiple devices?',
		answer:
			'Yes, Cadency is designed to be accessible on multiple devices. You can use it on your computer, smartphone, tablet, and other supported devices for a seamless music experience.',
	},
	{
		question: 'How do I contact Cadency support?',
		answer:
			'If you have any questions or need assistance, you can reach out to Cadency support through the "Contact Us" section on the app. Our support team is ready to help you with any queries you may have.',
	},
	{
		question: 'Is there a free trial for the Premium Plan?',
		answer:
			'Cadency offers a Free Plan with basic features, but unfortunately, there is no free trial for the Premium Plan. However, you can explore the Premium features through our affordable subscription plans.',
	},
	{
		question: 'What genres of music are available on Cadency?',
		answer:
			'Cadency provides a diverse selection of music genres, ranging from pop and rock to classical and electronic. You can explore and discover your favorite genres to enhance your musical experience.',
	},
	{
		question: 'Can I cancel my subscription at any time?',
		answer:
			'Yes, you can cancel your subscription to Cadency at any time. There are no long-term commitments, and you have the flexibility to manage your subscription preferences according to your needs.',
	},
	{
		question: 'Are my payment details secure on Cadency?',
		answer:
			'Cadency takes the security of your payment information seriously. We use industry-standard encryption and security measures to ensure that your payment details are protected and handled with the utmost care.',
	},
	{
		question: 'How often is the music library updated?',
		answer:
			'Our music library is regularly updated with new releases and a diverse range of tracks. You can expect fresh content to keep your musical journey exciting and up-to-date with the latest trends in the music world.',
	},
];
