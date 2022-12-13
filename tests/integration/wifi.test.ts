import app, { init } from "@/app"
import faker from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import { createWifi } from "../factories/wifiFactory";

beforeAll(async () => {
  await init();
  await cleanDb();
})

const server = supertest(app);

describe("POST /wifi", () => {
  it("should respond with status 422 if no token is given", async () => {
    const response = await server.post("/wifi");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/wifi").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const token = await generateValidToken()
      const response = await server.post("/wifi").set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const token = await generateValidToken()

      const response = await server.post("/wifi").set("authorization", `Bearer ${token}`).send(invalidBody);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body is valid", () => {
      const generateValidBody = () => ({
        title: faker.internet.domainWord(),
        network: faker.internet.domainName(),
        password: faker.internet.password(),
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

describe("GET /wifi", () => {
  it("should respond with status 422 if no token is given", async () => {
    const response = await server.post("/wifi");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/wifi").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when token is valid", () => {

    it("should respond with status 404 when user give inexistent id", async () => {
      const token = await generateValidToken()

      const response = await server.get("/wifi?id=0").set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 403 when user id is not the same as the wifi id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();
      const wifi = await createWifi(otherUser.id)

      const response = await server.get(`/wifi?id=${wifi.id}`).set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it("should return with status 200", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const wifi = await createWifi(user.id)

      const response = await server.get(`/wifi?id=${wifi.id}`).set("authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK)
    });
  })
})

describe("DELETE /wifi", () => {
  it("should respond with status 422 if no token is given", async () => {
    const response = await server.delete("/wifi");

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should respond with status 422 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.delete("/wifi").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  describe("when token is valid", () => {

    it("should respond with status 404 when user give inexistent id", async () => {
      const token = await generateValidToken()

      const response = await server.delete("/wifi?id=0").set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 403 when user id is not the same as the wifi id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const otherUser = await createUser();
      const wifi = await createWifi(otherUser.id)

      const response = await server.delete(`/wifi?id=${wifi.id}`).set("authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it("should return with status 200", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const wifi = await createWifi(user.id)

      const response = await server.delete(`/wifi?id=${wifi.id}`).set("authorization", `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK)
    });
  })
})