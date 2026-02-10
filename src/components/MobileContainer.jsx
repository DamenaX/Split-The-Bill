import { Children } from "react";

function MobileContainer() {
    return (
        <div className="flex flex-col justify-center items-center w-full max-w-sm min-h-[85dvh] p-7 border-gray-100">
            {Children}
        </div>
    );
}

export default MobileContainer