const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

// API GET
app.get("/players/", async (request, response) => {
  const getPlayerQuery = `
    SELECT
    *
    FROM 
    cricket_team`;
  const playerArray = await db.all(getPlayerQuery);
  response.send(playerArray);
});

app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const addPlayerQuery = `
    INSERT INTO
    cricket_team (player_name, jersey_number, role)
    VALUES
    (
        '${playerName}',
        ${jerseyNumber},
        '${role}' 
    );`;
  const dbResponse = await db.run(addPlayerQuery);
  response.send("Player Added to Team");
});

//API GET
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
    SELECT 
    *
    FROM
    cricket_team
    WHERE 
    player_id = ${playerId};`;
  const player = await db.get(getPlayerQuery);
  response.send(player);
});

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerDetails;
  const updatePlayerQuery = `
    UPDATE 
    cricket_team
    SET 
    player_name = '${playerName}',
    jersey_number = ${jerseyNumber}, 
    role = '${role}'
    WHERE 
    player_id = ${playerId};`;
  await db.run(updatePlayerQuery);
  response.send("Player Details Updated");
});

app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deletePlayerQuery = `
    DELETE FROM 
    cricket_team
    WHERE 
    player_id = ${playerId};`;
  await db.run(deletePlayerQuery);
  response.send("Player Removed");
});

/*app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
 SELECT
 *
 FROM
 cricket_team;`;
  const playersArray = await db.all(getPlayersQuery);
  const convertDbObjectToResponseObject = (dbObject) => {
    // create it
    return {
      playerId: dbObject.player_id,
      playerName: dbObject.player_name,
      jerseyNumber: dbObject.jersey_number,
      role: dbObject.role,
    };
  };
  response.send(
    playersArray.map((eachPlayer) =>
      convertDbObjectToResponseObject(eachPlayer)
    )
  );
});

//API POST

app.post("/players/", async (request, response) => {
  const addPlayerQuery = request.body;
  const { playerName, jerseyNumber, role } = addPlayerQuery;
  const addPlayerQuery = `
    INSERT INTO
    cricket_team (player_name, jersey_number, role)
    VALUES
    (
       '${playerName}',
        ${jerseyNumber},
       '${role}'
    );`;
  const dbResponse = await db.run(addPlayerQuery);
  const playerId = dbResponse.lastID;
  response.send("Player Added to Team");
});

// GET PLAYER API
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
    SELECT 
    *
    FROM 
    cricket_team
    WHERE 
    player_id = ${playerId};`;
  const player = await db.get(getPlayerQuery);
  response.send(player);
});

//API PUT

app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const addPlayerQuery = request.body;
  const { playerName, jerseyNumber, role } = addPlayerQuery;
  const updatePlayerQuery = `
    UPDATE
    cricket_team
    SET 
    player_name = ${playerName},
    jersey_number = ${jerseyNumber},
    role = ${role}
    WHERE 
    player_id = ${playerId};`;
  await db.run(updatePlayerQuery);
  response.send("Player Details Updated");
});

// API DELETE

app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deletePlayerQuery = `
    DELETE FROM
    cricket_team
    WHERE 
    player_id = ${playerId}`;
  await db.run(deletePlayerQuery);
  response.send("Player Removed");
});
//API POST
app.post("/players/", async (request, response) => {
  const playerDetails = request.body;
  const { playerName, jerseyNumber, role } = playerName;
  const addPlayerQuery = `
    INSERT INTO 
    cricket_team {playerName, jerseyNumber, role}
    VALUES
    ${playerName},
    ${jerseyNumber},
    ${role}
    `;
  const dbResponse = await db.run(addPlayerQuery);
  const playerId = dbResponse.lastID;
  response.send({ playerId: playerId });
});*/

//module.exports = app;*/
module.exports = app;
