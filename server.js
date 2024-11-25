import express from "express";
import conectarAoBanco from "./src/config/dbconfig.js";

await conectarAoBanco(process.env.STRING_CONEXAO)

console.log(process.env.STRING_CONEXAO)

const posts = [
  { id: 1, description: "A test photo", image: "https://placecats.com/millie/300/150" },
  { id: 2, description: "Another test photo", image: "https://placecats.com/whiskers/300/150" },
  { id: 3, description: "A cute cat picture", image: "https://placecats.com/leo/300/150" },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening...");
});

// Endpoint para retornar todos os posts
app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

// Função para buscar o índice do post pelo ID
function fetchPostByID(id) {
  return posts.findIndex((post) => post.id === Number(id));
}

// Endpoint para retornar um post pelo ID
app.get("/posts/:id", (req, res) => {
  const index = fetchPostByID(req.params.id);

  if (index !== -1) {
    res.status(200).json(posts[index]);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});
