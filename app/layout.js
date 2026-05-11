import "./globals.css";

export const metadata = {
  title: "Community Center Clean Energy",
  description: "Explore renewable energy and take quizzes to join the leaderboard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-emerald-50 text-emerald-950">{children}</body>
    </html>
  );
}
