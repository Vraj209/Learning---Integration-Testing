import express, { request } from "express";
import { prismaclient } from "./db";
import { z } from "zod";

export const app = express();
app.use(express.json());
const input = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", async (req: any, res: any) => {
  const parsedInput = input.safeParse(req.body);

  if (!parsedInput.success) {
    return res.status(411).json({
      message: "Invaliad Input",
    });
  }

  const answer = parsedInput.data?.a + parsedInput.data?.b;

  const request = await prismaclient.request.create({
    data: {
      a: parsedInput.data?.a,
      b: parsedInput.data?.b,
      answer,
      type: "ADD",
    },
  });

  res.json({
    answer,
    id: request.id,
  });
});

app.post("/mul", async (req: any, res: any) => {
  const parsedInput = input.safeParse(req.body);

  if (!parsedInput.success) {
    return res.status(411).json({
      message: "Invaliad Input",
    });
  }

  const answer = parsedInput.data?.a * parsedInput.data?.b;

  await prismaclient.request.create({
    data: {
      a: parsedInput.data?.a,
      b: parsedInput.data?.b,
      answer,
      type: "MUL",
    },
  });

  res.json({
    answer,
  });
});
