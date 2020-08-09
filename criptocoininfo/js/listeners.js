const busca = document.querySelector(".busca");
const btn = document.getElementById("btn");
const fechar = document.getElementById("fechar");
const form = document.getElementById("form");
var inputBusca = document.getElementById("inputBusca");

fechar.addEventListener("click", function (e) {
  e.preventDefault();
  busca.style.display = "none";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputBusca.value === "" || inputBusca.value === " ") {
    return alert("Busca vazia");
  }
  var textoBusca = inputBusca.value.toLowerCase();
  requisicao(true, textoBusca);
  busca.style.display = "block";
  console.log("busca :" + textoBusca);
});
