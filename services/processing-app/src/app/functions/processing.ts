import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION_DEV });

export async function handler(event: any) {
  try {

    const record = event.Records[0];
    const bucket = record.s3.bucket.name;
    const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

    if (!process.env.TABLE_NAME) {
      throw new Error('TABLE_NAME is not defined in the environment variables');
    }

    const s3Data = await s3.getObject({ Bucket: bucket, Key: key }).promise();

    if (!s3Data.Body) {
      throw new Error('S3 Object Body is undefined');
    }

    const rawData = JSON.parse(s3Data.Body.toString());

    const processedData = rawData.map((item: any) => ({
      id: item.id,
      name: item.name,
      rating: item.rating,
      platform: item.platform,
      moneyWeek: parseFloat(item.moneyWeek.replace('$', '')),
      processedAt: new Date().toISOString(), 
    }));
    
    for (const data of processedData) {
      await dynamoDB
        .put({
          TableName: process.env.TABLE_NAME,
          Item: data,
        })
        .promise();
    }

    console.log('Data processed and stored successfully.');
    return { statusCode: 200, body: 'Data processed successfully' };
  } catch (error) {
    console.error('Error processing data:', error);
    return { statusCode: 500, body: JSON.stringify({ message: 'Error processing data', error }) };
  }
}
