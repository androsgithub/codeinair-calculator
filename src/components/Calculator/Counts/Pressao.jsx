import "./defaultCountStyle.css";
import { Input } from "@material-tailwind/react";

export default function Pressao({ onChange }) {
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
        <Input type="number" label="F" name="A" onChange={handleInputChange} />
        <select name="A_type" onChange={handleSelectChange}>
          <option disabled selected>
            Tipo
          </option>
          <option>kgF</option>
        </select>
      </div>
      <div className="input_div">
        <Input type="number" label="A" name="B" onChange={handleInputChange} />
        <select name="B_type" onChange={handleSelectChange}>
          <option disabled selected>
            Tipo
          </option>
          <option>cm²</option>
        </select>
      </div>
    </>
  );
}
