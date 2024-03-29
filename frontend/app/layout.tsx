import './globals.css';

export const metadata = {
  title: 'Progesso',
  description: 'Built on top of nextjs and express',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
