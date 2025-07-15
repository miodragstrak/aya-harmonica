// src/app/layout.tsx
export const metadata = {
  title: 'Aya Harmony Chat',
  description: 'Minimal chat app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
