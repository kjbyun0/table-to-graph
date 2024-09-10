function tableToGraph(friends) {
  // type your code here
  
  const graph = {};
  const rows = friends.split('<tr>');
  console.log("TableToGraph, rows: ", rows);

  for (let i = 2; i < rows.length; i++) {
    const row = rows[i].split('<td>');
    const vertex = row[1].split('</td>')[0].trim();
    const adjList = row[2].split('</td>')[0].split(',');
    const adjListF = [];
    adjList.forEach(vertex => {
      const trimedVertex = vertex.trim();
      if (trimedVertex !== '')
        adjListF.push(vertex.trim());
    });
    console.log("vertex: ", vertex, ", adjList: ", adjListF);

    graph[vertex] = adjListF;
  }

  for (const vertex in graph) {
    for (const adjVertex of graph[vertex]) {
      if (graph[adjVertex]) {
        const adjSet = new Set(graph[adjVertex]);
        if (!adjSet.has(vertex))
          graph[adjVertex].push(vertex);
      } else
        graph[adjVertex] = [vertex];
    }
  }

  return graph;
}

if (require.main === module) {
  function printResults(obj) {
    for (const key in obj) {
      console.log(`${key}: ${obj[key]}`);
    }
  }

  // add your own tests in here
  const friends = "<table><tr><th>Person</th><th>Friends</th></tr><tr><td>Fred</td><td>Jane, Carol, Anesh, Xi</td></tr><tr><td>Carol</td><td>Fred, Anesh, Janelle</td></tr></table>";
  const result = {
    Fred: ["Jane", "Carol", "Anesh", "Xi"],
    Jane: ["Fred"],
    Carol: ["Fred", "Anesh", "Janelle"],
    Anesh: ["Fred", "Carol"],
    Xi: ["Fred"],
    Janelle: ["Carol"]
  };

  console.log("Expecting: ");
  console.log(printResults(result));
  console.log("");
  console.log("Got: ");
  console.log(printResults(tableToGraph(friends)));

  console.log("");

  let testFriends = "<table><tr><th>Person</th><th>Friends</th></tr><tr><td>Gremlin</td><td></td></tr></table>";
  console.log(printResults(tableToGraph(testFriends)));
}

module.exports = tableToGraph;

// Please add your pseudocode to this file
// And a written explanation of your solution
