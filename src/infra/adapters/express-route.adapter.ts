import { ControllerInterface } from '@/application/contracts/controller.interface'
import { HttpRequest, HttpResponse } from '@/shared/types'
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: ControllerInterface) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      body: req.body
    }
    const output: HttpResponse = await controller.execute(input)

    const bodyOutput = output.statusCode === 500 ? { error: output.body.message } : output.body

    res.status(output.statusCode).json(bodyOutput)
  }
}
