Documentación desarrollo de prueba técnica – Brayan David Pulido Romero  

 

Implementación en github: 
 
 

Se crearon 3 ramas ya que es la forma ideal de llevar un proyecto estas 3 son : 

Main (ambiente productivo) 

Release (ambiente de pruebas) 

Develop (ambiente desarrollo) 

Las 3 ramas están protegidas para que solo se pueda subir cambios con pull request. 

 

Implementación microservicios: 

Descripción del Microservicio de Ingesta 

El microservicio de ingesta tiene como objetivo principal recibir, procesar y almacenar datos provenientes de diferentes fuentes. Este es el primer punto de entrada para los datos en el sistema 

Esta lambda está programada para que se ejecute todos los lunes a las 00:00 

 

 

Tecnologías Utilizadas 

AWS Lambda: Permite ejecutar el microservicio de manera serverless, manejando automáticamente la escalabilidad. 

API Gateway: Expone el endpoint público seguro para recibir las solicitudes de datos. 

CloudWatch: Monitorea las métricas y logs generados por el microservicio. 

Almacenamiento:  S3  

 

 

 

Ejecución  

 

Para probar este servicio local mente es necesario ejecutar el comando npm i y posterior a ello usar el comando npx serverless offline de esta manera se ejecutará nuestra lambda localmente, adicional se tiene que crear un archivo llamadado .env que debería de tener lo siguiente valores : 

 

 

  

AWS_REGION_DEV=us-east-2  

  

BUCKET_NAME=data-models-jl  

  

API_URL=https://my.api.mockaroo.com/models.json  

  

API_KEY=a6e95e60 

 

 

 

 

 

  

 

 

El siguiente paso es poner la ruta http://localhost:3000/dev/ingestion en nuestro navegador o aplicación de consumo como postman  

 

Prueba de consumo local : 
 
 

Al ejecutar esta lambda subira un archivo al buckets en el s3 el archivo con extencion .json contiene la data cruda de todos los datos que se sacaron de la api publica creada en la pagina https://mockaroo.com/schemas/671143, 

 

 

 

 

 

La api publica a la cual se le realizo el consumo es: https://my.api.mockaroo.com/models.jsonkey=a6e95e60  

 

 

La lambda esta desplegada en aws y se puede usar ejecutando en el navegador la siguiente ruta https://01eezx0ota.execute-api.us-east-2.amazonaws.com/dev/ingestion 

 

 

Para desplegar el micro servico en aws nuevamente usamos el comando serverless deploy 

 

 

Descripción del Microservicio de procesamiento de datos 

 

El microservicio de procesamiento se encarga de realizar análisis, cálculos y transformaciones más complejas sobre los datos recibidos, convirtiendo la información bruta en resultados procesados y útiles. Este microservicio es el encargado de transformar los datos ingresados en métricas, estadísticas o formatos preparados para ser consumidos por otros servicios, como reportes o visualizaciones. 

 

Ejecución : 

 

Para probar este micro servicio es necesario ejecutar el comando npm i en la consola y posterior a ello ejecutar el comando npx serverless invoke local --function process --path s3-event.json , se debe configurar el archivo que se encuentra en el proyecto llamado s3-event para que active el evento en la aplicación ya que esta funciona por  

Eventos. 

Se debe crear un archivo .env que contenga las siguientes variables de entorno  
 
 

AWS_REGION_DEV=us-east-2 

BUCKET_NAME=data-models-jl 

TABLE_NAME=processedData 

 

 

 

Este debería contener el nombre de uno de los archivos  que estan en el bucket del s3   

dentro del valor key “data-1737060334441.json” 

 

Ejemplo de uno de los valores que debería traer es  

 

 

 

 

Una vez ejecutado el comando podemos observar como en nuestra base de datos Dynamo bd  

 

Los datos que quedaron guardados se encuentras limpios y listos para poder visualizar en cualquier reporte  

 

Para desplegar el micro servico en aws nuevamente usamos el comando serverless deploy 

 

    Descripción del Microservicio de Data-retrieval-app 

 

Este micro Servio cumple con la funcionalidad de extraer los datos limpios que se encuentran en nuestra base de datos Dynamobd y los expone como resulta en la ejecución de la lambda. 

 

Ejecución  

 

Para probar esta lambda ejecutamos el comando en la consola npx serverless offline 

Y adiciona creamos un archivo que contenga las siguientes variables de entorno  

TABLE_NAME=processedData 
 
 

 

Una vez ejecutado el comando en nuestro navegador o aplicación de consumo web  

ejecutamos la url  

 

Para probar esta lambda la podemos usar en el navegador con el siguiente enlace https://chp7rfq8li.execute-api.us-east-2.amazonaws.com/dev/processed-data 

 

Para desplegar el micro servico en aws nuevamente usamos el comando serverless deploy 

 

 

 

Descripción aplicación frontend 

Esta aplicación crea con reac cuenta con un login integrado en cognito de aws 

Y se encarga de mostrar un pequeño reporte de los datos limpios que extraimos de DynamoDB  

 

Para probar este frontend ejecutamos el comando npm run dev y  iniciamos session con el usuario : 

User : brayavid19@gmail.com 

Contraseña : brayan1919* 

 

 

 

 

Una vez iniciada session nos mostrara un pequeño informe de la información extraída  

De nuestra base de datos dynamoDB 

 

 