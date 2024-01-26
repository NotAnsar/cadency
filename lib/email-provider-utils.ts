import { SendVerificationRequestParams } from 'next-auth/providers/email';
import { createTransport } from 'nodemailer';

export async function sendVerificationRequest(
	params: SendVerificationRequestParams
) {
	const { identifier, url, provider } = params;

	const { host } = new URL(url);
	const transport = createTransport(provider.server);

	const result = await transport.sendMail({
		to: identifier,
		from: provider.from,
		subject: `Sign in to Cadency`,
		text: text(),
		html: html({ url, host }),
	});
	const failed = result.rejected.concat(result.pending).filter(Boolean);
	if (failed.length) {
		throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
	}
}

function html(params: { url: string; host: string }) {
	const { url, host } = params;

	const brandColor = '#e11d48';
	const color = {
		background: '#f9f9f9',
		text: '#51545e',
		mainBackground: '#fff',
		buttonBackground: brandColor,
		buttonBorder: brandColor,
		buttonText: '#fff',
	};

	return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="width:570px;margin:0 auto;padding:0;background-color:${color.mainBackground};">
			<tr style="padding:4rem;">
				<td style="font-family:&quot;Inter&quot;,Helvetica,Arial,sans-serif;font-size:16px;padding:45px">
					<div>
            <h1 style="font-size: 1.5rem; font-weight: 500; letter-spacing: -0.025em; margin-bottom: 1rem;">
              Sign In to <span style="color: ${brandColor}; font-weight: bold;">Cadency</span>
            </h1>
      
						<p style='margin-bottom: 1rem;font-size:16px;line-height:1.625;color:${color.text};font-weight:400;'>
							Click the link below to sign in to your account.
						</p>			
            <a 
							style="display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; border-radius: 0.125rem; font-size: 0.875rem; font-weight: 500; transition: color 0.2s ease-in-out; outline: none; ring-offset: white; cursor: pointer; opacity: 1; background-color: ${brandColor}; color: white; text-decoration: none; padding: 0.5rem 1rem; margin-bottom: 1rem;" 
							target="_blank" 
							href="${url}"
						>
								Sign In
            </a>
						<p style='margin-bottom: 1rem;font-size:16px;line-height:1.625;color:${color.text};font-weight:400;'>
              This link expires in 24 hours and can only be used once.
						</p>
						<p style='margin-bottom: 1rem;font-size:16px;line-height:1.625;color:${color.text};font-weight:400;'>
							If you did not try to log into your account, you can safely ignore it.
						</p>
					</div>
				</td>
			</tr>
		</table>
</body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text() {
	return `Sign in to Cadency\n\n`;
}
