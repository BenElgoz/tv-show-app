import '../styles/index.scss';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
});

export const metadata = {
    title: 'TV Show App',
    description: 'Toutes les infos sur vos séries préférées',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
