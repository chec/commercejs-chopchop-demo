import Link from "next/link";

import LogoSVG from "../svg/logo.svg";

function Footer() {
  return (
    <footer className="py-6 lg:py-12">
      <div className="container mx-auto px-3 md:px-4 lg:px-5 md:flex md:items-start md:justify-between space-y-6 md:space-y-0">
        <Link href="/">
          <a>
            <LogoSVG className="w-full md:w-auto md:h-8" />
          </a>
        </Link>
        <div className="md:text-right space-x-1">
          <Link href="/">
            <a className="text-black">Shop</a>
          </Link>
          ,
          <Link href="/">
            <a className="text-black">About</a>
          </Link>
          ,
          <Link href="/">
            <a className="text-black">Contact</a>
          </Link>
          ,
          <Link href="/">
            <a className="text-black">Legal</a>
          </Link>
          ,
          <Link href="/">
            <a className="text-black">Privacy</a>
          </Link>
          ,<span>&copy; 2020</span>
          <p className="hidden md:block italic font-serif">
            Fine tools for thoughtful cooks
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
