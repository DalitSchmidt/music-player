// קובץ זה מכיל בצורה מרכוזת את כל הבקשות השונות לנתיבים הקשורים ב- REST API ל- youtube
// חיבור היכולות של המודול dotenv והפעלת הפונקציה config
require('dotenv').config()
// המשתנה express מכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// המשתנה router מפעיל את הפונקציה Router המצויה תחת המשתנה express (המכיל את כל היכולות של המודול express) ושבאמצעותה אנו יכולים לשלוח בקשות שונות לבניית הנתיבים
const router = express.Router()
// המשתנה request מכיל את כל היכולות של המודול באמצעות חיבורו
const request = require('request')
// המשתנה YOUTUBE_API_KEY מכיל את משתנה הסביבה בשם YOUTUBE_API_KEY המוגדר בקובץ env
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

// ביצוע בקשת get לנתיב של youtube_id, ובכך למעשה אנו מביאים נתונים של הסרטון youtube בהתאם למזהה הייחודי שלו
router.get('/:youtube_id', function ( req, res ) {
    // /** @namespace req.params.youtube_id */
    // המשתנה youtube_id מכיל את המזהה הייחודי של youtube
    let youtube_id = req.params.youtube_id

    // אם אורך התווים של המשתנה youtube_id המכיל את המזהה הייחודי של youtube הוא קטן מ- 8 תווים או גדול מ- 14 תווים, נקבל הודעת שגיאה המכילה את הסטטוס קוד 422 (Unprocessable Entity) האומרת שהשרת מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ומספר התווים הוא קטן או גדול מכמות התווים האפשרית שמזהה ה- YouTube יכול להיות, לכן נשלח json המכיל הודעת שגיאה האומרת שקוד ה- YouTube הוא מחוץ לתחום התווים (שצריך להיות גדול מ- 8 תווים וקטן מ- 14 תווים)
    if ( youtube_id.length < 8 || youtube_id.length > 14 )
        res.status(422).json({ error: 'Youtube code is out of bounds [8-14]' })

    // אחרת, כלומר קוד ה- Youtube מכיל כמות תווים תקינה (בין 8 תווים ל- 14 תווים), המשתנה request שולת בקשה לכתובת ה- URL 'https://www.youtube.com/oembed?format=json&url=http://www.youtube.com/watch?v=' + youtube_id שמביאה את הנתונים של הסרטון בפורמט json בהתאם למזהה הייחודי של youtube ומפעיל פונקציית callback המקבלת את המשתנים error, response ו- body
    else {
        request('https://www.youtube.com/oembed?format=json&url=http://www.youtube.com/watch?v=' + youtube_id, function ( error, response, body ) {
            // אם קיבלנו תשובה עם הסטטוס קוד שמספרו 200 (OK), כלומר המזהה הייחודי של YouTube קיים
            if ( response.statusCode === 200 ) {
                // המשתנה video מכיל אובייקט ריק
                let video = {}
                // המשתנה data מבצע JSON.parse לנתונים שמצויים במשתנה body
                let data = JSON.parse( body )
                // הפרופרטי title מכניס לתוך האובייקט שמצוי במשתנה video את הפרופרטי title שמצוי במשתנה data (המבצע JSON.parse לנתונים שמצויים במשתנה body), כך שלמעשה הוא מכיל את שם השיר המצוי בכותרת
                video.title = data.title

                    // המשתנה request שולח בקשה לכתובת ה- URL 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${youtube_id}&key=${YOUTUBE_API_KEY}' שמביאה את הנתונים של השיר בפורמט json בהתאם למזהה הייחודי של youtube ולמפתח שמוגדר במשתנה YOUTUBE_API_KEY, ומפעיל פונקציית callback המקבלת את המשתנים error, response ו- body
                    request(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${youtube_id}&key=${YOUTUBE_API_KEY}`, function ( error, response, body ) {
                    // המשתנה data מבצע JSON.parse לנתונים שמצויים במשתנה body
                    data = JSON.parse( body )
                    // video.duration = data.items[0].contentDetails.duration.split('PT')[1]
                    //  video.duration = /(?<=PT)(.*)(?=M)/.exec(data.items[0].contentDetails.duration)

                    // המשתנה minutes מבצע parseInt לנתונים המצויים לאחר האות M בתשובה שקיבלנו ומכפיל אותם ב- 60, כך שלמעשה הוא מכיל את הדקות של השיר ומאחר ושהכפלנו אותן ב- 60, הדקות של השיר נהיו שניות
                    let minutes =  parseInt(/\d+(?=M)/.exec( data.items[0].contentDetails.duration)[0] ) * 60
                    // המשתנה seconds מבצע parseInt לנתונים המצויים לאחר האות S בתשובה שקיבלנו, כך שלמעשה הוא מכיל את מספר השניות של השיר
                    let seconds = parseInt(/\d+(?=S)/.exec( data.items[0].contentDetails.duration)[0] )

                    // הפרופרטי duration מכניס לתוך האובייקט שמצוי במשתנה video את המשתנים minutes (המכיל את הדקות של השיר כמספר השניות) ו- seconds (המכיל את מספר השניות של השיר), וכך למעשה הפרופרטי duration מכיל סטרינג של משך הזמן של השיר
                    video.duration = minutes + seconds
                        // שליחת תשובת json המכילה את כל הנתונים שמצויים באובייקט המצוי במשתנה video
                        res.json( video )
                })
            } else
                // אחרת, כלומר המזהה הייחודי של YouTube לא קיים/תקין, נקבל הודעה עם הסטטוס קוד שמספרו 404 (Not Found) ונשלח תשובת json עם הודעת השגיאה 'Youtube code is incorrect'
                res.status(404).json({ error: 'Youtube code is incorrect' })
        })
    }
})

// ייצוא היכולות של המודול router החוצה
module.exports = router