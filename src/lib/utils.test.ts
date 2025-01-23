
import { getStockMarkets } from "./utils";


describe("getStockMarkets", () => {
  test("should return stock markets", async () => {
    const stockMarkets = await getStockMarkets();
    expect(stockMarkets.length).toEqual(30);
  });
});
