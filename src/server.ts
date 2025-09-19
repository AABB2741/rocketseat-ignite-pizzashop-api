import Elysia from "elysia";

const app = new Elysia();

app.get("/", "Ok");

app.listen(3333, () => {
  console.log("Server running at http://localhost:3333");
});
