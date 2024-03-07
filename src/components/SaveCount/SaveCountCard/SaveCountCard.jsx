import styles from "./SaveCountCard.module.css";

export default function SaveCountCard({ count, result, countParams }) {
  return (
    <div className={`${styles.card} flex flex-col py-4 ps-14 gap-2`}>
      <p className="text-gray-400 ">{count}</p>
      {countParams.valuesToCalculate &&
        Object.keys(countParams.valuesToCalculate).map((key) => (
          <p key={key[0]}>
            {countParams.valuesToCalculate[key][0].length == 2
              ? countParams.valuesToCalculate[key][0]
                  .toUpperCase()
                  .substring(
                    0,
                    countParams.valuesToCalculate[key][0].length - 1
                  )
              : countParams.valuesToCalculate[key][0].toUpperCase()}{" "}
            = {countParams.valuesToCalculate[key][1]}{" "}
            {countParams.typesToCalculate[`${key[0].toUpperCase()}_type`][1]}
          </p>
        ))}
      <p>{result && "Resultado = " + parseFloat(result.toFixed(4))}</p>
    </div>
  );
}
