require('dotenv').config();
const {Router} = require('express');
const { firestore, app } = require('firebase-admin');
const router = Router();
const admin = require('firebase-admin');
const path = require('path')

const serviceAccount = require(path.join('../../', process.env.DATABASEKEY)); 

console.log(process.env.DATABASEKEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASEURL
})

const db = admin.database();


router.get('/', (req, res)=>{
    res.render('index')
});

router.post('/new-contact', (req, res)=>{
    console.log(req.body);
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email : req.body.email,
        phone : req.body.phone
    };
    db.ref('contacts').push(newContact);
    res.send('recibido'); 
})

module.exports = router;