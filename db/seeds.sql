INSERT INTO department (name)
VALUES
('Analysis'),
('Dev Ops'),
('Sales'),
('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
('Data Scientist', '100000', 1),
('AVP of Analytics', '130000', 1),
('Junior Developer', '70000', 2),
('Director of Dev Ops', '180000', 2),
('Senior Sales Rep' '75000', 3),
('Director of Sales', '200000', 3),
('Marketing & Communication Specialist', '60000', 4),
('AVP of Marketing', '130000', 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Sarah', 'Sanchez', 1, NULL),
('Kayla', 'Hudson', 2, 1),
('Travis', 'Gonzales', 3, NULL),
('Pat', 'Halentine', 4, 3),
('Ginger', 'Pak', 5, NULL),
('Allyson', 'Harlin', 6, 5),
('Clarissa', 'Jinn', 7, NULL),
('Sophia', 'Ben', 8, 7);