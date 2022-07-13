import { oneLine } from 'common-tags'
import neo4j from 'neo4j-driver'
import { NextApiRequest, NextApiResponse } from 'next'

type Greeting = {
  message: string
  id: number
}

type CreateResponse = {
  error: string
} | {
  greetings: Greeting[]
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<CreateResponse>,
) {
  if (
    !req.method ||
    !['POST', 'GET'].includes(req.method)
  ) {
    res.status(405).send({ error: 'Method not allowed' })
    return
  }

  const driver = neo4j.driver('bolt://neo4j:7687')
  const session = driver.session()

  if (req.method === 'POST') {
    try {
      const result = await session.run(
        oneLine`CREATE (a:Greeting)
                    SET a.message = $message
                    RETURN a`,
        { message: 'Hello, World' },
      )

      const record = result.records[0].get(0)
      const id = record.identity.low
      const message = record.properties.message

      res.status(201).send({ greetings: [{ id, message }] })
    } catch (error: Error) {
      res.status(500).send({ error: error.message })
    } finally {
      await session.close()
    }
  }

  if (req.method === 'GET') {
    try {
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
    } catch (error: Error) {
      res.status(500).send({ error: error.message })
    } finally {
      await session.close()
    }
  }

  await driver.close()
}
