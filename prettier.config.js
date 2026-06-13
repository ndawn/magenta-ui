//  @ts-check

/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: false,
  trailingComma: "all",
  importOrder: ["^react$", "^[^@\.](.*)$", "^@[^\/](.*)$", "^@\/", "^[\.\/]"],
}

export default config
