import { useState } from 'react';
import DesktopNavigation from './DesktopNavigation';

function MobileContainer({ children, variant }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const base = "flex flex-col w-full md:max-w-[600px] h-dvh md:h-auto px-5 py-5 border-gray-100 space-y-2 transition-all"
    const variants = {
        centered: "items-center justify-center",
        normal: "items-center flex-start",
        scrollable: "items-center overflow-auto md:overflow-visible",
        narrow: "w-min"
    }

    return (
        <div className={`${base} ${variants[variant]} relative`}>
            <nav className="px-4 py-2 flex w-full bg-white md:hidden rounded-md text-emerald-700 mb-2 shadow-sm border border-gray-100">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="flex items-center gap-2 font-medium"
                >
                    <span className="text-xl">☰</span> Menu
                </button>
            </nav>

            {/* Mobile Menu Overlay - Always rendered for animation, visibility controlled by CSS */}
            <div
                className={`fixed inset-0 z-50 md:hidden transition-visibility duration-300 ${isMenuOpen ? "visible" : "invisible delay-300"}`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Slide-in Drawer */}
                <div
                    className={`absolute inset-y-0 left-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex justify-end p-2 border-b border-gray-100">
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                        >
                            ✕
                        </button>
                    </div>
                    <DesktopNavigation
                        className="w-full border-none"
                        onLinkClick={() => setIsMenuOpen(false)}
                    />
                </div>
            </div>

            {children}
        </div>
    );
}

export default MobileContainer