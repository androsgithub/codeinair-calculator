import Forca from "./Counts/Forca";
import Error from "./Counts/Error.jsx";
import { useEffect, useState } from "react";
import styles from "./Calculator.module.css";
import Pressao from "./Counts/Pressao";
import Contas from "../../Contas.js";
import Area from "./Counts/Area.jsx";
import VelocidadeCilindro from "./Counts/VelocidadeCilindro.jsx";
import Vazao from "./Counts/Vazao.jsx";
import SaveCount from "../SaveCount/SaveCount.jsx";
import Teste from "./Counts/Teste.jsx";
import { Button, Select } from "@material-tailwind/react";

export default function Calculator() {
  const [selectContent, setSelectContent] = useState("");
  const [selectCount, setSelectCount] = useState("start");
  const [result, setResult] = useState("?");
  const [saveCountContent, setSaveCountContent] = useState({
    count: "",
    results: {
      result: "",
      countParams: { valuesToCalculate: "", typesToCalculate: "" },
    },
  });

  const [tempCounts, setTempCounts] = useState([]);

  const components = {
    forca: <Forca onChange={handleInputChange} />,
    pressao: <Pressao onChange={handleInputChange} />,
    area: <Area onChange={handleInputChange} />,
    velocidade_cilindro: <VelocidadeCilindro onChange={handleInputChange} />,
    vazao: <Vazao onChange={handleInputChange} />,
    teste: <Teste onChange={handleInputChange} />,
    error: <Error />,
    start: (
      <div>
        <h1>Selecione uma operação</h1>
      </div>
    ),
  };
  const optionsContent = {
    start: "",
    forca: "F = P X A",
    pressao: "P = F X A",
    area: "A = (PI X D²) / 4",
    velocidade_cilindro: "V = A / TFA",
    vazao: "Q = A X V",
    teste: "teste",
  };

  const [formValues, setFormValues] = useState({});

  function getParameterNames(func) {
    const functionString = func.toString();
    const parameterString = functionString.slice(
      functionString.indexOf("(") + 1,
      functionString.indexOf(")")
    );
    return parameterString.split(",").map((param) => param.trim());
  }
  function handleInputChange(name, value) {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleCalculate() {
    const parameterNamesOfFunction = getParameterNames(Contas[selectCount]);

    let valuesToCalculate = {};
    let typesToCalculate = {};

    Object.keys(formValues).forEach((valor, index) => {
      if (!valor.toString().substring(1).includes("_type")) {
        console.log();
        valuesToCalculate[valor] = [
          parameterNamesOfFunction[index],
          formValues[valor],
        ];
      } else {
        if (index == 0) {
          typesToCalculate[
            `${parameterNamesOfFunction[Math.round(index)]
              .toString()
              .toUpperCase()}_type`
          ] = formValues[valor];
        } else {
          typesToCalculate[valor] = [
            `${parameterNamesOfFunction[Math.round(index / 2 - 1)]
              .toString()
              .toUpperCase()}_type`,
            formValues[valor],
          ];
        }
      }
    });

    if (Object.keys(typesToCalculate).length == 0) {
      return;
    }

    console.log(Object.values(valuesToCalculate));

    const calculatedResult = Contas[selectCount](
      ...Object.values(valuesToCalculate).map((lista) => lista[1])
    );
    setResult(calculatedResult);

    setSaveCountContent({
      count: selectContent,
      results: {
        result: calculatedResult,
        countParams: {
          valuesToCalculate,
          typesToCalculate,
        },
      },
    });
    setTempCounts((tempCounts) => [
      ...tempCounts,
      {
        count: selectContent,
        results: {
          result: calculatedResult,
          countParams: {
            valuesToCalculate,
            typesToCalculate,
          },
        },
      },
    ]);
  }
  useEffect(() => {
    console.log(tempCounts);
    setTempCounts((tempCounts) => [...tempCounts]);
  }, [saveCountContent]);
  return (
    <div
      className={`flex max-[1050px]:flex-col max-[1050px]:gap-10 gap-[4vw] justify-center w-fit ${styles.calculator_div}`}
    >
      <div className={`flex flex-col items-center  ${styles.calculator}`}>
        <Select
          className="bg-[#f6f6f6]"
          size="lg"
          label="Operação"
          onChange={(value) => {
            console.log(value);
            setSelectContent(optionsContent[value]);
            setSelectCount(value);
            setFormValues({});
            setResult("?");
          }}
        >
          <Select.Option value="start" disabled>
            Selecione uma opção
          </Select.Option>
          <Select.Option value="forca">Força</Select.Option>
          <Select.Option value="pressao">Pressão</Select.Option>
          <Select.Option value="area">Area</Select.Option>
          <Select.Option value="velocidade_cilindro">
            Velocidade do cilindro
          </Select.Option>
          <Select.Option value="vazao">Vazão</Select.Option>
          <Select.Option value="teste">Teste</Select.Option>
        </Select>
        <div className={styles.count_father}>
          <p className={`mb-3 mt-0 text-gray-400 ${styles.count_placeholder}`}>
            {selectContent}
          </p>
          <form className={styles.count_div}>
            {components[selectCount]
              ? components[selectCount]
              : components["error"]}
          </form>
          <p className={`py-2 px-4 bg-[rgb(255,255,255)] ${styles.result}`}>
            {result == "?" ? result : parseFloat(result.toFixed(4))}
          </p>
          <Button
            onClick={handleCalculate}
            className="py-[0.5rem] px-[2rem] text-white bg-[#FF7B21] rounded-[30rem] font-semibold text-[1rem]"
          >
            Calcular
          </Button>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-between w-[500px] gap-2 relative">
        <div className={styles.tempCountsCircle}>
          <p>{tempCounts.length}</p>
        </div>
        <SaveCount
          data={
            tempCounts.length == 0
              ? {
                  count: "",
                  results: {
                    result: "",
                    countParams: {
                      valuesToCalculate: "",
                      typesToCalculate: "",
                    },
                  },
                }
              : tempCounts[tempCounts.length - 1]
          }
          handleDelete={() => {
            setTempCounts(tempCounts.slice(0, -1));
            console.log("deletado");
          }}
        />
      </div>
    </div>
  );
}
