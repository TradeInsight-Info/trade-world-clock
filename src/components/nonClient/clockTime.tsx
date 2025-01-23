import moment from "moment-timezone";
import { getUserTimeZoneInBrowser } from "@/lib/utils";
import TwoLines from "./twoLine";

const ClockTime = ({ timezone }: { timezone?: string }) => {
  // get user timezone
  const browserTimezone = getUserTimeZoneInBrowser();

  const usingTimezone = timezone ? timezone : browserTimezone;

  const date = new Date();
  const theMoment = moment(date);
  const now = theMoment.clone().tz(usingTimezone).format("ddd, MMM DD - HH:mm");
  const currentTime = now;
  const dateStrings = currentTime.split("-");
  const theDate = dateStrings.slice(0, 1).join(" ");
  const theTime = dateStrings.slice(1).join(" ");

  return (
    <TwoLines line1={theTime} line2={theDate} />
  );
};

export default ClockTime;
