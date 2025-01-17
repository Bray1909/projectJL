import axios from 'axios';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();
AWS.config.update({ region: process.env.AWS_REGION_DEV });

//instancia de S3
const s3 = new AWS.S3();

export async function handler(event: any) {
  try {

    if (!process.env.BUCKET_NAME) {
      throw new Error('BUCKET_NAME is not defined in the environment variables');
    }

    const response = await axios.get(`${process.env.API_URL}?key=${process.env.API_KEY}`);
    const data = response.data;
    const bucketName = process.env.BUCKET_NAME; 
    const keyName = `data-${Date.now()}.json`;

    await s3
      .putObject({
        Bucket: bucketName,
        Key: keyName,
        Body: JSON.stringify(data),
        ContentType: 'application/json',
      })
      .promise();

    console.log('Data successfully uploaded to S3');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data ingested and stored successfully', keyName }),
    };
  } catch (error) {
    console.error('Error during data ingestion:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error during data ingestion' }),
    };
  }
}
