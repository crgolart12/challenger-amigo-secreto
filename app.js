const nomeInput = document.getElementById('amigo');
const adicionarBtn = document.querySelector('.button-add');
const listaNomes = document.getElementById('listaAmigos');
const sortearBtn = document.querySelector('.button-draw');
const resultado = document.getElementById('resultado');
const limparBtn = document.querySelector('.button-clear');
let nomes = [];

adicionarBtn.addEventListener('click', () => {
    const nome = nomeInput.value.trim();

    if (nome === '') {
        alert('Não dá pra adicionar um nome vazio!');
    } else {
        nomes.push(nome);
        atualizarLista();
        nomeInput.value = '';
        falar(`Nome ${nome} adicionado.`);
    }
});

function atualizarLista() {
    listaNomes.innerHTML = '';
    nomes.forEach((nome, index) => {
        const item = document.createElement('li');
        item.textContent = nome;
        listaNomes.appendChild(item);
    });
}

sortearBtn.addEventListener('click', () => {
    if (nomes.length === 0) {
        alert('A lista de nomes está vazia. Adicione pelo menos um nome!');
    } else {
        const indiceSorteado = Math.floor(Math.random() * nomes.length);
        const nomeSorteado = nomes[indiceSorteado];
        resultado.textContent = `O amigo secreto sorteado é: ${nomeSorteado}`;
        falar(`O amigo secreto sorteado é: ${nomeSorteado}`);
    }
});

limparBtn.addEventListener('click', () => {
    nomes = [];
    atualizarLista();
    resultado.textContent = '';
    falar('A LISTA DE NOMES FOI LIMPA');
});

function falar(texto) {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';

    const vozes = window.speechSynthesis.getVoices();

    const vozFemininaBrasileira = vozes.find(voice => 
        voice.lang === 'pt-BR' && voice.name.includes('female')
    );

    if (vozFemininaBrasileira) {
        utterance.voice = vozFemininaBrasileira;
    } else {
        const vozBrasileira = vozes.find(voice => voice.lang === 'pt-BR');
        utterance.voice = vozBrasileira;
    }

    window.speechSynthesis.speak(utterance);
}
window.speechSynthesis.onvoiceschanged = () => {
    const vozes = window.speechSynthesis.getVoices();
};
