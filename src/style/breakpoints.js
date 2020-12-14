const size = {
  s: '480px',
  m: '768px',
  l: '1281px',
}
const device = {
  Mobiles: `(min-width:${size.s})`,
  Tablets: ` (min-width:${size.m})`,
  Desktops: `(min-width: ${size.l})`
}
export{ size, device }