function MobileContainer({ children, variant}) {
    const base = "flex flex-col items-center w-full max-w-sm h-dvh px-5 py-5 border-gray-100 space-y-2"
    const variants = {
        centered: "justify-center",
        normal: "flex-start"
    }


    return (
        <div className={`${base} ${variants[variant]}`}>
            {children}
        </div>
    );
}

export default MobileContainer