'use client';

import { ClerkProvider, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import './globals.css';

const publicRoutes = ['/'];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <title>Worksite-Scheduler</title>
      </head>
      <body>
        <ClerkProvider>
          <header>
            <SignedOut>
              {isPublicRoute ? null : <RedirectToSignIn redirectUrl={"/"} />}
            </SignedOut>
          </header>
          <main>{children}</main>
        </ClerkProvider>
      </body>
    </html>
  )
}