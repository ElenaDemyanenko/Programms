import React, { useState, createRef } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Text from "../components/Text";
import { toJpeg } from "html-to-image";

const EditPage: React.FC = () => {
  const [params] = useSearchParams();
  const [count, setCount] = useState(0);
  const memeRef = createRef<HTMLDivElement>();

  const addText = () => {
    setCount(count + 1);
  };

  const handleExport = () => {
    if (memeRef.current === null) {
      return;
    }

    const options = {
      quality: 1,
      backgroundColor: "#ffffff",
    };

    toJpeg(memeRef.current, options)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "meme.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Ошибка при экспорте изображения:", error);
      });
  };

  return (
    <div>
      <div
        style={{ width: "700px", border: "1px solid" }}
        ref={memeRef}
        className="meme  mb-5"
      >
        <img src={params.get("url") || ""} width="256px" alt="meme" />
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <Text key={index} />
          ))}
      </div>
      <Button onClick={addText}>add text</Button>
      <Button variant="success" onClick={handleExport} className="ms-2">
        Save
      </Button>
    </div>
  );
};

export default EditPage;