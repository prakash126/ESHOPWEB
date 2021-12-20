import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  mymessageevent = new EventEmitter();
  constructor() { }
}
