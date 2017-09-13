// קובץ ה- albums מכיל בצורה מרוכזת את כל הבקשות השונות לנתיבים הקשורים ב- API ל- albums
// הגדרת המשתנה express כקבוע המכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// הגדרת המשתנה router כקבוע והפעלת הפונקציה Router המצויה תחת המשתנה express שבאמצעותה אנו יכולים לבנות את הנתיבים של השרת
const router = express.Router()
// הגדרת המשתנה models כקבוע וטעינה של כל היכולות המצויות בקבצים שמצויים בתיקיית models באמצעות חיבור התיקייה
const models = require('../models')

// ביצוע בקשת get המביאה את כל האלבומים, ובכך למעשה אנו מביאים את כל הנתונים הקיימים הקשורים לאלבומים
router.get('/', function(req, res) {
    // המשתנה albums מכיל מערך של אובייקטים המכילים את הנתונים של האלבומים
    let albums = [
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Coldplay_-_A_Head_Full_of_Dreams.png'
        },
        {
            id: 124,
            name: 'AM',
            artist: 'Arctic Monkeys',
            img: 'https://upload.wikimedia.org/wikipedia/he/0/04/Arctic_Monkeys_-_AM.png'
        },
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Coldplay_-_A_Head_Full_of_Dreams.png'
        },
        {
            id: 124,
            name: 'AM',
            artist: 'Arctic Monkeys',
            img: 'https://upload.wikimedia.org/wikipedia/he/0/04/Arctic_Monkeys_-_AM.png'
        }
    ]

    // שליחת תשובה של json עם כל הנתונים הקיימים של האלבומים
    res.json(albums)
})

// ביצוע בקשת get לפי המספר id של האלבום, ובכך למעשה אנו מביאים נתונים של אלבום ספציפי לפי המספר id שלו
router.get('/:album_id', function(req, res) {
    // המשתנה album_id מכיל את המספר id של האלבום
    let album_id = req.params.album_id

})

// ביצוע בקשת post המאפשרת ליצור אלבום חדש
router.post('/', function(req, res) {
    // המשתנה album מכיל את הגוף של הבקשה
    let album = req.body
})

// ביצוע בקשת get לנתיב של החיפוש, ובכך למעשה אנו מביאים את כל הנתונים שהתקבלו בעת ביצוע החיפוש
router.get('/search/:term', function(req, res) {
    // המשתנה term מכיל את הנתונים שהוזנו ושלגביהם מתבצע החיפוש
    let term = req.params.term
    // המשתנה Album מכיל את המשתנה Album שמצוי תחת models, ובכך למעשה הוא מכיל את המודל של האלבום
    let Album = models.Album

    // המשתנה albums מכיל מערך של אובייקטים המכילים את הנתונים של החיפוש
    let albums = [
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Coldplay_-_A_Head_Full_of_Dreams.png'
        },
        {
            id: 124,
            name: 'AM',
            artist: 'Arctic Monkeys',
            img: 'https://upload.wikimedia.org/wikipedia/he/0/04/Arctic_Monkeys_-_AM.png'
        },
        {
            id: 123,
            name: 'Head full of dreams',
            artist: 'Coldplay',
            img: 'https://upload.wikimedia.org/wikipedia/en/3/3d/Coldplay_-_A_Head_Full_of_Dreams.png'
        },
        {
            id: 124,
            name: 'AM',
            artist: 'Arctic Monkeys',
            img: 'https://upload.wikimedia.org/wikipedia/he/0/04/Arctic_Monkeys_-_AM.png'
        }
    ]
    // שליחת תשובה של json עם כל הנתונים שהתקבלו בעת ביצוע החיפוש
    res.json(albums)
})

// ייצוא היכולות של המודול router החוצה
module.exports = router