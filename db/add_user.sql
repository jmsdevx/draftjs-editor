INSERT INTO studentinfo
    ( student_id,
    f_name,
    l_name,
    email,
    nation,
    f_language,
    age,
    gender)
VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8);

SELECT *
FROM studentinfo