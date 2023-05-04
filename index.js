import express from "express";

const app = express();

app.use(express.json());

const data = [];

app.get("/", (req, res) => {
  return res.status(200).json("Teste - get");
});

// para o create:
let counter = 0;
app.post("/create", (req, res) => {
 
  let id= ++counter;
  const newItem = { ...req.body}
  data.push({id: id, ...req.body});
  return res.status(201).json(newItem); //resposta que ira para o client
});

// para o update:  
app.put("/update/:id", (req, res) => {
  const id= req.params.id
  const index = data.findIndex(item => item.id === Number(id))
  data[index] = {...data[index], ...req.body}
  return res.status(201).json(data)
}); 

// para o read :
app.get("/all", (req, res)=>{
  return res.status(200).json(data)
})

  // para o delete:
app.delete("/delete/:id", (req, res) => {
  const id= req.params.id
  const index = data.findIndex(item => item.id === Number(id))
  data.splice(index, 1);
  return res.status(201).json("Deleted");
});


app.listen(4000, () => {
  console.log("conectado aqui");
});
