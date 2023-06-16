export class Sort {
  constructor(
    public Field: string,
    public Dir: string) {
  }
}

export class LookupQueryInfo {
  constructor(
    public Take: number = 50,
    public Id: number = 0,
    public Query: string = null,
    public ParameterDependencies: string = null
  ) {
  }
}