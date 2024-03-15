import { useEffect, useState } from "react";
import styles from "./Calculator.module.css";
import SaveCount from "../SaveCount/SaveCount.jsx";
import Count from "./Counts/Count.jsx";
import Contas from "./../../model/Contas.js";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";

import { Select } from "@material-tailwind/react";

export default function Calculator() {
  const [selectContent, setSelectContent] = useState("");
  const [selectCount, setSelectCount] = useState("start");
  const [selectedResult, setSelectedResult] = useState("startSelect");
  const [saveCountContent, setSaveCountContent] = useState({
    count: "",
    results: {
      selectContent: "",
      data: {
        result: "",
        valuesToCalculate: "",
      },
    },
  });

  const [tempCounts, setTempCounts] = useState([]);

  useEffect(() => {
    setTempCounts((tempCounts) => [...tempCounts]);
  }, [saveCountContent]);

  return (
    <div
      className={`flex max-[1050px]:flex-col max-[1050px]:gap-10 gap-[4vw] justify-center w-fit ${styles.calculator_div}`}
    >
      <div className={`flex flex-col items-center  ${styles.calculator}`}>
        <Select
          variant="standard"
          size="lg"
          label="Operação"
          onChange={(value) => {
            setSelectContent(Contas[value].content);
            setSelectCount(value);
          }}
        >
          {Object.keys(Contas).map((key) => (
            <Select.Option key={key} value={key}>
              {Contas[key].id}
            </Select.Option>
          ))}
        </Select>

        <div className={`shadow-md shadow-[#49241f2d] ${styles.count_father}`}>
          {selectContent && (
            <p
              className={`mb-3 mt-0 text-gray-400 ${styles.count_placeholder}`}
            >
              {selectContent}
            </p>
          )}
          <div className={styles.count_div}>
            {/*AQUI FICA O LUGAR DO FORMS*/}
            {
              <Count
                count={Contas[selectCount]}
                key={Contas[selectCount] + Math.random()}
                handleResults={(data) => {
                  setSaveCountContent({ selectContent, data });
                  setTempCounts((tempCounts) => [
                    ...tempCounts,
                    { selectContent, data },
                  ]);
                }}
              ></Count>
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-[500px] gap-2 relative">
        <div className={styles.tempCountsCircle}>
          <p>{tempCounts.length}</p>
        </div>
        <SaveCount
          data={
            tempCounts.length == 0
              ? {
                  selectContent: "",
                  data: {
                    result: "",
                    valuesToCalculate: "",
                  },
                }
              : tempCounts[tempCounts.length - 1]
          }
          handleDelete={() => {
            setSelectedResult("startSelect");
            setTempCounts(tempCounts.slice(0, -1));
            console.log("deletado");
          }}
        >
          <div
            className={`flex items-center justify-around w-[100%] bg-white ${styles.result}`}
          >
            <div className="w-[50%!important] text-end">
              <p className={`py-2 px-4 `}>
                {selectedResult == "startSelect"
                  ? 0
                  : parseFloat(
                      tempCounts[tempCounts.length - 1].data.result[
                        selectedResult
                      ][1].toFixed(6)
                    )}
              </p>
            </div>
            {tempCounts.length != 0 && (
              <div>
                <Select
                  value={selectedResult}
                  variant="static"
                  onChange={(e) => {
                    setSelectedResult(e);
                  }}
                >
                  {tempCounts[tempCounts.length - 1].data.result.map(
                    (resultado, index) => (
                      <Select.Option
                        key={resultado[0]}
                        value={index.toString()}
                        className="capitalize"
                      >
                        <p className="capitalize"> {resultado[0]}</p>
                      </Select.Option>
                    )
                  )}
                </Select>
              </div>
            )}
          </div>
        </SaveCount>
      </div>
      <Link to="/history" className="h-100% flex justify-center items-center">
        <div className="w-[75px] h-[75px] bg-orange-600 rounded-[100%] flex items-center justify-center">
          <HiBars3 className="fill-white" size={40} />
        </div>
      </Link>
    </div>
  );
}
