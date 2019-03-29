
$.ajax(
  { url: 'https://s3.amazonaws.com/faces-frontend/dados.json',
   dataType: 'json',
   crossDomain: true,
   success: function (dados) {
      console.log(dados);
      montaTabela(dados);
	  //limpaTabela();
      }
  })


  function montaTabela(dados) {

    
    for (var dados of dados) {
      var trTabela = document.createElement("tr");

      var tdInfoFoto = document.createElement("td");
      var tdInfoNome = document.createElement("td");
      var tdInfoFaceMatch = document.createElement("td");
      

      tdInfoNome.textContent = dados.nome;
      tdInfoFaceMatch.textContent = dados.faceMatch;
      tdInfoFoto = document.createElement("img");
      tdInfoFoto.height = 100;
      tdInfoFoto.width = 100;
      tdInfoFoto.src = 'https://s3.amazonaws.com/faces-imagens/' + dados.nome + '.png';
     


      trTabela.appendChild(tdInfoFoto);
      trTabela.appendChild(tdInfoNome);
      trTabela.appendChild(tdInfoFaceMatch);
      
      var tabela = document.querySelector("#tabela-site");

      tabela.appendChild(trTabela);
    }
  }
	
	function limpaTabela(){
		var Table = document.getElementById("tabela-site");
		Table.innerHTML = "";
	}
