var button = document.querySelector('button');
var input = document.querySelector('input');
var nomeUsuario;

function limpaTextoPadrao() {
    input.value = "";
}

function getNomeUsuario() {
    var divisor = document.querySelector('div');
    nomeUsuario = input.value;
    var linkUsuario = "https://api.github.com/users/" + nomeUsuario + "/repos"; 
    return AJAX_DadoUsuarioGitHub(linkUsuario);
}

function AJAX_DadoUsuarioGitHub(nomeUsuario) {
    axios.get(nomeUsuario)
    .then(function(response) {
        return processData(response.data);
    })
    .catch(function(error) {
        console.warn(error);
    });  
}
function processData(dataFromResponse) {
    var nomeRepositorios = [];
    for (nomeRepo of dataFromResponse) {
        nomeRepositorios.push(nomeRepo.name);
    }
    renderElementos(nomeRepositorios);
}

function renderElementos(nomeRepositorios) {
    var divisor = document.createElement('div');
    document.body.appendChild(divisor);
    renderLista(nomeRepositorios, divisor);
    criaTitle(nomeUsuario, divisor);
}

function renderLista(nomeRepositorios, divisor) {
    limpaTextoPadrao();
    for (const nome of nomeRepositorios) {
        var uLista = document.createElement('ul');
        divisor.appendChild(uLista);
        var lista = document.createElement('li');
        lista.innerHTML = nome;
        uLista.appendChild(lista);
    }
}

function criaTitle(nomeUsuario, divisor) {
    var title = document.createElement('h4');
    var textoTitle = "Dados dos repositórios do " + nomeUsuario + " no GitHub";
    title.innerHTML = textoTitle;
    document.body.insertBefore(title, divisor);
}

    
