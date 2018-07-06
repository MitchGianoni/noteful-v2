DROP TABLE IF EXISTS notes;
CREATE TABLE notes(
	id serial PRIMARY KEY, 
	title text NOT NULL, content text, 
	created timestamp DEFAULT now(), 
	folder_id int REFERENCES folders(id) ON DELETE SET NULL);
ALTER SEQUENCE notes_id_seq RESTART 1000;
INSERT INTO notes (title, content, folder_id) VALUES 
('Tavares to Maple Leafs', 'Center John Tavares has signed a seven-year contract with his hometown Toronto Maple Leafs, lifting him back into the first-round fantasy conversation.', 100),
('Van Riemsdyk to Flyers', 'Left wing James van Riemsdyk has signed a five-year contract to rejoin the Philadelphia Flyers, where he played his first three NHL seasons.', 100),
('Hutton to Sabres', 'Goaltender Carter Hutton signed a three-year contract with the Buffalo Sabres, giving them a new No. 1 option for next season.', 100),
('Thompson deep sleeper after trade', 'Buffalo also acquired right wing Tage Thompson from the St. Louis Blues as part of its return for center Ryan O''Reilly.', 101),
('Neal to Flames', 'Forward James Neal signed a five-year contractwith the Calgary Flames.', 101),
('Green re-signs with Red Wings', 'Defenseman Mike Green will be back with the Detroit Red Wings on a two-year contract and should remain fantasy-relevant on their first power-play unit.', 102),
('Nichushkin back to Stars', 'Right wing Valeri Nichushkin signed a two-year contract to rejoin the Dallas Stars, strengthening their secondary scoring and improving their team fantasy depth.', 103),
('Mrazek to Hurricanes', 'Goaltender Petr Mrazek has signed a one-year contract with the Carolina Hurricanes.', 103),
('Blues sign Perron', 'Forward David Perron signed a four-year contract to return to the St. Louis Blues.', 101),
('Stastny to Golden Knights', 'Center Paul Stastny signed a three-year contract with the Vegas Golden Knights.', 100);		

DROP TABLE IF EXISTS folders;
CREATE TABLE folders(
	id serial PRIMARY KEY, 
	name text NOT NULL);
ALTER SEQUENCE folders_id_seq RESTART 100;
INSERT INTO folders (name) VALUES ('Archive'), ('Drafts'), ('Personal'), ('Work');