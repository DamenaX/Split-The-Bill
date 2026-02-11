function TextInput({ placeholder, isRequired, variant, label, id}) {

    const base = "w-full px-4 py-3 border transition-all outline-none text-base rounded-s mb-2"
    const variants = {
        "default-wide": "border-gray-200 focus:border-blue-500 bg-white",
        "filled-wide": "border-transparent bg-gray-100 focus:bg-white focus:border-blue-500",
        "error-wide": "border-red-500 text-red-900 focus:border-red-600 bg-red-50",
    }

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={id}>{label}</label>
            <input id={id} type="text" placeholder={placeholder} className={`${base} ${variants[variant]}`} required={isRequired} />
        </div>

    )
}

export default TextInput