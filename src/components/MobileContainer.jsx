function MobileContainer({children}) {
    return (
        <div className="flex flex-col justify-center items-center w-full max-w-sm h-dvh p-7 border-gray-100">
            {children}
        </div>
    );
}

export default MobileContainer