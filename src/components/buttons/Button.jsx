function Button({variant, children}) {
    const base = ""
    const variants = {}
    return (
        <button className="w-full bg-emerald-500 p-2 text-center"> {children} </button>
    )
}

export default Button