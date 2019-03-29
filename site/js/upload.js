document.getElementById("upload-button").addEventListener("click", function(event){
    event.preventDefault()
});
	var fileChooser = document.getElementById('file-chooser');
	console.log(fileChooser);
	var button = document.getElementById('upload-button');
	var results = document.getElementById('results');
	button.addEventListener('click', function () {
		var file = fileChooser.files[0];
		console.log(file);
		var name = document.getElementById("file-chooser").name= "_analise.png";
		//document.getElementById("file-chooser").name = "_analise.png";
		//file.value = '_analise.jpg';
		
		console.log(name);
		if (file) {            
			AWS.config.update({
				"accessKeyId": "AKIAJYUIYU3CBFFJ4I5Q",
				"secretAccessKey": "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",
				"region": "us-east-1"
			});
			var s3 = new AWS.S3();
			var params = {
				Bucket: 'faces-imagens',
				Key: name,
				ContentType: file.type,
				Body: file,
				ACL: 'public-read'
			};        
			s3.putObject(params, function (err, res) {
				if (err) {
					results.innerHTML = ("Error uploading data: ", err);
				} else {
					results.innerHTML = ("Upload realizado com sucesso");
					setTimeout(function(){
						$.ajax(
					  { url: 'https://s3.amazonaws.com/faces-frontend/dados.json',
					   dataType: 'json',
					   crossDomain: true,
					   
					   success: function (dados) {
						  console.log(dados);
						  limpaTabela();
						  montaTabela(dados);
						  results.innerHTML ='';
						  }
					  })
					}, 10000);
					
				}
			});
		} else {
			results.innerHTML = 'Nothing to upload.';
		}
	}, false);