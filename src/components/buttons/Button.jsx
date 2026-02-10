function Button({variant, children, type}) {
    const base = ""
    const variants = {
        default: "w-full bg-emerald-500 p-2 text-center",
        link: "bg-none text-blue-500 w-fit h-min"
    }
    return (
        <button type={type} className={variants[variant]}> {children} </button>
    )
}

export default Button