## Features

Convert rgb, rgba, hsl, hsla to hex code  
Convert hex to rgb, rgba, hsl, hsla

## Command

1. Convert Color to Hex
2. Convert Hex to HSL
3. Convert Hex to RGB

## Test Result

```
// Convert Color to Hex
html {
  color: rgb(100, 100, 100, 0);
}

body {
  color: rgb(100, 100, 100);
}

// Result
html {
  color: #64646400;
}

body {
  color: #646464ff;
}

```

```
// Convert Hex to HSL
html {
  color: #64646400;
}

body {
  color: #646464ff;
}

// Result
html {
  color: hsla(0, 0%, 39.2%, 0);
}
body {
  color: hsl(0, 0%, 39.2%);
}

```
