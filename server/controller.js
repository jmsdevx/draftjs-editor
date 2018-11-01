module.exports = {
  addStudent: (req, res, next) => {
    const dbInstance = req.app.get("db");
    console.log(req.body);
    const {
      student_id,
      f_name,
      l_name,
      email,
      nation,
      f_language,
      age,
      gender
    } = req.body;

    dbInstance
      .add_user([
        student_id,
        f_name,
        l_name,
        email,
        nation,
        f_language,
        age,
        gender
      ])
      .then(response => res.status(200).send(response))
      .catch(error => {
        res.status(500).send(error);
        console.log(error);
      });
  },
  addHomework: (req, res, next) => {
    const dbInstance = req.app.get("db");
    console.log(req.body);
    const { student_id, hw_title, hw_content } = req.body;

    dbInstance
      .add_homework([student_id, hw_title, hw_content])
      .then(response => res.status(200).send(response))
      .catch(error => {
        res.status(500).send(error);
        console.log(error);
      });
  },

  getAllHomework: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .get_all_homework()
      .then(response => res.status(200).json(response))
      .catch(error => {
        res.status(500).send(error);
        console.log(error);
      });
  },

  getOneHomework: (req, res, next) => {
    const dbInstance = req.app.get("db");
    console.log(req.params.id);
    dbInstance
      .get_one_homework(req.params.id)
      .then(response => res.status(200).json(response))
      .catch(error => {
        res.status(500).send(error);
        console.log(error);
      });
  },

  deleteHomework: (req, res) => {
    const { id } = req.params;
    const dbInstance = req.app.get("db");

    dbInstance
      .delete_homework(id)
      .then(console.log(id))
      .then(response => {
        // console.log(`"newArr:" ${response}`);
        res.status(200).send(response);
      })
      .catch(e => res.status(500).send(e));
  },

  editHomework: (req, res) => {
    const { id } = req.params;
    const { hw_title, hw_content } = req.body;
    console.log(id, hw_title, hw_content);
    const dbInstance = req.app.get("db");

    dbInstance
      .edit_homework([id, hw_title, hw_content])
      .then(response => {
        console.log(`"newArr:" ${response}`);
        res.status(200).send(response);
      })
      .catch(e => res.status(500).send(e));
  }
};
