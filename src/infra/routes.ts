import { Router } from 'express'
import { expressRouteAdapter } from './adapters/express-route.adapter'
import { makeSaveLeadControllerFactory } from './factories/controllers/save-lead.factory'

const router = Router()

router.post('/lead', expressRouteAdapter(makeSaveLeadControllerFactory()))

export { router }
