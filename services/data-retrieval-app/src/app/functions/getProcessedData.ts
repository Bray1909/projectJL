import AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from 'aws-lambda';
import dotenv from 'dotenv';

dotenv.config();
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandler = async (event) => {
  try {

    if (!process.env.TABLE_NAME) {
      throw new Error('TABLE_NAME is not defined in the environment variables');
    }
    const params = {
      TableName:  process.env.TABLE_NAME, 
    };

    const result = await dynamoDb.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error fetching processed data:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching data' }),
    };
  }
};
