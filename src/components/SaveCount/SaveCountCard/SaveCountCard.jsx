import styles from "./SaveCountCard.module.css";

export default function SaveCountCard({ count, result, countParams }) {
  return (
    <div className={`${styles.card} flex flex-col py-4 ps-14 gap-2`}>
      <p className="text-gray-400 ">{count}</p>
      {countParams.valuesToCalculate &&
        Object.keys(countParams.valuesToCalculate).map((key, index) => (
          <p key={key}>
            {key.toUpperCase()} = {countParams.valuesToCalculate[key]}{" "}
            {countParams.typesToCalculate[`${key.toUpperCase()}_type`]}
          </p>
        ))}
      <p>{result && "Resultado = " + parseFloat(result.toFixed(4))}</p>
    </div>
  );
}
