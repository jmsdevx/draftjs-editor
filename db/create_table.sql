
-- CREATE TABLE studentinfo
-- (
--     id SERIAL PRIMARY KEY,
--     student_id INTEGER,
--     f_name VARCHAR(100),
--     l_name VARCHAR(100),
--     email TEXT,
--     nation VARCHAR(100),
--     f_language VARCHAR(100),
--     age INTEGER,
--     gender VARCHAR(50)

-- )

CREATE TABLE homework
(
    hw_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES studentinfo(student_id),
    hw_title VARCHAR(100),
    hw_content jsonb

)