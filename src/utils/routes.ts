type Modules = keyof typeof MODULES
type ModuleRoute = typeof MODULES[Modules]
type ModuleAPIRoute = `${ModuleRoute}/${string}`
type APIRoutes = Record<Modules, Record<string,ModuleAPIRoute>>

export const MODULES ={
  USERS:"/users",
  SALES:"/sales",
  REPORTING:"/reporting"
} as const


export const OPERATIONS ={}

export const ROUTES={
REPORTING:{

},
SALES:{

},
USERS:{

}
} as const
