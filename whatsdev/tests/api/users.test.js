const { setup, teardown } = require("../config");
const request = require("supertest");
const app = require("../../app");

describe("API test => Users", () => {
    let server;

    beforeAll(async() => {
        server = await setup();
    });

    afterAll(async() => {
        await teardown(server);
    });

    it("login - fails with invalid data", async() => {
        const data = { email: "fakeEMail", password: "pass" };
        const { status, body } = await request(app)
            .post("/api/users/login")
            .send(data);
        expect(status).toBe(400);
        expect(body.email).toMatch("Must be a valid email");
    });

    it("login - fails with no such user with given email", async() => {
        const data = { email: "email@email.com", password: "password" };
        const { status, body } = await request(app)
            .post("/api/users/login")
            .send(data);
        expect(status).toBe(404);
        expect(body.email).toMatch("User not found");
    });

    it("Register - Creating a new valid user", async() => {
        const data = {
            name: "Senyo",
            email: "brightakakpo40@gmail.com",
            password: "bright123",
            password2: "bright123",
        };
        const { status, body } = await request(app)
            .post("/api/users/register")
            .send(data);
        expect(status).toBe(200);
    });

    it("login - Passes with a valid user", async() => {
        const data = { email: "brightakakpo40@gmail.com", password: "bright123" };
        const { status, body } = await request(app)
            .post("/api/users/login")
            .send(data);
        expect(status).toBe(200);
    });
});