// fazendo requisições via Ajax ao arquivo file.json
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var opcTabela = JSON.parse(this.responseText);

        //variaveis
        var section = document.querySelector("#caixa");
        var arrNumerosDistintos = [];

        //funcoes

        //essa funcao retorna tudo o que tem id_variacao != de 34
        function retornaGrupos() {
            return opcTabela[1].filter( obj => obj.id_variacao !== "34");
        }

        //busca um id_variacao especifico para recuperar um array com todas as opcoes com o msm id_variacao
        function retornaGrupoEspecifico(idVariacao) {
            return opcTabela[1].filter( obj => obj.id_variacao === idVariacao);
        }

        //identifica os diferentes id_variacao recuperados de retornaGrupos()
        function retornaNumeroDosGrupos() {

            let anterior = 0;

            for(var i = 0; i < retornaGrupos().length; i++) {

                let dadosRetornados = retornaGrupos();
                if(dadosRetornados[i].id_variacao != anterior) {
                    arrNumerosDistintos.push(dadosRetornados[i].id_variacao);
                } 

                anterior = dadosRetornados[i].id_variacao;
            }

            return [ ...new Set( arrNumerosDistintos ) ];
        }

        //cria uma div.opcoes e todas as suas tags
        function criandoACaixaDeOpcoes(idGrupo) {
            //add div opcoes
            var divOpcoes = document.createElement("div");
            divOpcoes.classList.add("opcoes");
            divOpcoes.setAttribute("id", "idGrupo_"+idGrupo);
            section.appendChild(divOpcoes);
            //add titulo do grupo
            divTituloOpcoes = document.createElement("div");
            divTituloOpcoes.classList.add("caixaDetexto");
            pTexto = document.createElement("p");
            pTexto.classList.add("texto");
            pTexto.textContent = "Escolha ";
            divTituloOpcoes.appendChild(pTexto);
            divOpcoes.appendChild(divTituloOpcoes);
            //criando as ul
            ulOpcoes = document.createElement("ul");
            divOpcoes.appendChild(ulOpcoes);
        }

        //cria um li.li e todas as suas tags
        function criandoAsOpcoes(idOpcao, nomeOpcao, textoDescricao) {
            //criando as li
            liOpcoes = document.createElement("li");
            liOpcoes.classList.add("li");
            liOpcoes.setAttribute("id", "idOpcao_" + idOpcao);
            pTextoLi = document.createElement("p");
            pTextoLi.classList.add("texto");
            descricaoOpcao = document.createElement("p");
            descricaoOpcao.classList.add("descricao");
            pTextoLi.textContent = nomeOpcao;
            descricaoOpcao.textContent = textoDescricao;
            liOpcoes.appendChild(pTextoLi);
            liOpcoes.appendChild(descricaoOpcao);
            ulOpcoes.appendChild(liOpcoes);
        }

        //imprime as div.opcoes e li.li
        function leEImprimeOpcoes() {

            let arrayNumeroGrupos = retornaNumeroDosGrupos();

            for(var i = 0; i < arrayNumeroGrupos.length; i++) {

                criandoACaixaDeOpcoes(arrayNumeroGrupos[i]);
                var arrGrupoEspecifico = retornaGrupoEspecifico(arrayNumeroGrupos[i]);

                for(var j = 0; j < arrGrupoEspecifico.length; j++) {
                    criandoAsOpcoes(arrGrupoEspecifico[j].id, arrGrupoEspecifico[j].opcao, arrGrupoEspecifico[j].descricao);
                }
            }
            
        }

        //imprime tudo
        leEImprimeOpcoes();
        console.log(section);

    }
};
xmlhttp.open("GET", "json/opcoes3.json", true);
xmlhttp.send();