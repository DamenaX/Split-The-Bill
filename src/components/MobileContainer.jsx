function MobileContainer({ children, variant}) {
    const base = "flex flex-col  max-w-sm h-dvh px-5 py-5 border-gray-100 space-y-2 "
    const variants = {
        centered: "items-center w-full justify-center",
        normal: "items-center w-full flex-start",
        scrollable: "items-center w-full overflow-auto",
        narrow: "w-min"
    }


    return (
        <div className={`${base} ${variants[variant]}`}>
            {children}
        </div>
    );
}

export default MobileContainer