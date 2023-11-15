DROP table ad;

CREATE TABLE ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price REAL,
    picture VARCHAR(255),
    location VARCHAR(100),
	createdAt DATE
	category VARCHAR(100)
);

INSERT INTO ad (title, owner, price, location, createdAt) VALUES 
    ('Vieux jeans troués', 'Nick', 200, 'Bordeaux', '2023-09-01'),
    ('T-shit hello world', 'Pierre', 9.99, 'Lyon', '2023-09-02'),
    ('chausettes wild code school', 'Anna', 4.49, 'Paris', '2023-09-01'),
    ('R5 pour pièces', 'Patrick', 100, 'Bordeaux', '2023-09-10'),
    ('DeLorean DMC-12', 'Marty', 70000, 'Paris', '2023-09-13'),
    ('Peugeot 206', 'Amélie', 2000, 'Lyon', '2023-09-05'),
    ('Opel Corsa', 'Lucie', 1000, 'Bordeaux', '2023-09-06'),
    ('Jeu de cartes pokémon collector', 'Jean', 350, 'Lyon', '2023-09-06'),
    ('Chaine hifi complète', 'Jean', 80, 'Paris', '2023-09-01');


SELECT * FROM ad; 

SELECT * FROM ad WHERE location = 'Bordeaux';

DELETE FROM ad WHERE price > 40; 

UPDATE ad SET price = 0 WHERE createdAt = '2023-09-01'

SELECT AVG(price) FROM ad WHERE location = 'Paris'

SELECT location, AVG(price) as 'prix moyen des annonces' FROM ad GROUP BY location