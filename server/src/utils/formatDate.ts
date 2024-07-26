export const formatDate = (publishedDate: string | undefined): string => {
  if (!publishedDate) {
    return "1900-01-01"; // Return a default date or handle it as you see fit
  }
  console.log("Here is the Log!!!,,,,,,,,: ", publishedDate);

  // Check if the date is only a year (length 4 and all digits)
  if (publishedDate.length === 4 && /^\d{4}$/.test(publishedDate)) {
    return `${publishedDate}-01-01`; // Default to January 1st of that year
  } else if (publishedDate.length === 7) {
    return `${publishedDate}-01`;
  }

  return publishedDate; // Return the original if it's already a full date
};
