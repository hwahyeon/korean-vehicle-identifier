function splitLicensePlate(input) {
  const pattern = /^(\d+)?-?([가-힣]+)-?(\d+)$/;
  const match = input.match(pattern);

  if (match) {
      return {
          part1: match[1] || '',
          part2: match[2],
          part3: match[3] || ''
      };
  } else {
      return null;
  }
}




