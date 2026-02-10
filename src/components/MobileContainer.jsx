function MobileContainer({children}) {
    return (
        <div className="flex flex-col justify-center items-center w-full max-w-sm h-dvh px-3 py-5 border-gray-100 space-y-2">
            {children}
        </div>
    );
}

export default MobileContainer