export class Base {
  protected derivedByTestId(testId: string): string {
    return `[data-testid="${testId}"]`;
  }
}
