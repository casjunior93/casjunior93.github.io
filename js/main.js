var anoAtual = new Date();
var idade = anoAtual.getFullYear() - 1993;

const pAnos = document.querySelector(".anos");
pAnos.innerHTML = idade;