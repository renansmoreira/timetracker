export default interface BaseUseCase<T, R> {
  execute(command: T): Promise<R>;
}
