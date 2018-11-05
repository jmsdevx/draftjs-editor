select *
from notes
WHERE student_id = $1
ORDER BY note_id DESC