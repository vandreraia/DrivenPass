import app, { init } from "@/app"
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import { createCredential } from "../factories/credentialFactory";

beforeAll(async () => {
  await init();
  await cleanDb();
})

const server = supertest(app);

describe("POST /credential", () => {
  it("should respond with status 422 if no token is given", async () => {
    const response = await server.post("/credential");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/credential").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const token = await generateValidToken()
      const response = await server.post("/credential").set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const token = await generateValidToken()

      const response = await server.post("/credential").set("authorization", `Bearer ${token}`).send(invalidBody);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body is valid", () => {
      const generateValidBody = () => ({
        title: faker.lorem.word(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.password()
      });

      it("should respond with status 409 if user already has a credential with the same title", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const credential = await createCredential(user.id)

        const response = await server.post("/credential").set("authorization", `Bearer ${token}`).send(credential);

        expect(response.status).toBe(httpStatus.CONFLICT);
      });

      it("should return with status 201", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = generateValidBody();

        const response = await server.post("/credential").set("authorization", `Bearer ${token}`).send(body);

        expect(response.status).toEqual(httpStatus.CREATED)
      });
    })
  })
})

describe("GET /credential", () => {
  it("should respond with status 422 if no token is given", async () => {
    const response = await server.get("/credential");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/credential").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when token is valid", () => {

    it("should respond with status 404 when user give inexistent id", async () => {
      const token = await generateValidToken()

      const response = await server.get("/credential?id=0").set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 403 when user id is not the same as the credential id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();
      const credential = await createCredential(otherUser.id)

      const response = await server.get(`/credential?id=${credential.id}`).set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it("should return with status 200 and the credential with corresponding id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user.id)

      const response = await server.get(`/credential?id=${credential.id}`).set("authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK)
    });

    it("should return with status 200 and credentials", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user.id)

      const response = await server.get(`/credential`).set("authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK)
    });
  })
})

describe("DELETE /credential", () => {
  it("should respond with status 422 if no token is given", async () => {
    const response = await server.delete("/credential");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.delete("/credential").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when token is valid", () => {

    it("should respond with status 404 when user give inexistent id", async () => {
      const token = await generateValidToken()

      const response = await server.delete("/credential?id=0").set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 403 when user id is not the same as the credential id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();
      const credential = await createCredential(otherUser.id)

      const response = await server.delete(`/credential?id=${credential.id}`).set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it("should return with status 200", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user.id)

      const response = await server.delete(`/credential?id=${credential.id}`).set("authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK)
    });
  })
})