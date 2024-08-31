'use client';
import Link from 'next/link';

import { CURRENT_USER, ROOT_PATH } from '../utils/constants';

const Header = () => (
  <header className="bg-gray-800 text-white p-2 pl-8 pr-8 flex justify-between items-center">
    <Link
      href={ROOT_PATH}
      className="text-lg font-bold cursor-pointer hover:text-gray-300 transition"
    >
      <h1>YourChat</h1>
    </Link>

    <div className="flex flex-row gap-4">
      <p className="text-white text-sm font-sans">{CURRENT_USER}</p>
      <p className="text-white text-sm font-sans">Log out</p>
    </div>
  </header>
);

export default Header;
