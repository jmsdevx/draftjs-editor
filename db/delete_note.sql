delete FROM notes
WHERE note_id = $1;

SELECT *
FROM notes
WHERE student_id = $2
ORDER BY note_id DESC