function Button({variant, children, type}) {
    const base = ""
    const variants = {
        "default": "w-full bg-emerald-500 p-2 text-center",
        "link": "bg-none text-blue-500 w-fit h-min",
        "tab-grayed": "bg-none text-gray-300 p-2 font-bold",
        "tab-selected": "bg-none text-emerald-600 border-b-4 font-bold"
    }
    return (
        <button type={type} className={variants[variant]}> {children} </button>
    )
}

export default Button