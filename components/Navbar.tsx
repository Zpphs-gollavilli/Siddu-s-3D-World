"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RxCaretRight } from "react-icons/rx";
import { BsFileEarmarkPerson } from "react-icons/bs";

// Logo image
import favicon from "@/app/favicon.ico";

const navlinks = [
  { name: "Home", href: "/" },
  { name: "Project", href: "/project" },
  { name: "About Me", href: "/about-me" },
];

export default function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showResumeOptions, setShowResumeOptions] = useState<boolean>(false);
  const triggerMenuRef = useRef<HTMLInputElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);
  const closeMenu = (): void => setIsMenuOpen(false);

  // Close menu on window resize
  useEffect(() => {
    const closeMenuOnResize = (): void => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, []);

  // Keep checkbox synced
  useEffect(() => {
    if (triggerMenuRef.current) triggerMenuRef.current.checked = isMenuOpen;
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
  }, [isMenuOpen]);

  // Close resume dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resumeRef.current &&
        !resumeRef.current.contains(event.target as Node)
      ) {
        setShowResumeOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        ref={navbarRef}
        className="sticky top-0 z-50 w-screen bg-white md:relative safe-layout"
      >
        <div className="flex flex-row items-center justify-between py-6 border-b-2 border-b-gray safe-x-padding">
          
          {/* ⭐ Replaced BrandIcon with favicon.ico */}
          <Link className="z-50" href="/" onClick={closeMenu} prefetch={false}>
            <div className="w-[45px] h-[45px] lg:w-[70px] lg:h-[50px] relative">
              <Image 
                src={favicon} 
                alt="Siddharth Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-row items-center justify-between text-lg font-bold md:gap-6 lg:gap-8 relative">
            <ul className="flex flex-row md:gap-6 lg:gap-8 justify-evenly">
              {navlinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className={`${
                      pathname === link.href ? "text-accent" : "text-accent2"
                    } p-4`}
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Resume dropdown */}
            <div className="relative" ref={resumeRef}>
              <button
                className="px-6 py-2 text-white gradient-btn rounded-xl"
                onClick={() => setShowResumeOptions((prev) => !prev)}
              >
                Resume
              </button>
              {showResumeOptions && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-50">
                  <a
                    href="/resume.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Open in New Tab
                  </a>
                  <a
                    href="/resume.html"
                    download="G_Siddharth_Resume.html"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="z-50 md:hidden">
            <label className="cursor-pointer hamburger">
              <input
                className="hidden"
                type="checkbox"
                ref={triggerMenuRef}
                onClick={toggleMenu}
              />
              <svg viewBox="0 0 32 32" id="hamburger">
                <path
                  className="line line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
            </label>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "top-0" : "-translate-y-full"
        } fixed top-0 w-screen h-screen transition-all duration-500 ease-in-out z-40 bg-white`}
        style={{
          paddingTop: navbarRef.current
            ? `${navbarRef.current.offsetHeight}px`
            : "90px",
        }}
      >
        <div className="flex flex-col items-start justify-between p-4 text-lg font-medium lg:hidden lg:gap-8">
          <ul className="w-full">
            {navlinks.map((link, index) => (
              <li key={index} className="flex mb-2 rounded-lg">
                <Link
                  className="flex-1 py-4 safe-x-padding"
                  href={link.href}
                  onClick={closeMenu}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`${
                        pathname === link.href
                          ? "gradient-text"
                          : "text-accent"
                      } text-2xl font-semibold`}
                    >
                      {link.name}
                    </span>
                    <span
                      className={`${
                        pathname === link.href ? "text-secondary" : ""
                      } text-4xl`}
                    >
                      <RxCaretRight />
                    </span>
                  </div>
                </Link>
              </li>
            ))}

            {/* Resume Options in Mobile */}
            <li className="flex flex-col mt-4 w-full">
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-3 px-4 mb-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              >
                <span className="text-lg font-semibold">Open Resume</span>
                <BsFileEarmarkPerson />
              </a>
              <a
                href="/resume.html"
                download="G_Siddharth_Resume.html"
                className="flex justify-between items-center py-3 px-4 rounded-lg bg-gray-200 text-gray-800"
              >
                <span className="text-lg font-semibold">Download Resume</span>
                ⬇️
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
