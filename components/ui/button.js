
export function Button({ children, ...props }) {
  return (
    <button
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}
