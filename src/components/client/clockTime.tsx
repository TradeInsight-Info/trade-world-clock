"use client";
import moment, { Moment } from "moment-timezone";
import { getUserTimeZoneInBrowser, IStockMarket } from "@/lib/utils";
import TwoLines from "../nonClient/twoLine";
import { useEffect, useState } from "react";
import GreenDot from "../nonClient/greenDot";
import RedDot from "../nonClient/redDot";

/**
 * Check if stock market is open 
 * todo consider holiday and break time
 * @param startTime 
 * @param endTime 
 * @param timezone 
 * @param theMoment 
 * @returns 
 */
const checkStockMarketOpen = (
  startTime: string,
  endTime: string,
  timezone: string,
  theMoment: Moment
): boolean => {
  const now = theMoment.clone().tz(timezone);

  const openHour = parseInt(startTime.split(":")[0]);
  const openMinute = parseInt(startTime.split(":")[1]);
  const closeHour = parseInt(endTime.split(":")[0]);
  const closeMinute = parseInt(endTime.split(":")[1]);

  const startDateTime = now.clone().hour(openHour).minute(openMinute);
  const endDateTime = now.clone().hour(closeHour).minute(closeMinute);

  // in open and close time range and in work days
  return startDateTime < now && now < endDateTime && now.day() >= 1 && now.day() <= 5;
};

const ClockTime = ({
  timezone,
  startTime,
  endTime,
}: {
  timezone: string;
  startTime: string;
  endTime: string;
}) => {
  const [currentMoment, setCurrentMoment] = useState<Moment | null>(null);

  const updateDurationInMS = 1000;

  // get user timezone
  const browserTimezone = getUserTimeZoneInBrowser();

  const usingTimezone = timezone ? timezone : browserTimezone;
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const theMoment = moment(date);
      const now = theMoment.clone().tz(usingTimezone);

      setCurrentMoment(now);
    }, updateDurationInMS);
    return () => clearInterval(interval);
  }, [usingTimezone]);

  if (!currentMoment) {
    return <div className="flex flex-row flex items-center justify-center gap-4">Loading...</div>;
  } else {
    const dateStrings = currentMoment
      ?.format("ddd MMM DD-HH:mm")
      .split("-");
    const theDate = dateStrings?.slice(0, 1).join(" ");
    const theTime = dateStrings?.slice(1).join(" ");

    const isOpen = checkStockMarketOpen(startTime, endTime, timezone, currentMoment);
    return (
      <div className="flex flex-row flex items-center justify-center gap-4">
        <TwoLines line1={theTime} line2={theDate} />
        <div>{isOpen ? <GreenDot /> : <RedDot />}</div>
      </div>
    );
  }
};

export default ClockTime;
