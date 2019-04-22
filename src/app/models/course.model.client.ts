export class Course {
  _id: string;
  name: string;
  studentId: string;
  grade: string;
  professor: string;

  constructor(_id: string, name: string, studentId: string, grade: string, professor: string) {
    this._id = _id;
    this.name = name;
    this.studentId = studentId;
    this.grade = grade;
    this.professor = professor;
  }
}
