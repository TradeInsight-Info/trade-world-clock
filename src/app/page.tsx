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


export default function Home() {
  const stockMarkets = getStockMarkets();

  stockMarkets.forEach((stock) => {
    const tz = stock.timezone;
    
   
  
    const date = new Date();
    const theMoment = moment(date);
    const now = theMoment.clone().tz(tz)
    console.log(now)
    // get hour and minute
    const hour = now.format("HH");
    const minute = now.format("mm");
    console.log(hour, minute)
    
    stock.now = now;

    // console.log(stock.startTime, stock.name)

    const openHour = parseInt(stock.startTime.split(":")[0])
    const openMinute =parseInt( stock.startTime.split(":")[1])
    const closeHour = parseInt(stock.endTime.split(":")[0])
    const closeMinute = parseInt(stock.endTime.split(":")[1])

    const startTime = now.clone().hour(openHour).minute(openMinute)
    const endTime = now.clone().hour(closeHour).minute(closeMinute)

    
    // in open and close time range and in work days
    stock.open = startTime < now && now < endTime  && now.day() >= 1 && now.day() <= 5
    
    stock.now = now



  })

  const openedMarkets = stockMarkets.filter((stock) => stock.open).sort((a, b) => a.now - b.now)
  const closedMarkets = stockMarkets.filter((stock) => !stock.open).sort((a, b) => a.now - b.now)


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Table>
          <TableCaption>
            A list of stock, option and future markets.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>City, Country</TableHead>
              <TableHead className="text-right">Local Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {openedMarkets.map((stock, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <span className="font-bold">{stock.shortName}</span>
                    <br />
                    {stock.name} {stock.open ? "Open" : "Closed"}
                  </TableCell>
                  <TableCell>{stock.type}</TableCell>
                  <TableCell>
                    {stock.city}
                  </TableCell>
                  {/* <TableCell className="">{stock.timezone}</TableCell> */}
                  <TableCell className="text-right">
                    <ClockTime timezone={stock.timezone} />
                  </TableCell>
                 
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
