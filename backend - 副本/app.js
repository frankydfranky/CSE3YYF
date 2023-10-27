require("dotenv").config();
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


const userRouter = require('./router/user')
const patientRouter = require('./router/patient')
const clinicalstudiesRouter = require('./router/clinicalstudies')
const trialorganizationRouter = require('./router/trialorganization')
const managestudiesRouter = require('./router/managestudies')
const observationsRouter = require('./router/observations')
const treatmentRouter = require('./router/treatment')
const answerRouter = require('./router/answer')

app.use('/user', userRouter)
app.use('/patient', patientRouter)
app.use('/clinicalstudies', clinicalstudiesRouter)
app.use('/trialorganization', trialorganizationRouter)
app.use('/managestudies', managestudiesRouter)
app.use('/observations', observationsRouter)
app.use('/treatment', treatmentRouter)
app.use('/answer', answerRouter)


//port
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});



