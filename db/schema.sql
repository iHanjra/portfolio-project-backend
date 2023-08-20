DROP DATABASE IF EXISTS shirts_dev;

CREATE DATABASE shirts_dev;

\c shirts_dev;

DROP TABLE IF EXISTS shirts;

CREATE TABLE shirts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT,
    size TEXT,
    price DEC(7, 2),
    store TEXT,
    is_favorite BOOLEAN DEFAULT false,
    image TEXT DEFAULT 'https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C51Q6Wb%2BEakL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX679._SX._UX._SY._UY_.png',
    created_at TIMESTAMPTZ DEFAULT NOW()
);