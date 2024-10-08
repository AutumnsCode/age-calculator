import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

export const metadata: Metadata = {
	title: 'Frontend Mentor | Age calculator app',
	description: 'Frontend Mentor | Age calculator app',
	
};

const poppins = localFont({
	src: [
		{
			path: './fonts/poppins-400.woff2',
			weight: '400',
		},
		{
			path: './fonts/poppins-700.woff2',
			weight: '700',
		},
		{
			path: './fonts/poppins-800.woff2',
			weight: '800',
		},
	],
	variable: '--font-poppins',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
        <link rel='icon' href='/favicon.png' sizes='32x32' />
			</head>
			<body className={`${poppins.variable} font-sans antialiased bg-background min-h-screen flex sm:items-center sm:justify-center`}>{children}</body>
		</html>
	);
}
