export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export interface MemesResponse {
  success: boolean;
  data: {
    memes: Meme[];
  };
}

export const getAllMemes = async (): Promise<MemesResponse> => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  return await response.json();
};