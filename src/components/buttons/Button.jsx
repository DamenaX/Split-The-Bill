function Button({variant, children, type}) {
    const base = ""
    const variants = {}
    return (
        <button type={type} className="w-full bg-emerald-500 p-2 text-center"> {children} </button>
    )
}

export default Button