INSERT INTO department (name)
VALUES
('Analysis'),
('Dev Ops'),
('Sales'),
('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
('Data Scientist', 100000, 1),
('AVP of Analytics', 130000, 1),
('Junior Developer', 70000, 2),
('Director of Dev Ops', 180000, 2),
('Senior Sales Rep', 75000, 3),
('Director of Sales', 200000, 3),
('Marketing Specialist', 60000, 4),
('AVP of Marketing', 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Kayla', 'Hudson', 1, NULL),
('Sarah', 'Sanchez', 2, 1),
('Pat', 'Halentine', 3, NULL),
('Travis', 'Gonzales', 4, 3),
('Allyson', 'Harlin', 5, NULL),
('Ginger', 'Pak', 6, 5),
('Sophia', 'Ben', 7, NULL),
('Clarissa', 'Jinn', 8, 7);