const exprees=require('express')
const { Personal, updatePersonal ,getUser} = require('../controllers/info')

const infoRouter=exprees.Router()

infoRouter.post('/personal',Personal)
infoRouter.get('/:id',getUser)
infoRouter.put('/personal/:id',updatePersonal)

module.exports =infoRouter