import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/employee/getallemployees');
  }

  addEmployee(addEmployeeObject: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      this.baseApiUrl + '/api/employee/addemployee',
      addEmployeeObject
    );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseApiUrl + '/api/employee/getemployee/' + id);
  }

  UpdateEmployee(id: number,Obj:Employee): Observable<Employee> {
    return this.http.put<Employee>(this.baseApiUrl + '/api/employee/updateemployee/' + id,Obj);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.baseApiUrl + '/api/employee/deleteemployee/' + id);
  }
}
