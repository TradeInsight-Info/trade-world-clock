"use client";
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { getUserTimeZoneInBrowser } from "@/lib/utils";

const NowTime = ({ timezone }: { timezone?: string }) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  const secondUpdateDuration = 1000;

  // get user timezone
  const browserTimezone = getUserTimeZoneInBrowser();

  const usingTimezone = timezone ? timezone : browserTimezone;

  console.log(usingTimezone);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const theMoment = moment(date);
      const now = theMoment
        .clone()
        .tz(usingTimezone)
        .format("ddd MMM DD YYYY HH:mm:ss");
      setCurrentTime(now);
    }, secondUpdateDuration);
    return () => clearInterval(interval);
  }, [usingTimezone]);

  const dateStrings = currentTime.split(" ");
  const theDate = dateStrings.slice(0, 4).join(" ");
  const theTime = dateStrings.slice(4).join(" ");

  return (
    <>
      <div>
        <p className={"text-2xl my-2"}>{theTime}</p>
        <p>{theDate}</p>
      </div>
    </>
  );
};

export default NowTime;
