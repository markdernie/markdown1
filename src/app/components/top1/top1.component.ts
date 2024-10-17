import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import { Model1 } from '../../model/model1'
import { ChildComponent } from '../child/child.component'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatProgressBar } from '@angular/material/progress-bar'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-top1',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBar,
    MatIconModule,
    ChildComponent
  ],
  templateUrl: './top1.component.html',
  styleUrl: './top1.component.scss'
})

export class Top1Component {
  @Input() backend?:string
  @Output() Saved = new EventEmitter<void>();

  baseurl?: string
  working: boolean = false
  error: boolean = false;
  isShow:boolean=false
  array: Array<Model1> = []

  constructor(private formsbuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit(): void {
    this.baseurl='http://'+this.backend+'/api/'
    this.getall()
  }
  getall() {
    console.log('getall()',this.baseurl)
    this.error = false
    this.working = true
    

    
    this.array = []
    
    this.http.get<any>(this.baseurl + '?file=index.dat&action=all')
      .subscribe({
        next: (result: any) => {       
          console.log('this.http.get:',result)
          for (const item of result) {
            this.array.push(item)
          }
        },
        error: (err: any) => {
          console.error('ERROR from:',this.baseurl)
          this.error = true
          this.working = false
        },
        complete: () => {
          this.working = false
        }
      });
    }

    createnew(){
      console.log('clicked on create new')
      let newmodel1= new Model1()
      let newmodel1form = this.formsbuilder.group(newmodel1)
      console.log('new tranaction id',newmodel1.id)
      this.http.put<any>(this.baseurl + '?file=' + newmodel1form.value.id, JSON.stringify(newmodel1form.value))
      .subscribe((data) => {
        console.log('Top1.component.createnew return:',data)
        this.getall()
        return data     
      })
  
    }

    toggleDisplay() {
      this.isShow = !this.isShow;
    }

}
