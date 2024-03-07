import "./defaultCountStyle.css";
import { Input } from "@material-tailwind/react";

export default function Vazao({ onChange }) {
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
        <Input type="number" label="A" name="A" onChange={handleInputChange} />
        <select name="A_type" onChange={handleSelectChange}>
          <option disabled selected>
            Tipo
          </option>
          <option value="kgfcm2">kgF/cm²</option>
        </select>
      </div>
      <div className="input_div">
        <Input type="number" label="V" name="B" onChange={handleInputChange} />
        <select name="B_type" onChange={handleSelectChange}>
          <option disabled selected>
            Tipo
          </option>
          <option value="cm2">cm²</option>
        </select>
      </div>
    </>
  );
}
