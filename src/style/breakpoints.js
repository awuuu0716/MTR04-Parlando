const size = {
  s: '320px',
  m: '768px',
  lm:'1024px',
  l: '1281px',
};
const device = {
  Mobiles: `(min-width:${size.s})`,
  Tablets: ` (min-width:${size.m})`,
  Laptop: ` (min-width:${size.lm})`,
  Desktops: `(min-width: ${size.l})`,
};
export { size, device };
