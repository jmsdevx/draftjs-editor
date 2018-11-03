delete FROM homework
WHERE hw_id = $1;

SELECT *
FROM homework
ORDER BY hw_id DESC