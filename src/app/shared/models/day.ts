export class Day {
  public date: Date;
  public isPastDate: boolean;
  public isToday: boolean;
  public isExamDay: boolean;
  
  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
    this.isExamDay = false;
  }
}