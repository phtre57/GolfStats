import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { Injector } from '@sailplane/injector'
import { Table } from 'dynamodb-toolbox'

import { EnvName, getEnvName } from 'infra/env'

const marshallOptions = {
  // Whether to automatically convert empty strings, blobs, and sets to `null`.
  convertEmptyValues: false, // if not false explicitly, we set it to true.
  // Whether to remove undefined values while marshalling.
  removeUndefinedValues: false, // false, by default.
  // Whether to convert typeof object to map attribute.
  convertClassInstanceToMap: false, // false, by default.
}

const unmarshallOptions = {
  // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
  // NOTE: this is required to be true in order to use the bigint data type.
  wrapNumbers: false, // false, by default.
}

const translateConfig = { marshallOptions, unmarshallOptions }

export class DynamoClient {
  client: DynamoDBClient

  mainTable: Table<string, string, string>

  constructor(client: DynamoDBClient, table: Table<string, string, string>) {
    this.client = client
    this.mainTable = table
  }
}

const createClient = (): DynamoDBClient => {
  if (getEnvName() === EnvName.LOCAL) {
    return new DynamoDBClient({
      endpoint: 'http://localhost:8000',
    })
  }

  return new DynamoDBClient({})
}

const create = () => {
  const client = DynamoDBDocumentClient.from(createClient(), translateConfig)
  const table = new Table({
    name: 'MainTable',
    partitionKey: 'PK',
    sortKey: 'SK',
    DocumentClient: client,
  })

  return new DynamoClient(client, table)
}

Injector.register(DynamoClient, create)
