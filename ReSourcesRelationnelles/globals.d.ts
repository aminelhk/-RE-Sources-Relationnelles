// declare var global: typeof globalThis
declare global {
  namespace NodeJS {
    interface Global {
      fetch: typeof fetch
    }
  }
}

export {}
