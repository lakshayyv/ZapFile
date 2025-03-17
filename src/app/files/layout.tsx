export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="p-10 w-full min-h-screen flex justify-center items-center">
      {children}
    </section>
  );
}
