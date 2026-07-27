const AuthCard = ({title,subtitle, children}) => {
    return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111827] p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-white text-center">
                {title}
            </h1>
            <p className="text-gray-400 text-center mt-2">
                {subtitle}
            </p>
            <div  className="mt-8">
                {children}
            </div>
        </div>
    )
}

export default AuthCard;