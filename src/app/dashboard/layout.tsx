export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section className="p-10">
        {children}
      </section>
    );
  }
  