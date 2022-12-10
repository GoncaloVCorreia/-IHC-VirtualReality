
let express=require('express')
let  app= express();
const path = require('path');
app.use(express.static("public"));

app.listen(8080)

app.use(express.json());
app.use(express.urlencoded());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

console.log("http://localhost:8080")

let dificuldade=0;
let numeroPecas=0;

app.get('/', (req,res) => { 
    res.sendFile(__dirname+'/home.html')
});
//tutorial
app.get('/tutorial',(req,res) =>{
    res.sendFile(__dirname+'/tutorial.html')
});

//definicoes
app.get('/definitions', (req,res) => { 
    res.sendFile(__dirname+'/definicoes.html')
});

//Escolher Pecas e Difuldade
app.get('/pecas', (req,res) => { 
    res.sendFile(__dirname+'/pecas_dificuldade.html')
});

app.post("/pecas", (req, res) => {
   
    var dif =parseInt(req.body.dif) ;
    var strDif;
    console.log(dif);
    if(dif==1){
        strDif="Facil";
    }
    if(dif==2){
        strDif="Medio";
    }
    if(dif==3){
        strDif="Dificil";
    }
    dificuldade=dif;
   
    var numPecas = req.body.pecas;
    numeroPecas=parseInt(numPecas);
    console.log(numPecas+" "+strDif)
    //res.sendFile(__dirname+'/temas.html')
    res.render(path.join(__dirname,"/",'temas.html'), {numPecas: numPecas, dif:strDif});
});


//Escolher Tema e Artista
app.get('/temas', (req,res) => { 
    res.sendFile(__dirname+'/temas.html')
});

app.post('/temas', (req, res) => {

    var tema = req.body.tipo;
    var artista = req.body.music;

    console.log(tema)
    console.log(artista)

    console.log(dificuldade)
    console.log(numeroPecas)

    numAchamanetnos=10*dificuldade
    andar=200*dificuldade
    tesoura= 10*dificuldade
    flexoes=10*dificuldade
    abdomianais=10*dificuldade
    
    var lista=[            
            "Andar "+ andar.toString()+ " metros", 
            "Fazer "+ numAchamanetnos.toString()+ " agachamentos",
            "Encontrar peça",
            "Fazer "+ tesoura.toString()+" tesouras",
            "Fazer "+ flexoes.toString()+ " flexoes",
            "Fazer "+ abdomianais.toString() + " abdominais"
        
    ]
    lista =lista.slice(0,numeroPecas)
    console.log(lista)
    res.render(path.join(__dirname,"/",'index.html'), {tipo: tema, music:artista, lista:lista});
});

//Realidade Virtual
app.get('/jogar', (req,res) => { 
    console.log(dificuldade)
    console.log(numeroPecas)
    res.sendFile(__dirname+'/index.html')
});
app.get('/andar' , (req,res) =>{

    res.sendFile(__dirname+'/andar.html')
});