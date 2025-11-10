export function Checkbox ({checked, onChnage, label, id}) {
    
    return <div className="form-check">
        <input id={id} type="checkbox" className="form-check-input" checked={checked} onChange={(e) => onChange(e.target.value)} />

        <label htmlFor={id} className="form-chech-label">{label}</label>
    </div>
}