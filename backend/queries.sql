CREATE TABLE ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price REAL,
    picture VARCHAR(255),
    location VARCHAR(100),
	createdAt DATE,
	category_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE category 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name  VARCHAR(100) NOT NULL
);

INSERT INTO category (name) VALUES 
    ('vêtement'),
    ('voiture'),
    ('autre');


INSERT INTO ad (title, owner, price, location, createdAt, category_id) VALUES 
    ('Vieux jeans troués', 'Nick', 200, 'Bordeaux', '2023-09-01', 1),
    ('T-shit hello world', 'Pierre', 9.99, 'Lyon', '2023-09-02', 1),
    ('chausettes wild code school', 'Anna', 4.49, 'Paris', '2023-09-01', 1),
    ('R5 pour pièces', 'Patrick', 100, 'Bordeaux', '2023-09-10', 2),
    ('DeLorean DMC-12', 'Marty', 70000, 'Paris', '2023-09-13', 2),
    ('Peugeot 206', 'Amélie', 2000, 'Lyon', '2023-09-05', 2),
    ('Opel Corsa', 'Lucie', 1000, 'Bordeaux', '2023-09-06', 2),
    ('Jeu de cartes pokémon collector', 'Jean', 350, 'Lyon', '2023-09-06', 3),
    ('Chaine hifi complète', 'Jean', 80, 'Paris', '2023-09-01', 3);


SELECT * FROM ad; 

SELECT * FROM ad WHERE location = 'Bordeaux';

DELETE FROM ad WHERE price > 40; 

UPDATE ad SET price = 0 WHERE createdAt = '2023-09-01'

SELECT AVG(price) FROM ad WHERE location = 'Paris'

SELECT location, AVG(price) as 'prix moyen des annonces' FROM ad GROUP BY location

SELECT * FROM ad WHERE category_id = 1;

SELECT * FROM ad WHERE category_id IN(1, 2);

SELECT AVG(price) FROM ad WHERE category_id = 3;

SELECT * FROM ad as a JOIN category as c ON a.category_id = c.id WHERE c.name LIKE 'v%';
