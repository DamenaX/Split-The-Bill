function Button({variant, children, type, onClick}) {
    const base = ""
    const variants = {
        "default": "rounded-md w-full bg-emerald-500 p-2 text-center text-white font-semibold",
        "link": "bg-none text-blue-500 w-fit h-min",
        "tab-grayed": "bg-none text-gray-300 p-2 font-bold",
        "tab-selected": "bg-none text-emerald-600 border-b-4 font-bold"
    }
    return (
        <button onClick={onClick} type={type}  className={variants[variant]}> {children} </button>
    )
}

export default Button