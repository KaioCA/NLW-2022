import { NodemailerMailAdapter } from './adaptors/nodemailer/nodemailer-mail-adapter';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import express from 'express';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot} = req.body;
 
   const prismaFeedbackRepository = new PrismaFeedbackRepository() 
   const nodemailerMailAdapter = new NodemailerMailAdapter()

   const submitFedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
   )  

   await submitFedbackUseCase.execute({
       type,
       comment,
       screenshot
   })
 
     return res.status(201).send();
 })