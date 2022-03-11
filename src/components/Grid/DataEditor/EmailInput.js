import { useEffect, useRef } from "react";

function EmailInput(props) {
  const { value, onChange, onKeyDown } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      type="email"
      className="data-editor transparent-input"
      value={value}
      onChange={handleChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default EmailInput;
