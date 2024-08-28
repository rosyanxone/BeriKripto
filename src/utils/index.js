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

function shortingAddress(address) {
  return (
    address.substring(0, 4) +
    "..." +
    address.substring(address.length - 4, address.length)
  ).toUpperCase();
}

function convertUnixTimestamp(unix) {
  TimeAgo.addLocale(id);

  TimeAgo.addLabels("id", "custom", customLabels);

  const timeAgo = new TimeAgo("id");

  const customStyle = {
    labels: "custom",
  };

  return timeAgo.format(new Date(unix * 1000), customStyle);
}

export { shortingAddress, convertUnixTimestamp };
