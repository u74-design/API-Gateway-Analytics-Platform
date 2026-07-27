const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-xs text-gray-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-black/20
          px-4
          py-2.5
          text-white
          placeholder:text-gray-500
          outline-none
          transition
          focus:border-indigo-500
        "
      />
    </div>
  );
};

export default InputField;