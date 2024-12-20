import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../index";
import { resetDB } from "./helpers/reset-db";

describe("POST /sum", () => {
    
//   beforeEach(async () => {
//     console.log("Clearing DB");
//     await resetDB();
//   });

  beforeAll(async () => {
    console.log("Clearing DB");
    await resetDB();
  });
  
  it("should sum two number", async () => {
    const { body, status } = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(status).toBe(200);
    expect(body).toEqual({
      answer: 3,
      id: expect.any(Number),
    });
  });
});
