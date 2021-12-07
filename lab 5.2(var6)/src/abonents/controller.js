
const Abonents = require ("./model.js");

const abonentController = {
    getAll:(req,res) => {
        res.send(Abonents);
    },



    // отримання вибірки з колекції згідно з вказаними параметрами (параметри передаються через рядок стану)
    qetQuery:(req,res) => {
        let queriedAbonents = Abonents;

        if(req.query.owner)
            queriedAbonents = queriedAbonents.filter((abonent) => abonent.owner == req.query.owner);

        if(req.query.bill)
            queriedAbonents = queriedAbonents.filter((abonent) => abonent.bill >= req.query.bill);

        res.send(queriedAbonents);
        
        

    },


    // отримання інформації щодо одного об’єкту (за Кодом),
    getById: (req,res) => {
        let abonent = Abonents.find((abonent) => abonent.id == parseInt(req.params.id));

        if(abonent != null) res.status(200).send(abonent);
        
        else res.status(404).send("Not Found");
    },


    //видалення інформації про вказаний об’єкт.
    delete:(req, res) => {
        let index = Abonents.findIndex((abonent) => abonent.id === parseInt(req.params.id));
        if (index >= 0) {
            let deletedAbonent = Abonents[index];
            Abonents.splice(index, 1);
            res.send(deletedAbonent);
        } else res.status(404).send("Not Found");
    },


    //додавання одного об’єкту,
    post: (req, res) => {
        let newAbonent = {
            id: Number(Date.now()),
            ...req.body,
        };
        Abonents.push(newAbonent);
        res.send(newAbonent);
    },



    // редагування інформації  про вказаний об’єкт.
    patch: (req, res) => {
        let index = Abonents.findIndex((abonent) => abonent.id === parseInt(req.params.id));
        if (index >= 0) {
            let updatedAbonent = Abonents[index];
            for (let key in updatedAbonent)
                if (req.body[key]) updatedAbonent[key] = req.body[key];
            res.send(updatedAbonent);
        } else res.status(404).send("Not Found");
    },


    //додавання колекції об’єктів,

    getCollection : (req,res) => {
        for(let item of req.body){
            Abonents.push(item);
          }
         
          res.send(Abonents);

    }, 

    // Запит абонентів за казаною адресою із тривалістю розмов більше ніж вказана.

    getDuration: (req,res) =>{
        let abonents = Abonents.find((abonent) => abonent.duration > 1000 && abonent.address === "Lehozkoho");
        if (abonents !== null) res.status(200).send(abonents);
        else res.status(404).send("Not Found");

    }







};

module.exports = abonentController;
