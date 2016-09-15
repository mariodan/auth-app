CREATE TABLE IF NOT EXISTS User
(
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  email                TEXT,
  passwordHash         TEXT,
  firstName            TEXT,
  lastName             TEXT,
  lastLogout           INTEGER
);

CREATE INDEX IF NOT EXISTS User_idx_email ON User (email);