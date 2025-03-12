import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { createBlogInput, CreateBlogInput, updateBlogInput } from "@yashprojects/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: any
  }
}>();

blogRouter.use("/*", async (c, next) => {

    try {
        
        const authHeader = c.req.header("Authorization") || ""
        const token = authHeader.split(' ')[1]
        const user = await verify(token, c.env.JWT_SECRET);
        const id = user.id
        if(user){
            c.set("userId", user.id)
            await next()
        }else{
            c.status(403)
            return c.text("Unauthorized Access")
        }
    } catch (error) {
        return c.text("Unauthorized access")
    }
});

blogRouter.get("/bulk", async  (c) => {
    const prisma = new PrismaClient(
        {
          datasourceUrl: c.env.DATABASE_URL
        }
      ).$extends(withAccelerate())


      const posts = await prisma.post.findMany({

      })

  return c.json({posts});
});

blogRouter.get("/:id",async (c) => {
    const body = await c.req.json();
    const id =   c.req.param("id")
    const prisma = new PrismaClient(
        {
          datasourceUrl: c.env.DATABASE_URL
        }
      ).$extends(withAccelerate())

  
      const post = await prisma.post.findFirst({
        where:{
            id: id
        }
      })

  return c.json({
    post
  });
});

blogRouter.post("/",async  (c) => {
    const body = await c.req.json();

    const {success} = createBlogInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        message: "invalid inputs"
      })
    }
    const userId = c.get('userId')
    const prisma = new PrismaClient(
        {
          datasourceUrl: c.env.DATABASE_URL
        }
      ).$extends(withAccelerate())
  
      const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            author_id: userId
        }
      })

  return c.json({
    id: post.id
  });
});

blogRouter.put("/",async (c) => {
  const body = await c.req.json();

  const {success} = updateBlogInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({
      message: "invalid inputs"
    })
  }
    const prisma = new PrismaClient(
        {
          datasourceUrl: c.env.DATABASE_URL
        }
      ).$extends(withAccelerate())
  
      const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
      })

  return c.json({
    id: post.id
  });
});
