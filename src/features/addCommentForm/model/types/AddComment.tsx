import * as Yup from 'yup';

export class AddComment {
  public text: string = '';

  constructor(text?: string) {
    this.text = text || '';
  }

  static yupValidationSchema = Yup.object()
    .shape({
      text: Yup.string(),
    });
}
