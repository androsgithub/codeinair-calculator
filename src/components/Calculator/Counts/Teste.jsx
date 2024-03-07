import "./defaultCountStyle.css";
import { Input } from "@material-tailwind/react";

export default function Teste({ onChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <>
      <div className="input_div">
        <Input type="number" label="D" name="A" onChange={handleInputChange} />
        <select name="A_type" onChange={handleSelectChange}>
          <option disabled selected>
            Tipo
          </option>
          <option value="teste">323</option>
        </select>
      </div>
      <div className="input_div">
        <label>D:</label>
        <input type="number" name="B" onChange={handleInputChange} />
        <select name="B_type" onChange={handleSelectChange}>
          <option disabled selected>
            Tipo
          </option>
          <option value="teste">123</option>
        </select>
      </div>
      <div className="input_div">
        <label>D:</label>
        <input type="number" name="C" onChange={handleInputChange} />
        <select name="C_type" onChange={handleSelectChange}>
          <option disabled selected>
            Tipo
          </option>
          <option value="teste">12</option>
        </select>
      </div>
    </>
  );
}
