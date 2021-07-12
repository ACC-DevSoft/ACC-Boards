import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks: any[] = [];
  id: String;
  taskId: String;
  taskData: any;
  edition: boolean;
  selectedFile: any;
  flagImg: boolean;
  taskImg: string;
  readerImg: any;



  constructor(public board: BoardService, private router: Router, private activateRoute: ActivatedRoute) {

    this.id = this.activateRoute.snapshot.params.id;
    this.taskId = '';
    this.taskImg = '';
    this.taskData = {}
    this.edition = false;
    this.flagImg = false;
    this.selectedFile = null;

    this.loadTask();
  }

  ngOnInit(): void { }

  loadTask() {
    this.board.listTask(this.id).subscribe(
      (res: any) => {
        this.tasks = res.tasks;
      });
  }

  changeStatus(task: any, status: string) {

    task.status = status;

    this.board.updateTask(task).subscribe(
      res => {
        task.status = status;
        console.log(task.status);

      }
    );

  }
  createTask() {
    this.router.navigate(['/addTask', this.id]);
  }

  editTask(task: any, taskId: any) {
    const { name, description, _id } = task;

    if (taskId == _id) {
      this.edition = true;
    } else {
      this.edition = false;
    }

    if (this.edition && task._id == taskId) {
      this.currentImg(_id);
    } else {
      this.readerImg = null
    }

    this.taskData = { _id, name, description }

    this.taskId = _id;

  }

  saveChanges() {
    this.edition = false
    this.board.updateTask(this.taskData).subscribe(
      res => {
        console.log(res);
        this.changeImg();
        this.loadTask();

      }
    )
  }

  cancelChanges() {
    this.edition = false
  }

  currentImg(id: string) {
    this.board.showImg('tasks', id).subscribe(
      res => {
        console.log(res);
        const reader = new FileReader();
        reader.readAsDataURL(res); // convierte el blob a base64 y llama a onload
        reader.onload = () => this.readerImg = reader.result; // URL de datos
      }
    )
  }
  uploadImg(event: any) {
    console.log(event);
    if (event.target.files && event.target.files[0]) {

      this.selectedFile = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => this.readerImg = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }

    this.flagImg = true;

  }

  changeImg() {
    const data = new FormData();

    if (this.flagImg) {

      data.append('image', this.selectedFile);
      this.flagImg = false;
    } else {
      data.append('image', '');
    }


    this.board.updateImg('tasks', this.taskId, data).subscribe(
      res => {
        console.log(res);

      }
    );
    this.edition = false;

  }

  deleteTask(id: any) {
    this.board.deleteTask(id).subscribe(
      res => {

        this.loadTask();

      }
    )

  }

  deleteImg() {
    this.readerImg = '/assets/imgs/no-image.jpg';
  }


  drop(e: any) {
    console.log('ok!', e)

    moveItemInArray(this.tasks, e.previousIndex, e.currentIndex);



  }

}
