import { oneLine } from 'common-tags'
import neo4j from 'neo4j-driver'
import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const driver = neo4j.driver('bolt://neo4j:7687')
  const session = driver.session()

  if (req.method === 'POST') {
    try {
      const result = await session.run(
        oneLine`CREATE (a:Greeting)
                    SET a.message = $message
                    RETURN a.message + ", from node " + id(a)`,
        { message: 'Hello, World' },
      )

      const record = result.records[0]
      const greeting = record.get(0)

      res.status(201).send({ greeting, record })
    } catch (error) {
      res.status(500).send({ error: error.message })
    } finally {
      await session.close()
    }
  }

  if (req.method === 'GET') {
    const result = await session.readTransaction(tx =>
      tx.run('MATCH (a:Greeting) RETURN a'),
    )

    const greetings = result.records.map(record => {
      const concreteRecord = record.get(0)
      const message = concreteRecord.properties.message
      const id = concreteRecord.identity.low
      return {
        id,
        message,
      }
    })

    res.status(200).send({ greetings })
  }

  await driver.close()

  res.status(405).send({ error: 'Method not allowed' })
}
