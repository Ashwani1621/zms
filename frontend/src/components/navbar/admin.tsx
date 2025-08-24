"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function NavbarAdminDemo() {
  const navItems = [
    { name: "Staff", link: "/admin/staff" },
    { name: "Animals", link: "/admin/animals" },
    { name: "Adopt", link: "/admin/adopt" },
    { name: "Map", link: "/admin/#map" },
    { name: "About", link: "/admin/about" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        
        <NavBody>
          <div className="flex flex-1 items-center gap-x-8 min-w-0">
            <NavbarLogo />
            <NavItems items={navItems} />
          </div>
          <div className="relative z-50 flex shrink-0 items-center">
            <LogoutButton />
          </div>
        </NavBody>

        
        <MobileNav>
          <>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>
            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              
              <div className="flex w-full flex-col gap-4">
                <LogoutButton />
              </div>
            </MobileNavMenu>
          </>
        </MobileNav>
      </Navbar>
    </div>
  );
}