# Recognizer App
Aplicação web servless para reconhecimento facil na AWS.

## Introdução

Para executar a aplicação web, siga algumas instruções abaixo:

### Prerequisites

Você deve criar uma função em Python 3.6 na AWS Lambda e subir o arquivo faceanalise.zip.

```
Esse arquivo vai disparar um evento automático para que toda vez que uma imagem seja carregada na aplicação, a função seja executada.
```

### Configuração

Na aplicação usamos um Bucket S3 para o armazenamento de imagens. Você deve criar um bucket e armazenar suas imagens de análise nele. Caso queiram saber mais detalhes acessem o link abaixo:
```
https://estudosia.blogspot.com/2018/06/amazon-rekognition-na-pratica.html
```

## Execução da aplicação
Após a configuração de todos os passos acima, basta abrir o diretório site e navegar pelo arquivo index.html. Como é um site estático, ele pode ser colocado em produção num Bucket S3.

Segue uma demonstração da Aplicação:

![](RecognizerApp.gif)
