import { Hono } from "hono";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import {signinInput, signupInput} from '@yashprojects/medium-common'



export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>();


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient(
      {
        datasourceUrl: c.env.DATABASE_URL
      }
    ).$extends(withAccelerate())
  
    const body = await c.req.json()
    const {success} = signupInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        message: "invalid inputs"
      })
    }
    
    try{
      const res = await prisma.user.create({
        data : {
          email: body.email,
          password: body.password
        }
      })
    
      const token = await sign({
        id: res.id
      }, c.env.JWT_SECRET)
      
      return c.json({
        token: token
      })
    }
    catch(err){
      return c.text("something went wrong")
    }
  
  })
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient(
      {
        datasourceUrl: c.env.DATABASE_URL
      }
    ).$extends(withAccelerate())
  
    const body = await c.req.json()

    const {success} = signinInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        message: "invalid inputs"
      })
    }
    // console.log(body);
    
    // try{
      const res = await prisma.user.findUnique({
        where:{
          email: body.email,
          password: body.password
        }
      })
  
      if(!res){
        c.status(403)
        return c.text("user not found")
      }
  
      // console.log("response::",res);
      
      const payload = {
        id: res?.id
      }
      const secret = c.env.JWT_SECRET
      const token = await sign(payload, secret)
      
      return c.json({
        token: token
      })
    // }
    // catch(err){
    //   c.status(404)
    //   return c.text("something went wrong")
    // }
  
  })