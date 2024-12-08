DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS properties;
DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts(
    id serial PRIMARY KEY,
    address char(42) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS properties(
    id serial PRIMARY KEY,
    pausable boolean NOT NULL,
    burnable boolean NOT NULL,
    mintable boolean NOT NULL,
    ownable boolean NOT NULL,

    UNIQUE (pausable, burnable, mintable, ownable)
);

CREATE TABLE if NOT EXISTS tokens(
    id serial PRIMARY KEY,
    address char(42) NOT NULL UNIQUE,
    owner int NOT NULL,
    properties int NOT NULL,

    FOREIGN KEY(owner) REFERENCES accounts(id),
    FOREIGN KEY(properties) REFERENCES properties(id)
);