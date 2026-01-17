const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
