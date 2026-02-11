function TextInput({ placeholder, isRequired, variant, label, id, className=""}) {

    const base = "border transition-all outline-none text-base rounded-s mb-2"
    const variants = {
        "large": "w-full px-4 py-3 border-gray-300 focus:border-blue-500 bg-white",
        "medium": "w-full px-3 py-2 border-gray-300 focus:border-blue-500 bg-white",
        "filled-wide": "border-transparent bg-gray-100 focus:bg-white focus:border-blue-500",
        "error-wide": "border-red-500 text-red-900 focus:border-red-600 bg-red-50",
    }

    return (
        <div className="flex flex-col space-y-2 w-full">
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" placeholder={placeholder} className={`${base} ${variants[variant]} ${className}`} required={isRequired} />
        </div>

    )
}

export default TextInput