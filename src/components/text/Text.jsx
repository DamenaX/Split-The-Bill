;

function Text({variant, children}) {
    const base = ""
    const variants = {
        body: "text-base text-gray-800 leading-relaxed",
        muted: "text-sm text-gray-500 leading-snug",
        error: "text-sm text-red-500 font-medium",
        UI: "text-xs font-bold uppercase tracking-wide text-gray-400"
    }

    return (
        <p className={variants[variant]}>{children} </p>
    )
}

export default Text