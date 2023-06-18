const { Class,Studend } = require("../models/populateModel");


// stutent Ctreate
exports.creatStudent = async (req, res, next) => {
  let student = new Studend();
  const { name, age, subject } = req.body;
  student.name = name,
  student.age = age,
  student.subject = subject,
  student.save((err)=>{
    if(err) res.json({"error":err});
    else res.json(student);
  })
};

// class create
exports.creatClass = async (req, res, next) => {
  let classEl = new Studend();
  const { name } = req.body;
  classEl.name = name,
  classEl.studends = [];
  classEl.save((err)=>{
    if(err) res.json({"error":err});
    else res.json(classEl);
  })
};
exports.student = async (req, res, next) => {
    Studend.find({}).exec((err,docs)=>{
        if(err) throw(err);
        res.json(docs);
    })
  };

  exports.classes = async (req, res, next) => {
    Class.find({}).exec((err,docs)=>{
        if(err) throw(err);
        res.json(docs);
    })
  };