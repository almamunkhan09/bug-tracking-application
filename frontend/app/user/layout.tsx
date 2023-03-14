import '../globals.css';
import AdminHome from '../customLayouts/adminHome';

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
        <AdminHome>{children}</AdminHome>
      </body>
    </html>
  );
}
