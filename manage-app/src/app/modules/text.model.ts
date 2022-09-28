import { BehaviorSubject } from 'rxjs';

export class TextWrite {

  private enText = 'The Project Managment Application is our guarantee of your success work!';
  private ruText = 'Приложение для управления проектами - наша гарантия вашей успешной работы!';
  public subjectString = new BehaviorSubject<string>('');
  public text = '';

  constructor() {}

  textWriting(lang: string) {
    const current = lang === 'ru' ? this.ruText : this.enText;
    this.text = current;
    for (let i = 0; i < this.text.length; i++) {
      setTimeout(() => {
        this.subjectString.next(this.text.slice(0, i));
      }, 50 * i)
    }
  }
}