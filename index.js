const express = require('express');
const server = express();
const router = express.Router();
const fs = require('fs');

server.use(express.json({ extended: true }));

const readFile = () => {
  const content = fs.readFileSync('./data/items.json', 'utf-8');
  return JSON.parse(content)
}

const writeFile = (content) => {
  const updateFile = JSON.stringify(content)
  fs.writeFileSync('./data/items.json', updateFile, 'utf-8')
}

// Listar os livros disponíveis 
router.get('/', (req, res) => {
  //  Buscar livros disponiveis 
function buscarLivrosDisponiveis (livros) {
  if ("status" === "Disponível") 
  return livros;
}
var livrosDisponiveis = numeros.filter(buscarLivrosDisponiveis);
// console.log(livrosDisponiveis);
  res.send(livrosDisponiveis)
});

// Selecionar um livro disponivel por titulo
router.get('/titulo', (req, res) => {
  res.send('titulo')
});

// Registrar o nome do vizinho(a) que vai pegar algum livro emprestado e mudar o status do livro para "indisponível"
router.put('/:numero', (req, res) => {
  const {numero} = req.params

  const { emprestado_para, status } = req.body

  const currentContent = readFile()
  const selectedItem = currentContent.findIndex((item) => item.numero === numero)

  const { numero: cNumero, emprestado_para: cEmprestado_para, status: cStatus } = currentContent[selectedItem]

  const newObject = {
      numero: cNumero,
      emprestado_para: emprestado_para ? emprestado_para: cEmprestado_para,
      status: status ? status: cStatus
  }

  currentContent[selectedItem] = newObject
  writeFile(currentContent)

  res.send(newObject)
})

// Doar livro e colocar status: "disponivel"
router.post('/', (req, res) => {
  const { titulo, autor, ano, status} = req.body
  const currentContent = readFile()

  const numero = Math.floor(Math.random() * 100);
  
  console.log(numero)
  currentContent.push({ numero, titulo, autor, ano, status}) 
  writeFile(currentContent)
  res.send({ numero, titulo, autor, ano, status})
});

server.use(router)

server.listen(3000, () => {
  console.log('rodando servidor'); 
});
