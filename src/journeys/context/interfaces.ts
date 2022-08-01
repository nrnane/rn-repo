export interface State {
    [key: string]: string | number | boolean | object;
}
export interface AppContext {
    appState: State | null | undefined
    dispatch(appState?: State): void
}

export interface JStore {
    [key: string]: string | number | boolean | object;
}
export interface JContext {
    journeyStore: JStore | null
    setJourneyStore(storeValues: JStore): void
}