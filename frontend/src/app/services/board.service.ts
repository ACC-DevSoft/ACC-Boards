import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  public env: String;
  constructor(private http: HttpClient) {
    this.env = environment.APP_URL;
  }

  createBoard(board: any, id:string) {
    return this.http.post(this.env + "board/create/"+ id, board)
  }

  listBoard(boardId: any){    
    return this.http.get(this.env + "board/list/" + boardId)
  }

  addTask(board: any) {

    return this.http.post<any>(this.env + 'board/addTask', board);

  }
  addTaskImg(board: any) {

    return this.http.post<any>(this.env + 'board/addTask', board);

  }


  listTask(boardId: any) {
    return this.http.get<any>(this.env + 'board/getTasks/' + boardId)
  }

  updateTask(body: any) {
    return this.http.put<any>(this.env + 'board/updateTask/'+ body._id, body)
  }

  showImg(collection: string,id:any) {
    return this.http.get<any>(`${this.env}uploads/${collection}/${id}`,{responseType: 'blob' as 'json'})
  }
  updateImg(collection: string,id:any,image: any) {
    return this.http.put<any>(`${this.env}uploads/${collection}/${id}`, image)
  }

  deleteTask(id: any ){
    return this.http.delete<any>(this.env + 'board/deleteTask/'+ id)
  }
 
}
