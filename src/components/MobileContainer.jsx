function MobileContainer({ children, variant }) {
    const base = "flex flex-col w-full max-w-sm md:max-w-[600px] h-dvh md:h-auto px-5 py-5 border-gray-100 space-y-2 transition-all"
    const variants = {
        centered: "items-center justify-center",
        normal: "items-center flex-start",
        scrollable: "items-center overflow-auto md:overflow-visible",
        narrow: "w-min"
    }


    return (
        <div className={`${base} ${variants[variant]}`}>
            {children}
        </div>
    );
}

export default MobileContainer