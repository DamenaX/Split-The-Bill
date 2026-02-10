function TextInput({ placeholder, isRequired, variant, label}) {

    const base = "w-full px-4 py-3 rounded-xl border transition-all outline-none text-base"
    const variants = {
        "Amount-main": "border-gray-200 focus:border-blue-500 bg-white",
        "Amount-narrow": "border-gray-200 focus:border-blue-500 bg-white",
    }

    return (
        <div>
            <label>{label}</label>
            <input type="number" inputMode="numeric" placeholder={placeholder} className={`${base} ${variants[variant]}`} required={isRequired} />
        </div>

    )
}