INSERT INTO notes
    (student_id,
    note_title,
    note_content
    )

VALUES( $1, $2, $3);

SELECT MAX(note_id)
FROM notes