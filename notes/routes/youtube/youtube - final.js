// קובץ זה מכיל בצורה מרוכזת את כל הבקשות השונות לנתיבים הקשורים ב- REST API ל- YouTube
// המשתנה express מכיל את כל היכולות של המודול באמצעות חיבורו
const express = require('express')
// המשתנה router מפעיל את הפונקציה Router המצויה תחת המשתנה express ושבאמצעותה מתאפשר לשלוח בקשות שונות לבניית הנתיבים
const router = express.Router()
// המשתנה request מכיל את כל היכולות של המודול באמצעות חיבורו
const request = require('request')
// חיבור היכולות של המודול dotenv והפעלה של הפונקציה config
require('dotenv').config()

// ביצוע בקשת get לנתיב של youtube_id, ובכך מתאפשר להביא נתונים של סרטון ה- YouTube בהתאם למזהה הייחודי שלו מה- API של YouTube
router.get('/:youtube_id', function ( req, res ) {
    // המשתנה youtube_id מכיל את המזהה הייחודי של YouTube
    let youtube_id = req.params.youtube_id

    // נבדוק את אורך הנתונים של המשתנה youtube_id ואם הנתונים קטנים מ- 8 תווים או גדולים מ- 14 תווים, אז נבצע מספר פעולות
    if ( youtube_id.length < 8 || youtube_id.length > 14 )
        // שליחה של הודעת שגיאה עם הסטטוס קוד 422 (Unprocessable Entity) האומרת שמסד הנתונים מבין את סוג התוכן של יישות הבקשה, אך לא הצליח לעבד את ההוראות הכלולות בו מאחר ומספר התווים הוא קטן או גדול מכמות התווים האפשרית שהמזהה הייחודי של YouTube יכול להכיל עם פירוט של תשובת json המכילה הודעת שגיאה האומרת שהמזהה הייחודי של YouTube הוא מחוץ לתחום התווים האפשרי (שצריך להיות גדול מ- 8 תווים וקטן מ- 14 תווים)
        res.status(422).json({ error: 'YouTube ID is out of bounds [8-14]' })
    // אחרת, כלומר המזהה הייחודי של YouTube מכיל כמות תווים תקינה בין 8 תווים ל- 14 תווים, אז נבצע מספר פעולות
    else {
        // המשתנה request שולח בקשה לכתובת ה- URL 'https://www.youtube.com/oembed?format=json&url=http://www.youtube.com/watch?v=' + youtube_id המביאה את הנתונים של סרטון ה- YouTube בפורמט json בהתאם למזהה הייחודי של YouTube ומפעיל פונקציית callback (המסומנת כפונקציית חץ) המקבלת את המשתנה error המכיל את השגיאה שקיבלנו, את המשתנה response המכיל את התשובה שקיבלנו ואת המשתנה body המכיל את הגוף של התשובה שקיבלנו ומבצעת מספר פעולות
        request('https://www.youtube.com/oembed?format=json&url=http://www.youtube.com/watch?v=' + youtube_id, ( error, response, body ) => {
            // נבדוק אם קיבלנו תשובה המכילה הודעה עם הסטטוס קוד 200 (OK), זאת אומרת שהמזהה הייחודי של YouTube קיים, אז נבצע מספר פעולות
            if ( response.statusCode === 200 ) {
                // המשתנה video מכיל אובייקט ריק
                let video = {}
                // המשתנה data מבצע JSON.parse לנתונים המצויים במשתנה body
                let data = JSON.parse( body )

                // הפרופרטי title מכניס לתוך האובייקט המצוי במשתנה video את הפרופרטי title המצוי במשתנה data (המבצע JSON.parse לנתונים המצויים במשתנה body), ולמעשה הפרופרטי title מכיל את שם השיר המצוי בכותרת
                video.title = data.title

                // המשתנה request שולח בקשה לכתובת ה- URL ' https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${youtube_id}&key=${process.env.YOUTUBE_API_KEY}' המביאה את הנתונים של סרטון ה- YouTube בפורמט json בהתאם למזהה הייחודי של YouTube ולמפתח המוגדר במשתנה process.env.YOUTUBE_API_KEY המכיל את המפתח הייחודי ל- API של YouTube, ומפעיל פונקציית callback (המסומנת כפונקציית חץ) המקבלת את המשתנה error המכיל את השגיאה שקיבלנו, את המשתנה response המכיל את התשובה שקיבלנו ואת המשתנה body המכיל את הגוף של התשובה שקיבלנו ומבצעת מספר פעולות
                request(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${youtube_id}&key=${process.env.YOUTUBE_API_KEY}`, ( error, response, body ) => {
                    // המשתנה data מבצע JSON.parse לנתונים המצויים במשתנה body
                    data = JSON.parse( body )

                    // המשתנה minutes מבצע parseInt לנתונים המצויים לאחר האות M בתשובה שקיבלנו ומכפיל אותם ב- 60, ולמעשה המשתנה minutes מכיל את הדקות של השיר מאחר והכפלנו אותן ב- 60 הדקות של השיר נהיו שניות
                    let minutes = parseInt(/\d+(?=M)/.exec(data.items[0].contentDetails.duration)[0]) * 60
                    // המשתנה seconds מבצע parseInt לנתונים המצויים לאחר האות S בתשובה שקיבלנו, ולמעשה המשתנה seconds מכיל את מספר השניות של השיר
                    let seconds = parseInt(/\d+(?=S)/.exec(data.items[0].contentDetails.duration)[0])

                    // הפרופרטי duration מכניס לתוך האובייקט המצוי במשתנה video את המשתנה minutes המכיל את הדקות של השיר כמספר השניות ואת המשתנה seconds המכיל את מספר השניות של השיר, ולמעשה הפרופרטי duration מכיל סטרינג של משך זמן השיר
                    video.duration = minutes + seconds

                    // שליחה של תשובת json המכילה את כל הנתונים המצויים באובייקט המצוי במשתנה video
                    res.json( video )
                })
            // אחרת, כלומר המזהה הייחודי של YouTube לא קיים או לא תקין, אז נבצע מספר פעולות
            } else
                // שליחה של הודעת שגיאה עם הסטטוס קוד 404 (Not Found) האומרת שהנתונים המבוקשים לא נמצאים מאחר והמזהה הייחודי של YouTube לא קיים או לא תקין עם פירוט של תשובת json המכילה הודעת שגיאה מתאימה
                res.status(404).json({ error: 'YouTube ID is incorrect' })
        })
    }
})

// ייצוא היכולות של המודול router החוצה
module.exports = router