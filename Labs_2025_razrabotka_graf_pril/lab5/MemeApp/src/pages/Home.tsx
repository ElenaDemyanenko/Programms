import React, { useEffect, useState } from "react";
import MemeCard from "../components/Card";
import type { Meme } from "../api/memes";
import { getAllMemes } from "../api/memes";

const Homepage: React.FC = () => {
  const [data, setData] = useState<Meme[]>([]);

  useEffect(() => {
    getAllMemes().then((memes) => setData(memes.data.memes));
  }, []);

  return (
    <div className="row">
      {data.map((el) => (
        <MemeCard key={el.id} img={el.url} title={el.name} />
      ))}
    </div>
  );
};

export default Homepage;