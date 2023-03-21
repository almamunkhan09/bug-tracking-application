import '../globals.css';
import CustomLayout from './CustomLayout';

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
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
