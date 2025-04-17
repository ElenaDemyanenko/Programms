import { Button, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export default function CreateNoteForm({ onCreate }) {
  // Инициализируем note как объект с пустыми полями
  const [note, setNote] = useState({ title: "", description: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Проверяем, что onCreate существует и является функцией
    if (typeof onCreate == "function") {
      onCreate(note); // Передаем текущую заметку
    }
    
    // Сбрасываем форму ПОСЛЕ вызова onCreate
    setNote({ title: "", description: "" });
  };

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-3"> 
      <h3 className="font-bold text-xl">Создание заметки</h3>
      <Input
        placeholder="Название"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <Textarea
        placeholder="Описание"
        value={note.description}
        onChange={(e) => setNote({ ...note, description: e.target.value })}
      />
      <Button type="submit" colorScheme="teal">
        Создать
      </Button>
    </form>
  );
}