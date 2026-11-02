"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "../molecules/UserMenu";
import {
  ShoppingCart,
  Menu,
  X,
  CircleUserRound,
  
  LogOut,
  SearchIcon,
  UserRound,
  Command,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../molecules/SearchBar";
import { useGetCartCountQuery } from "@/app/store/apis/CartApi";
import useClickOutside from "@/app/hooks/dom/useClickOutside";
import useEventListener from "@/app/hooks/dom/useEventListener";
import { useAuth } from "@/app/hooks/useAuth";
import { useAppDispatch } from "@/app/store/hooks";
import { useSignOutMutation } from "@/app/store/apis/AuthApi";
import { logout } from "@/app/store/slices/AuthSlice";
import { generateUserAvatar } from "@/app/utils/placeholderImage";
import DemoCatalogBanner from "../feedback/DemoCatalogBanner";
import { useModalStore } from "@/app/hooks/useModalStore";
import SearchModal from "../Modals/SearchModal";
import AuthModal from "../Modals/AuthModal";


interface NavProps {
  showCatalogBanner :boolean
}


const Navbar : React.FC<NavProps>  = ({showCatalogBanner}) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [signout] = useSignOutMutation();
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();
  const { data: cartData } = useGetCartCountQuery(undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const {isSearchOpen, openSearchModal} =  useModalStore();
  const {isAuthOpen, openAuthModal} =  useModalStore();
  const [verifySeachModal, setSearchModal] = useState(isSearchOpen)

  useEventListener("scroll", () => {
    setScrolled(window.scrollY > 20);
  });

  useClickOutside(menuRef, () => setMenuOpen(false));
  useClickOutside(mobileMenuRef, () => setMobileMenuOpen(false));

  const handleSignOut = async () => {
    try {
      await signout();
      dispatch(logout());
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  return (
    <>
      <header
        className="sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/80 backdrop-blur-xl border-b border-white/10 h-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="  text-2xl font-bold tracking-tight text-white flex items-center gap-2"
          >
            <span className="bg-white text-black px-2 py-0.5 rounded italic font-black">
              BAG
            </span>
            CART
          </Link>

          {/* Middle */}
          <nav className=" md:flex items-center gap-8">          
            <Link href="/shop" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Shop All</Link>
            <Link href="/collections" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Collections</Link>
            <Link href="/story" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Our Story</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-5">
            {/* Search button */}
            <button className="text-gray-300 hover:text-white transition-colors relative cursor-pointer"
              aria-label="Search"
              onClick={()=>{
                console.log({isSearchOpen});
                
                openSearchModal()
              }}

            >             
              <SearchIcon/>
            </button>
            
            {/* User Menu */}
              {!isLoading && isAuthenticated ? 
                (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="User menu"
                    >
                      {/* If User signed In  */}
                      {user
                        ?.avatar ? (
                          <div className="w-7 h-7 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
                            <Image
                              src={user.avatar}
                              alt="User Profile"
                              width={28}
                              height={28}
                              className="rounded-full object-cover w-full h-full"
                              onError={(e) => {
                                e.currentTarget.src = generateUserAvatar(user.name);
                              }}
                            />
                          </div>) 
                        : (
                          <div className="w-[35px] h-[35px] rounded-full overflow-hidden border border-gray-300">
                            <Image
                              src={generateUserAvatar(user?.name || "User")}
                              alt="User Profile"
                              width={35}
                              height={35}
                              className="rounded-full object-cover w-full h-full"
                            />
                          </div>
                        )}
                    </button>

                    {menuOpen && (
                      <UserMenu
                        user={user}
                        menuOpen={menuOpen}
                        closeMenu={() => setMenuOpen(false)}
                      />
                    )}
                  </div>)
                : (
                  pathname !== "/sign-up" &&
                  pathname !== "/sign-in" && (
                    <button                      
                      className="text-gray-300 hover:text-white transition-colors relative cursor-pointer"
                      onClick={openAuthModal}
                    >
                      <UserRound/>
                    </button>
                  )
                )
              }
            
            {/* Cart */}
              <Link
                href="/cart"
                className="text-gray-300 hover:text-white transition-colors relative"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="text-[20px] sm:text-[22px]" />
                {cartData?.cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartData?.cartCount > 99 ? "99+" : cartData?.cartCount}
                  </span>
                )}
              </Link>
          </div>
        </div>

        
          
              {/* Mobile Menu Button */}
              {/* <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button> */}
            {/* </div> */}
          

          {/* Mobile Search Bar */}
          {mobileSearchOpen && (
            <div className="md:hidden py-3 border-t border-gray-200">
              <SearchBar />
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200"
            >
              <div className="px-4 py-2 space-y-2">
                {!isAuthenticated && (
                  <>
                    <Link
                      href="/sign-in"
                      className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {/* Sign in */}
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {/* Sign up */}
                    </Link>
                  </>
                )}
                <Link
                  href="/"
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {/* Home */}
                </Link>
                <Link
                  href="/orders"
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {/* Orders */}
                </Link>
                <Link
                  href="/shop"
                  className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {/* Shop */}
                </Link>
                {user?.role === "ADMIN" && (
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {/* Dashboard */}
                  </Link>
                )}

                {isAuthenticated && (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 gap-3 text-red-600 hover:bg-red-50/80 transition-colors duration-150 text-sm"
                  >
                    <LogOut size={18} />
                    <span>Sign out</span>
                  </button>
                )}
              </div>
            </div>
          )}
        {/* </nav> */}
        { showCatalogBanner && <DemoCatalogBanner />}
        {/* Search Modal */}          
        <SearchModal/>
        <AuthModal/>
          
      </header>
    </>
  );
};

export default Navbar;
