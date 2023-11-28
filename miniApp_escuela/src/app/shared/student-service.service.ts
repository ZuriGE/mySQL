import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private url = 'http://localhost:3000/students'

  constructor(private http:HttpClient) { }

  students:Student[]

  getStudentById(student_id):Observable<Object>{
    return this.http.get<Object>(`${this.url}?student_id=${student_id}`)
  }

  getAllStudents():Observable<Object>{
    return this.http.get<Object>(`${this.url}`)
  }

  postStudent(student:Student):Observable<Object>{
    return this.http.post<Object>(`${this.url}`, student)
  }

}
