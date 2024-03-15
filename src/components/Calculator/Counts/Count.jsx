import styles from "./../Calculator.module.css";
import { Button, Select, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import "./defaultCountStyle.css";
import logo from "./../../../assets/logo-p.png";
export default function Count({ count, handleResults, children }) {
  const [resultados, setResultados] = useState({});
  const [ultimoResultado, setUltimoResultado] = useState();

  const [keyRandom, setKeyRandom] = useState(Math.random());
  useEffect(() => {
    setResultados({});
    setKeyRandom(Math.random());
  }, [count]);
  function getParameterNames(func) {
    const fnStr = func.toString();
    const params = fnStr
      .slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")"))
      .split(",");
    const paramNames = params.map((param) => param.trim());
    return paramNames;
  }
  function handleCalculate() {
    setUltimoResultado(resultados);
    setResultados({});
    let typesToCalculate = {};
    let valuesToCalculate = {};
    let funcParams = getParameterNames(count.operacao);
    for (let i in resultados) {
      let typeStr = "_type";
      const regexType = new RegExp(typeStr);
      if (regexType.test(i)) {
        typesToCalculate[i] = resultados[i];
      } else {
        valuesToCalculate[i] = resultados[i];
      }
    }
    let paramsInOrder = [];
    let result;
    for (let k in valuesToCalculate) {
      for (let l in funcParams) {
        if (k == funcParams[l]) {
          paramsInOrder.push(valuesToCalculate[k]);
        }
      }
    }
    result = count.operacao(...paramsInOrder);
    setResultados({ result, typesToCalculate, valuesToCalculate, funcParams });
    handleResults({
      result,
      typesToCalculate,
      valuesToCalculate,
      funcParams,
    });
    setKeyRandom(Math.random());
  }
  return (
    <form>
      {count ? (
        <>
          <div className="h-[100%] flex flex-col items-center justify-center gap-7">
            {count &&
              count.numberOfParams.map((parametros) => {
                () => {
                  setResultados({});
                  setKeyRandom(Math.random());
                };

                return (
                  <div key={parametros} className="input_div">
                    {
                      <Input
                        type="number"
                        label={parametros[0].toUpperCase()}
                        className="bg-white"
                        key={parametros[0] + keyRandom}
                        onChange={(e) => {
                          setResultados((dados) => ({
                            ...dados,
                            [parametros[0]]: e.target.value,
                          }));
                        }}
                      ></Input>
                    }

                    <div>
                      <Select
                        label="Parametro"
                        className="bg-white"
                        key={parametros[0] + keyRandom}
                        onChange={(e) => {
                          setResultados((dados) => ({
                            ...dados,
                            [`${parametros[0].toUpperCase()}_type`]: e,
                          }));
                        }}
                      >
                        {parametros[1].map((option) => (
                          <Select.Option key={option} value={option}>
                            {option}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <Button
              onClick={handleCalculate}
              className="py-[0.5rem] px-[2rem] text-white bg-[#FF7B21] rounded-[30rem] font-semibold text-[1rem]"
            >
              Calcular
            </Button>
          </div>
          <div>{children}</div>
        </>
      ) : (
        <div className="h-[100%] w-[100%] flex items-center justify-center">
          <img
            src={logo}
            className={`h-[125px] w-fit ${styles.logo_floating} `}
          />
        </div>
      )}
    </form>
  );
}
