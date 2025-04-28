import express from "express";
import { initializeDatabase, dbAll, dbRun, dbGet } from "./util/database.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/albums", async (req, res) => {
    const albums = await dbAll("SELECT * FROM albums");
    res.json(albums);
});

app.get("/albums/:id", async (req, res) => {
    const album = await dbGet("SELECT * FROM albums WHERE id = ?", [req.params.id]);
    if (album) res.json(album);
    else res.sendStatus(404);
});

app.post("/albums", async (req, res) => {
    const { band, title, songs, year } = req.body;
    await dbRun(
        `INSERT INTO albums (band, title, songs, year) VALUES (?, ?, ?, ?);`,
        [band, title, songs, year]
    );
    res.sendStatus(200);
});

app.put("/albums/:id", async (req, res) => {
    const { band, title, songs, year } = req.body;
    await dbRun(
        `UPDATE albums SET band=?, title=?, songs=?, year=? WHERE id=?`,
        [band, title, songs, year, req.params.id]
    );
    res.sendStatus(200);
});

app.delete("/albums/:id", async (req, res) => {
    await dbRun("DELETE FROM albums WHERE id = ?", [req.params.id]);
    res.sendStatus(200);
});

async function startServer() {
    await initializeDatabase();
    app.listen(3000, () => {
        console.log("Server runs on port 3000");
    });
}

startServer();