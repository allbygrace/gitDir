export class Student {
    studentID: number;
    first_name: string;
    last_name: string ;
    email: string;
    constructor(studentID: number,  first_name: string,    last_name: string, email:string ) {
      this.studentID = studentID;
      this.first_name = first_name;
      this.last_name = last_name;
      this.email = email;
    }
  }
  