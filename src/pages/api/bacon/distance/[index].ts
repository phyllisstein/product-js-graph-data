import { oneLine } from 'common-tags'
import neo4j from 'neo4j-driver'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'Method not allowed' })
  }

  const distance = Number.parseInt(req.query.index as string, 10)

  if (
    Number.isNaN(distance) ||
    distance < 1
  ) {
    return res.status(400).send({ error: 'Must specify distance in Bacon numbers' })
  }

  const driver = neo4j.driver('bolt://neo4j:7687')
  const session = driver.session()

  const query = oneLine`
    MATCH (bacon:Person { name: "Kevin Bacon" }) -[*..${ distance }]-(hollywood)
    RETURN DISTINCT hollywood
  `

  try {
    await session.run(query)

    const result = await session.readTransaction(tx =>
      tx.run(
        query,
      ),
    )

    const baconators = Array.from(result.records).reduce((results, record) => {
      const concreteRecord = record.get(0)
      const kind = concreteRecord.labels[0]

      console.log(concreteRecord)

      if (kind === 'Person') {
        results.people.push({
          born: concreteRecord.properties.born?.low,
          id: concreteRecord.identity.low,
          name: concreteRecord.properties.name,
        })
        return results
      }

      if (kind === 'Movie') {
        results.movies.push({
          id: concreteRecord.identity.low,
          released: concreteRecord.properties.released?.low,
          tagline: concreteRecord.properties.tagline,
          title: concreteRecord.properties.title,
        })
        return results
      }
    },{
      movies: [],
      people: [],
    })

    res.status(200).send({ baconators })
  } catch (error: Error) {
    return res.status(500).send({ error: error.message })
  } finally {
    await session.close()
    await driver.close()
  }
}
