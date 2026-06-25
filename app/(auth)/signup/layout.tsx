import { cn } from "@/lib/utils";

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <main className="min-max-auto">
          <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">   
            <div className="w-full max-w-sm">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
