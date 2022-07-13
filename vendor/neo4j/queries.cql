//-------------------------- Nodes/Entities/Objects --------------------------//

// Find Tom Hanks by name.
MATCH (tom {name: "Tom Hanks"}) RETURN tom

// Find the movie Cloud Atlas by title.
MATCH (cloudAtlas {title: "Cloud Atlas"}) RETURN cloudAtlas

// Find any ten people.
MATCH (people:Person) RETURN people.name LIMIT 10

// Find movies released in the '90s.
MATCH (nineties:Movie) WHERE nineties.released >= 1990 AND nineties.released < 2000 RETURN nineties.title



//------------------------- Edges/Relationships/Joins ------------------------//

// All Tom Hanks movies
MATCH (tom:Person {name: "Tom Hanks"})-[:ACTED_IN]->(tomHanksMovies) RETURN tom,tomHanksMovies

// Director of Cloud Atlas.
MATCH (cloudAtlas {title: "Cloud Atlas"})<-[:DIRECTED]-(directors) RETURN directors.name

// Tom Hanks's costars.
MATCH (tom:Person {name:"Tom Hanks"})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors) RETURN coActors.name

// Any involvement with Cloud Atlas
MATCH (people:Person)-[relatedTo]-(:Movie {title: "Cloud Atlas"}) RETURN people.name, Type(relatedTo), relatedTo


//-------------------------------- Linked Data -------------------------------//

// Find movies and actors up to four hops away from Kevin Bacon.
MATCH (bacon:Person {name:"Kevin Bacon"})-[*1..4]-(hollywood)
RETURN DISTINCT hollywood

// Find the shortest path to Kevin Bacon.
MATCH p=shortestPath(
  (bacon:Person {name:"Kevin Bacon"})-[*]-(meg:Person {name:"Meg Ryan"})
)
RETURN p



//---------------------------- Deeply Linked Data ----------------------------//

// Find which of Tom Hanks's costars costars have not themselves worked with Tom Hanks
MATCH (tom:Person {name:"Tom Hanks"})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors),
  (coActors)-[:ACTED_IN]->(m2)<-[:ACTED_IN]-(cocoActors)
WHERE NOT (tom)-[:ACTED_IN]->()<-[:ACTED_IN]-(cocoActors) AND tom <> cocoActors
RETURN cocoActors.name AS Recommended, count(*) AS Strength ORDER BY Strength DESC

// Find someone who can introduce Tom Hanks to Tom Cruise
MATCH (tom:Person {name:"Tom Hanks"})-[:ACTED_IN]->(m)<-[:ACTED_IN]-(coActors),
  (coActors)-[:ACTED_IN]->(m2)<-[:ACTED_IN]-(cruise:Person {name:"Tom Cruise"})
RETURN tom, m, coActors, m2, cruise


//---------------------------------- Cleanup ---------------------------------//

// Remove all nodes and relationships. Detach relationships first, as nodes with
// relationships cannot be deleted.
MATCH (n) DETACH DELETE n
