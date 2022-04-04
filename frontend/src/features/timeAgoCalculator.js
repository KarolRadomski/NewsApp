const timeAgo = (date) => {
  const commentAddAt = new Date(
    `${date.slice(0, 4)}-${date.slice(5, 7)}-${date.slice(8, 10)} ${date.slice(
      11,
      16
    )}`
  );
  let minutes = Math.floor((new Date() - commentAddAt) / 60000 - 120); //-120 because in MongoDB default UTF is UTF+0
  if (minutes < 60) {
    if (minutes === 1) return `${minutes} minute ago`;
    else return `${minutes} minutes ago`;
  } else if (minutes < 1440) {
    if (minutes % 60 === 1) return `${Math.floor(minutes / 60)} hour ago`;
    else return `${Math.floor(minutes / 60)} hours ago`;
  } else if (minutes < 10080) {
    if (minutes % 1440 === 1) return `${Math.floor(minutes / 1440)} day ago`;
    else return `${Math.floor(minutes / 1440)} days ago`;
  } else if (minutes < 43200) {
    if (minutes % 10080 === 1) return `${Math.floor(minutes / 10080)} week ago`;
    else return `${Math.floor(minutes / 10080)} weeks ago`;
  } else if (minutes < 525600) {
    if (Math.floor(minutes / 43200) === 1)
      return `${Math.floor(minutes / 43200)} month ago`;
    else return `${Math.floor(minutes / 43200)} months ago`;
  } else {
    if (Math.floor(minutes / 525600) === 1)
      return `${Math.floor(minutes / 525600)} year ago`;
    else return `${Math.floor(minutes / 525600)} years ago`;
  }
};
export default timeAgo;
