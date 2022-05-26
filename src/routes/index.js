require('dotenv').config();
const {Router} = require('express');
const { firestore, app } = require('firebase-admin');
const router = Router();
const admin = require('firebase-admin');
const path = require('path')
const express = require('express')
const serviceAccount = require(path.join('../../', process.env.DATABASEKEY)); 
const direname = express();

console.log(process.env.DATABASEKEY);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASEURL
})

const db = admin.database();

direname.use(express.static(__dirname + '/src/public/'));

router.get('/', (req, res)=>{
        res.render('index');
});

router.post('/new-contact', (req, res)=>{
    console.log(req.body);
    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email : req.body.email,
        phone : req.body.phone,
        reason : req.body.reason
    };
    db.ref('contacts').push(newContact);
    res.redirect('/');
});

router.get('/go-to-contact', (req, res)=>{
    res.render('contact');
});

router.get('/go-to-singInContact', (req, res) =>{
    res.render('sigInContact');
});

module.exports = router;
