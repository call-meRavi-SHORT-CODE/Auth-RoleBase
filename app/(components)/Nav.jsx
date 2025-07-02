import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { Building2 } from "lucide-react";

const Nav = async () => {
  const session = await getServerSession(options);
  
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
      <nav className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EPICAL LAYOUTS
            </h1>
            <p className="text-xs text-gray-500">HR Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {session ? (
            <>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{session.user.name}</span>
                </span>
                <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full capitalize">
                  {session.user.role}
                </span>
              </div>
              {session.user.role === 'admin' ? (
                <Link 
                  href="/admin/dashboard"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  href="/employee/dashboard"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Dashboard
                </Link>
              )}
              <Link 
                href="/api/auth/signout?callbackUrl=/"
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link 
              href="/api/auth/signin"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;