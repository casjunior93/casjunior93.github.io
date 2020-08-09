var apiKey = {
  key: "97939b9d-a1b9-44b9-b4c2-b5a456e713a30",
};

//requisiçao Get
function requisicao(seBusca, valorBusca) {
  fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=" +
      apiKey.key
  )
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((api) => {
      if (!seBusca) {
        var texto = "";

        for (let i = 1; i <= 50; i++) {
          texto =
            texto +
            `<div class="media">
            <p>${api.data[i].symbol}</p>
            <p>${api.data[i].name}</p>
            <p>Desde: ${api.data[i].first_historical_data
              .substr(0, 10)
              .split("-")
              .reverse()
              .toString()
              .replace(/,/g, "/")}</p>
        </div>`;
          document.getElementById("coins").innerHTML = texto;
        }
      } else if (seBusca) {
        var apiBusca = api.data;
        var buscador = apiBusca.filter((valor) => {
          return valor.name.toLowerCase() === valorBusca;
        });

        console.log(buscador);

        if (buscador == 0) {
          textoErro =
            "<p class='resultadoBusca'>Nenhum resultado para a busca.</p>";
          return (document.querySelector(".aviso").innerHTML = textoErro);
        } else if (buscador.lenght != 0) {
          texto = `
            <div class="resultado">
              <p>${buscador[0].symbol}</p>
              <p>${buscador[0].name}</p>
              <p>Desde: ${buscador[0].first_historical_data
                .substr(0, 10)
                .split("-")
                .reverse()
                .toString()
                .replace(/,/g, "/")}</p>
            </div>
          `;
          console.log("Certo");
          return (document.querySelector(".aviso").innerHTML = texto);
        }
      }
    })
    .catch((error) => {
      document.querySelector(
        ".aviso"
      ).innerHTML = `<p>Não foi possível consultar o servidor. Erro: ${error.message}</p>`;
      busca.style.display = "block";
      fechar.style.display = "none";
    });
}

requisicao(false, 0);
