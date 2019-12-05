DROP DATABASE IF EXISTS schema_db;

CREATE DATABASE schema_db;
USE schema_db;

CREATE TABLE department
(
    id INT
    auto_increment not null,
    name VARCHAR
    (30),
    primary key
    (id)
)

    CREATE TABLE roles
    (
        id INT
        auto_increment not null,
    title VARCHAR
        (30),
    salary DECIMAL
        (4,10),
    department_id INT,
    primary key
        (id)
)

        CREATE TABLE employees
        (
            id INT
            auto_increment not null,
    first_name VARCHAR
            (30),
            last_name VARCHAR
            (30),
            role_id INT,
            manager_id INT null
)
