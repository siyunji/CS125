import { Storage } from '@ionic/storage';

export class DataBase {
  public exerciseStorage: Storage;
  constructor(exerciseStorage) {
    this.exerciseStorage = exerciseStorage;
  }
  public do(){
    this.exerciseStorage.set('kk', 'swim');
  }
}
// https://www.jefit.com/exercises/290/
// URL: 