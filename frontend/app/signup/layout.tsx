// import '../globals.css';
import Footer from '@/components/footer';

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
      <head />
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
