CREATE DATABASE IF NOT EXISTS odontologia;
USE odontologia;

-- Tabla de Usuarios (Doctora y Auxiliar)
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'auxiliar') NOT NULL
);

-- Tabla de Pacientes
CREATE TABLE Pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    documento_identidad VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_nacimiento DATE,
    genero ENUM('Masculino', 'Femenino', 'Otro')
);

-- Tabla de Citas
CREATE TABLE Citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha DATETIME NOT NULL,
    estado ENUM('pendiente', 'atendida', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (id_paciente) REFERENCES Pacientes(id_paciente) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla de Historias Clínicas (cabecera)
CREATE TABLE HistoriaClinica (
    id_historia INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observaciones_generales TEXT,
    FOREIGN KEY (id_paciente) REFERENCES Pacientes(id_paciente) ON DELETE CASCADE
);

-- Tabla de Antecedentes
CREATE TABLE Antecedentes (
    id_antecedente INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    tipo_antecedente ENUM('Médico', 'Familiar', 'Quirúrgico', 'Alérgico'),
    detalle TEXT,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);

-- Tabla de Frecuencia de Cepillado
CREATE TABLE FrecuenciaCepillado (
    id_cepillado INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    veces_dia INT,
    usa_hilo_dental BOOLEAN DEFAULT FALSE,
    usa_enjuague BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);

-- Tabla de Examen Clínico
CREATE TABLE ExamenClinico (
    id_examen_clinico INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    detalle_examen TEXT,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);

-- Tabla de Examen Estomatológico
CREATE TABLE ExamenEstomatologico (
    id_examen_estoma INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);

-- Tabla de Diagnóstico General
CREATE TABLE DiagnosticoGeneral (
    id_diagnostico INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    detalle_diagnostico TEXT,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);

-- Tabla de Pronóstico General
CREATE TABLE PronosticoGeneral (
    id_pronostico INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    detalle_pronostico TEXT,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);

-- Tabla de Alteraciones Periodontales
CREATE TABLE AlteracionesPeriodontales (
    id_periodontal INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);

-- Tabla de Alteraciones Pulpares
CREATE TABLE AlteracionesPulpares (
    id_pulpar INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);

-- Tabla de Análisis de Oclusión y ATM
CREATE TABLE AnalisisOclusionATM (
    id_oclusion INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    descripcion TEXT,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);

-- Tabla de Plan de Tratamiento Odontológico
CREATE TABLE PlanTratamientoOdontologico (
    id_plan_tratamiento INT AUTO_INCREMENT PRIMARY KEY,
    id_historia INT NOT NULL,
    tratamientos_propuestos TEXT,
    observaciones TEXT,
    FOREIGN KEY (id_historia) REFERENCES HistoriaClinica(id_historia) ON DELETE CASCADE
);
