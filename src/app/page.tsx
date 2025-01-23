import ClockTime from "@/components/nonClient/clockTime";
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

export default function Home() {
  const stockMarkets = getStockMarkets();

  stockMarkets.forEach((stock, index) => {
    const tz = stock.timezone;

    const date = new Date();
    const theMoment = moment(date);
    const now = theMoment.clone().tz(tz);
    console.log(now);
    // get hour and minute
    const hour = now.format("HH");
    const minute = now.format("mm");
    console.log(hour, minute);

    stock.now = now;

    // console.log(stock.startTime, stock.name)

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
        <p className="text-center pb-6 max-w-2xl">
            <strong>Trade World Clock </strong>
             is a list of well known stock, option and future markets with their local time, 
            this tool is used to easily check the market open and close time in different timezones.
        </p>
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
                      <div className="flex flex-row flex items-center justify-center gap-4">
                        <ClockTime timezone={stockMarket.timezone} />
                        <div>
                          {stockMarket.open ? <GreenDot /> : <RedDot />}
                        </div>
                      </div>
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
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          from TradeInsight.info
        </a>
      </footer>
    </div>
  );
}
