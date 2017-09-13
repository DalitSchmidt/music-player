// קובץ ה- users מכיל בצורה מרוכזת את כל הבקשות השונות לנתיבים הקשורים ב- API ל- users
// הגדרת המשתנה express כקבוע המכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// הגדרת המשתנה router כקבוע והפעלת הפונקציה Router המצויה תחת המשתנה express שבאמצעותה אנו יכולים לבנות את הנתיבים של השרת
const router = express.Router()
// הגדרת המשתנה models כקבוע וטעינה של כל היכולות המצויות בקבצים שמצויים בתיקיית models באמצעות חיבור התיקייה
const models = require('../models')

router.post('/create', function(req, res) {
    models.User.create({
        username: req.body.username,
    }).then(function() {
        res.redirect('/')
    })
})

router.get('/:user_id/destroy', function(req, res) {
    models.User.destroy({
        where: {
            id: req.params.user_id,
        },
    }).then(function() {
        res.redirect('/')
    })
})

router.post('/:user_id/tasks/create', function(req, res) {
    models.Task.create({
        title: req.body.title,
        UserId: req.params.user_id,
    }).then(function() {
        res.redirect('/')
    })
})

router.get('/:user_id/tasks/:task_id/destroy', function(req, res) {
    models.Task.destroy({
        where: {
            id: req.params.task_id,
        },
    }).then(function() {
        res.redirect('/')
    })
})

// ייצוא היכולות של המודול router החוצה
module.exports = router