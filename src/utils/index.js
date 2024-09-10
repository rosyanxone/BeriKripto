import { ethers } from "ethers";
import TimeAgo from "javascript-time-ago";
import id from "javascript-time-ago/locale/id";

const customLabels = {
  second: {
    past: {
      other: "{0} detik lalu",
    },
    future: {
      other: "{0} detik lagi",
    },
  },
  minute: {
    past: {
      other: "{0} menit lalu",
    },
    future: {
      other: "{0} menit lagi",
    },
  },
  hour: {
    past: {
      other: "{0} jam lalu",
    },
    future: {
      other: "{0} jam lagi",
    },
  },
  day: {
    past: {
      other: "{0} hari lalu",
    },
    future: {
      other: "{0} hari lagi",
    },
  },
  month: {
    past: {
      other: "{0} bulan lalu",
    },
    future: {
      other: "{0} bulan lagi",
    },
  },
  year: {
    past: {
      other: "{0} tahun lalu",
    },
    future: {
      other: "{0} tahun lagi",
    },
  },
};

function getShorterAddress(address) {
  return (
    address.substring(0, 6) +
    "..." +
    address.substring(address.length - 4, address.length)
  );
}

function getFormattedEther(val) {
  let res = ethers.formatEther(val);
  res = Math.round(res * 1e4) / 1e4;

  return res;
}

function getTargetPercentage(amount, target) {
  let percentage = parseInt((amount / target) * 100);
  percentage = percentage > 100 ? 100 : percentage;

  return percentage;
}

function convertUnixTimestamp(unix, isFormal) {
  let datetime = new Date(unix * 1000);

  if (isFormal) {
    TimeAgo.addLocale(id);

    TimeAgo.addLabels("id", "custom", customLabels);

    const timeAgo = new TimeAgo("id");

    const customStyle = {
      labels: "custom",
    };

    datetime = timeAgo.format(datetime, customStyle);
  } else {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const splitedDateFormat = datetime
      .toLocaleDateString("en-US", options)
      .split(" ");

    const month = splitedDateFormat[0].slice(0, 4);
    const day = parseInt(splitedDateFormat[1]);

    datetime = `${day} ${month} ${splitedDateFormat[2]}`;
  }

  return datetime;
}

export {
  getShorterAddress,
  getFormattedEther,
  getTargetPercentage,
  convertUnixTimestamp,
};
