import AuthProvider from "./(components)/AuthProvider";
import Nav from "./(components)/Nav";
import "./globals.css";

export const metadata = {
  title: "EPICAL LAYOUTS - HR Management System",
  description: "Professional HR Management System for EPICAL LAYOUTS PVT LTD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <Nav />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}