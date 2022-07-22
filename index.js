import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { credentials } from "./credentials.js"

initializeApp({
  credential: cert(credentials)
})

const db = getFirestore()

// db.collection('cars')
//   .add({ make: 'Ferrari', model: 'GTO', year: 2008, color: 'red' })
//   .then(doc => {
//     console.log('Doc added:', doc.id)
//   })
//   .catch(err => console.error(err))

// db.collection('cars').doc('lambo')
//   .set({ make: 'Lamborghini', year: 2021, color: 'red' })

// db.collection('cars').doc('lambo')
//   .update({ model: 'Diablo', color: 'hot pink' })

// Get a single document:
db.collection('cars').doc('lambo').get()
  .then(doc => {
    console.log(doc.id)
    console.log(doc.data())
  })
  .catch(console.error)

// Get a whole collection:
db.collection('cars').get()
  .then(collection => {
    collection.docs.forEach(doc => console.log(doc.id, doc.data()))
  })
  .catch(console.error)

// Query docs from collection:
db.collection('cars')
  .where('year', '>=', 2015)
  .get()
    .then(collection => {
      const cars = collection.docs.map(doc => {
        let car = doc.data() // { make, model, color, year }
        car.id = doc.id // { make, model, color, year, id }
        return car
        //   return { ...doc.data(), id: doc.id }
      })
      console.log(cars)
    })
    .catch(console.error)