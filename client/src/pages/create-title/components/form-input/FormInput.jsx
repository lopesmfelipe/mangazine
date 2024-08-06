const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
}) => (
  <div>
    <label>{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default FormInput;
