import neo4j from 'neo4j-driver'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).send({ error: 'Method not allowed' })
  }

  const driver = neo4j.driver('bolt://neo4j:7687')
  const session = driver.session()

  try {
    await session.run('MATCH (n) DETACH DELETE n')
    await session.run('CALL apoc.schema.assert({}, {})')
    return res.status(204).end()
  } catch (error) {
    return res.status(500).send({ error: error.message })
  } finally {
    await session.close()
    await driver.close()
  }
}
