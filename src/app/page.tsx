import ClockTime from "@/components/client/clockTime";
import Image from "next/image";
import { getStockMarkets } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment-timezone";
import NowTime from "@/components/client/nowtime";
import GreenDot from "@/components/nonClient/greenDot";
import RedDot from "@/components/nonClient/redDot";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const stockMarkets = getStockMarkets();

  // Server Action
  async function getDate() {
    "use server";
    // Mutate data
    const date = new Date();
    return date;
  }

  const date = await getDate();

  stockMarkets.forEach((stock) => {
    const tz = stock.timezone;
    const theMoment = moment(date);
    const now = theMoment.clone().tz(tz);

    const openHour = parseInt(stock.startTime.split(":")[0]);
    const openMinute = parseInt(stock.startTime.split(":")[1]);
    const closeHour = parseInt(stock.endTime.split(":")[0]);
    const closeMinute = parseInt(stock.endTime.split(":")[1]);

    const startTime = now.clone().hour(openHour).minute(openMinute);
    const endTime = now.clone().hour(closeHour).minute(closeMinute);

    // in open and close time range and in work days
    stock.open =
      startTime < now && now < endTime && now.day() >= 1 && now.day() <= 5;
    stock.now = now;
  });

  const sortableStockMarkets = stockMarkets;

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col">
        <div className="justify-center max-w-2xl pb-6">
          <div className="w-xl mx-auto text-center">
            <strong>Trade World Clock </strong>
            is a list of well known stock, option and future markets with their
            local time, this tool is used to easily check the market open and
            close time in different timezones.
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>
              A list of stock, option and future markets.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead className="">Open Hours</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-center">Local Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortableStockMarkets.map((stockMarket, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <span className="font-bold">{stockMarket.shortName}</span>
                      <br />
                      <span className="text-xs font-light">
                        {stockMarket.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="">{stockMarket.startTime}</span> -
                      <span className="">{stockMarket.endTime}</span>
                    </TableCell>
                    <TableCell>
                      {stockMarket.type.split(",").map((type, index) => {
                        return (
                          <Badge key={index} className="mr-1">
                            {type}
                          </Badge>
                        );
                      })}
                    </TableCell>
                    <TableCell>{stockMarket.city}</TableCell>
                    {/* <TableCell className="">{stock.timezone}</TableCell> */}
                    <TableCell className="text-right">
                      <ClockTime
                        timezone={stockMarket.timezone}
                        startTime={stockMarket.startTime}
                        endTime={stockMarket.endTime}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div className="w-full">
          <div className="w-1/3 mx-auto my-4 text-center">
            <NowTime />
            <p className="text-sm pt-2 italic align-middle ">
              Your Time <GreenDot />
            </p>
          </div>
        </div>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://tradeinsight.info"
          target="_blank"
          rel="noopener"
        >
          <Image
            aria-hidden
            src="/favicon.ico"
            alt="Globe icon"
            width={16}
            height={16}
          />
          from TradeInsight.info
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/TradeInsight-Info/trade-world-clock"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Codes on Github
        </a>
      </footer>
    </div>
  );
}
