export const copyTextToClipboard = (text) => {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text);
};

export const getActiveWeek = () => {
  const d = new Date();

  // add random default value for testing purpose
  return d < Date.parse('24 April 2023 00:00:00 GMT+8') ? 1
    : d >= Date.parse('24 April 2023 10:00:00 GMT+8') && d <= Date.parse('30 April 2023 23:59:59 GMT+8') ? 1
    : d >= Date.parse('1 May 2023 10:00:00 GMT+8') && d <= Date.parse('7 May 2023 23:59:59 GMT+8') ? 2
    : d >= Date.parse('8 May 2023 10:00:00 GMT+8') && d <= Date.parse('14 May 2023 23:59:59 GMT+8') ? 3
    : d >= Date.parse('15 May 2023 10:00:00 GMT+8') && d <= Date.parse('21 May 2023 23:59:59 GMT+8') ? 4
    : -1;
};