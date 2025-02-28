export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section className="w-full min-h-screen flex justify-center items-center">
        {children}
      </section>
    );
  }
  