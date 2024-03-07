// Alterações no componente SaveCount
import SaveCountCard from "./SaveCountCard/SaveCountCard";
import { useState } from "react";
import { Input, Textarea, Button } from "@material-tailwind/react";

export default function SaveCount({ data, handleDelete, handleSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <div className="w-[100%] flex justify-between items-center py-2">
        <Button
          className="bg-orange-500 py-2 px-9 rounded-[100rem] text-white"
          onClick={() => {
            handleDelete();
            setTitle("");
            setDescription("");
          }}
        >
          Excluir
        </Button>
        <Button
          className="bg-orange-600 py-2 px-9 rounded-[100rem] text-white"
          onClick={() => {
            console.log({ title, description, data });
          }}
        >
          Salvar
        </Button>
      </div>
      <div className="flex flex-col gap-4 w-[100%] p-6 bg-[#f1f1f1] rounded-[1rem]">
        <Input
          type="text"
          label="Titulo"
          className="bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          className="resize-none bg-transparent"
          cols="30"
          rows="2"
          label="Descricao"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Textarea>
        <SaveCountCard
          count={data.count}
          result={data.results.result}
          countParams={data.results.countParams}
        />
      </div>
    </>
  );
}
