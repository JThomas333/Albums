import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./date/database.sqlite");

export function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

export function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export async function initializeDatabase() {
    await dbRun("DROP TABLE IF EXISTS albums;");
    await dbRun(
      "CREATE TABLE IF NOT EXISTS albums (id INTEGER PRIMARY KEY AUTOINCREMENT, band TEXT, title TEXT, songs INTEGER, year INTEGER);"
    );

    const albums = [
        { band: "Road", title: "M.A.T.T.", songs: 12, year: 2006 },
        { band: "Tankcsapda", title: "Rockmafia Debrecen", songs: 12, year: 2012 },
        { band: "Pokolgép", title: "Metál az ész", songs: 14, year: 1990 }
    ];

    for (const a of albums) {
        await dbRun(
            "INSERT INTO albums (band, title, songs, year) VALUES (?, ?, ?, ?);",
            [a.band, a.title, a.songs, a.year]
        );
    }
}