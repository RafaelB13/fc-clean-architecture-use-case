import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 55,
    });
    expect(response.status).toBe(200);

    const response2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 56,
    });
    expect(response.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.products.length).toBe(2)

    const product1 = listResponse.body.products[0]
    expect(product1.name).toBe("Product 1")
    expect(product1.price).toBe(55)

    const product2 = listResponse.body.products[1]
    expect(product2.name).toBe("Product 2")
    expect(product2.price).toBe(56)

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200)
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(listResponseXML.text).toContain("<name>Product 1</name>")
    expect(listResponseXML.text).toContain("<price>55</price>")
    expect(listResponseXML.text).toContain("<name>Product 2</name>")
    expect(listResponseXML.text).toContain("<price>56</price>")
    expect(listResponseXML.text).toContain("<products>")
    expect(listResponseXML.text).toContain("</products>")



  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 55,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(55);
  });
});
