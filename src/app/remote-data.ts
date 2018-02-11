import { Pipe, PipeTransform } from '@angular/core';

export class NotAsked {}
export class Loading {}
export class Faliure<E> {
  constructor(private error: E){}
  fold(): E {
    return this.error;
  }
}
export class Success<T> {
  constructor(private value: T){}
  fold(): T {
    return this.value;
  }
}

export type RemoteData<E, T> = NotAsked | Loading | Faliure<E> | Success<T>

// Pipes

@Pipe({name: 'isNotAsked'})
export class IsNotAskedPipe implements PipeTransform {
  transform(value: RemoteData<any, any>): boolean {
    return value instanceof NotAsked;
  }
}

@Pipe({name: 'isLoading'})
export class IsLoadingPipe implements PipeTransform {
  transform(value: RemoteData<any, any>): boolean {
    return value instanceof Loading;
  }
}

@Pipe({name: 'isFaliure'})
export class IsFaliurePipe implements PipeTransform {
  transform(value: RemoteData<any, any>): boolean {
    return value instanceof Faliure;
  }
}

@Pipe({name: 'isSuccess'})
export class IsSuccessPipe implements PipeTransform {
  transform(value: RemoteData<any, any>): boolean {
    return value instanceof Success;
  }
}

