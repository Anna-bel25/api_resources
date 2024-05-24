CREATE DATABASE IF NOT EXISTS resourcedb;
USE resourcedb;

CREATE TABLE nivel_edu (
    nivel_id INT(11) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(45) NOT NULL,
    imagen VARCHAR(100) NOT NULL,
    PRIMARY KEY (nivel_id)
);

CREATE TABLE materia_nivel (
    materia_id INT(11) NOT NULL AUTO_INCREMENT,
    nivel_id INT(11) NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    imagen VARCHAR(500) NOT NULL,
    fecha DATE NOT NULL,
    autor VARCHAR(45) NOT NULL,
    descripcion VARCHAR(500) NOT NULL,
    PRIMARY KEY (materia_id),
    FOREIGN KEY (nivel_id) REFERENCES nivel_edu(nivel_id)
);

CREATE TABLE recurso_menu (
    recurso_id INT(11) NOT NULL AUTO_INCREMENT,
    materia_id INT(11) NOT NULL,
    tipo_recurso VARCHAR(45) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    calificacion INT(11) NOT NULL,
    PRIMARY KEY (recurso_id),
    FOREIGN KEY (materia_id) REFERENCES materia_nivel(materia_id)
);

CREATE TABLE recurso_video (
    video_id INT(11) NOT NULL AUTO_INCREMENT,
    materia_id INT(11) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    url VARCHAR(200) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    nivel VARCHAR(45) NOT NULL,
    materia VARCHAR(45) NOT NULL,
    PRIMARY KEY (video_id),
    FOREIGN KEY (materia_id) REFERENCES materia_nivel(materia_id)
);

CREATE TABLE recurso_actividad (
    actividad_id INT(11) NOT NULL AUTO_INCREMENT,
    materia_id INT(11) NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    imagen_url VARCHAR(200) NOT NULL,
    url VARCHAR(200) NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    nivel VARCHAR(45) NOT NULL,
    materia VARCHAR(45) NOT NULL,
    PRIMARY KEY (actividad_id),
    FOREIGN KEY (materia_id) REFERENCES materia_nivel(materia_id)
);

CREATE TABLE recurso_libro (
    libro_id INT(11) NOT NULL AUTO_INCREMENT,
    materia_id INT(11) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    imagen_url VARCHAR(500) NOT NULL,
    url VARCHAR(200) NOT NULL,
    fecha DATE NOT NULL,
    descripcion TEXT NOT NULL,
    nivel VARCHAR(45) NOT NULL,
    materia VARCHAR(100) NOT NULL,
    PRIMARY KEY (libro_id),
    FOREIGN KEY (materia_id) REFERENCES materia_nivel(materia_id)
);





DESCRIBE materia_nivel;


INSERT INTO nivel_edu VALUES
    (1, 'Preescolar', '/assets/img/preescolar.png'),
    (2, 'Primaria', '/assets/img/primaria.png'),
    (3, 'Secundaria', '/assets/img/secundaria.png'),
    (4, 'Bachillerato', '/assets/img/bachillerato.png');


INSERT INTO materia_nivel VALUES
    (1, 1, 'Lenguaje y Comunicación', 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmklQzMlQjFvcyUyMGNvbnZlcnNhbmRvfGVufDB8fDB8fHww', '2023-05-21', 'admin', 'El curso de Lenguaje y Comunicación en preescolar tiene como objetivo fomentar el desarrollo del lenguaje oral y las habilidades comunicativas en los niños en edad temprana. Se enfoca en actividades lúdicas y creativas que promueven el vocabulario.'),
    (2, 1, 'Pensamiento Matemático', 'https://plus.unsplash.com/premium_photo-1661292099839-1e89fe3fa727?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmklQzMlQjFvcyUyMGNvbiUyMG1hdGVtYXRpY2FzfGVufDB8fDB8fHww', '2023-05-21', 'admin', 'El curso de Pensamiento Matemático en preescolar tiene como objetivo introducir conceptos matemáticos básicos de manera lúdica y experiencial. Se enfoca en el reconocimiento de números, formas, patrones y secuencias, promoviendo el razonamiento lógico.'),
    (3, 1, 'Educación Física', 'https://plus.unsplash.com/premium_photo-1683133504417-7c9eabab7ade?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmklQzMlQjFvcyUyMGhhY2llbmRvJTIwZGVwb3J0ZXxlbnwwfHwwfHx8MA%3D%3D', '2023-05-21', 'admin', 'El curso de Educación Física en preescolar tiene como objetivo promover el desarrollo motor y la actividad física en los niños en edad preescolar. Se realizan actividades recreativas, juegos y ejercicios que favorecen la coordinación, la fuerza y la socialización de los niños.'),
    (4, 1, 'Arte y Creatividad', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmklQzMlQjFvcyUyMHBpbnRhbmRvfGVufDB8fDB8fHww', '2023-05-21', 'admin', 'El curso de Arte y Creatividad en preescolar tiene como objetivo estimular la imaginación, la expresión artística y la creatividad de los niños a través de diversas actividades plásticas, musicales y de expresión corporal. Se fomenta el desarrollo de habilidades manuales.');
