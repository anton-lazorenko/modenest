import { UserRound } from 'lucide-react';
import Link from 'next/link';
interface HeaderUserDropdownProps {
  scrolled: boolean;
}

export default function HeaderUserDropdown({ scrolled }: HeaderUserDropdownProps) {

  return (
    <div className="relative group">
      {/* Иконка пользователя */}
      <button className="p-4 hover:bg-gray-100 rounded-full">
        <UserRound />
      </button>

      {/* Дропдаун */}
      <div className={`absolute right-0 top-full w-40 shadow-lg rounded-lg opacity-0 group-hover:opacity-100
                pointer-events-none group-hover:pointer-events-auto z-50 transition-opacity
                ${scrolled ? "bg-amber-700 text-amber-100" : "bg-white text-black"}`}>
        <ul className="flex flex-col">
          <li className={`px-4 py-2 ${scrolled ? "hover:bg-amber-600" : "hover:bg-gray-100"}`}>
            <Link href="/login">Log In</Link>
          </li>
          <li className={`px-4 py-2 ${scrolled ? "hover:bg-amber-600" : "hover:bg-gray-100"}`}>
            <Link href="/signup">Register</Link>
          </li>
          <li className={`px-4 py-2 ${scrolled ? "hover:bg-amber-600" : "hover:bg-gray-100"}`}>
            <Link href="/profile">Account</Link>
          </li>
          <li className={`px-4 py-2 ${scrolled ? "hover:bg-amber-600" : "hover:bg-gray-100"}`}>
            <button>Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}