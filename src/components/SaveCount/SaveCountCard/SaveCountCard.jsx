import styles from "./SaveCountCard.module.css";

export default function SaveCountCard({ data }) {
  return (
    <div className={`${styles.card} flex flex-col py-4 ps-14 gap-1`}>
      <p className="text-gray-400 ">{data.selectContent}</p>
      {data.data.valuesToCalculate &&
        Object.keys(data.data.valuesToCalculate).map((key) => (
          <p key={key}>
            {key.toUpperCase()} = {data.data.valuesToCalculate[key]}{" "}
            {data.data.typesToCalculate[`${key.toUpperCase()}_type`]}
          </p>
        ))}

      {data.data.result.length != 0 &&
        data.data.result.map((resultado) => {
          return (
            <p key={resultado}>
              {data.selectContent[0]} = {parseFloat(resultado[1].toFixed(9))}{" "}
              {resultado[0]}
            </p>
          );
        })}
    </div>
  );
}
