// קובץ ה- index מכיל בצורה מרוכזת את כל הבקשות הכלליות הקשורות לנתיבים ב- API
// הגדרת המשתנה express כקבוע המכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// הגדרת המשתנה router כקבוע והפעלת הפונקציה Router המצויה תחת המשתנה express שבאמצעותה אנו יכולים לבנות את הנתיבים של השרת
const router  = express.Router()
// הגדרת המשתנה models כקבוע וטעינה של כל היכולות המצויות בקבצים שמצויים בתיקיית models באמצעות חיבור התיקייה
const models  = require('../models')

// ביצוע בקשת get המאפשרת למצוא את כל היוזרים
router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users
    })
  })
})

// ייצוא היכולות של המודול router החוצה
module.exports = router