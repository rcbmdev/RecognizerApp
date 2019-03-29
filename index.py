import boto3
import json
from botocore.exceptions import ClientError
s3 = boto3.resource('s3')
client = boto3.client('rekognition')

imagens_total = []

def lista_imagens():
    imagens = []
    bucket = s3.Bucket('faces-imagens')
    for imagem in bucket.objects.all():
        imagens.append(imagem.key)
    return imagens

def indexa_colecao(imagens):
    for i in imagens:
        imagens_total.append(i)
        arquivo =s3.Object('faces-imagens','imagens.json')
        arquivo.put(Body=json.dumps(imagens_total))
        print(i)
        response = client.index_faces(
            CollectionId="faces",
            DetectionAttributes=[],
            ExternalImageId=i[:-4],
            Image={
                'S3Object': {
                    'Bucket': 'faces-imagens',
                    'Name': i,
                },
            },

        )
		

def cria_colecao():
    collectionId = 'faces'

    # Create a collection
    print('Creating collection:' + collectionId)
    response = client.create_collection(CollectionId=collectionId)
    print('Collection ARN: ' + response['CollectionArn'])
    print('Status code: ' + str(response['StatusCode']))
    print('Done...')


#exclui collection
def exclui_colecao():

    collectionId = 'faces'

    try:
        response = client.delete_collection(CollectionId=collectionId)
        statusCode = response['StatusCode']

    except ClientError as e:
        if e.response['Error']['Code'] == 'ResourceNotFoundException':
            print('The collection ' + collectionId + ' was not found ')
        else:
            print('Error other than Not Found occurred: ' + e.response['Error']['Message'])
        statusCode = e.response['ResponseMetadata']['HTTPStatusCode']
    print('Operation returned Status Code: ' + str(statusCode))
    print('Done...')


imagens = lista_imagens()
#print(imagens)
#cria_colecao()
#exclui_colecao()
indexa_colecao(imagens)
