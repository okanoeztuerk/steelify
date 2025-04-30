export function Select({ value, onValueChange, children }) {
  return <select value={value} onChange={(e) => onValueChange(e.target.value)} className='w-full border rounded px-3 py-2'>{children}</select>;
}
export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
export function SelectContent({ children }) {
  return <>{children}</>;
}
