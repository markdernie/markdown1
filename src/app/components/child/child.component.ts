import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule} from '@angular/material/icon'

import { RelativeTimePipe } from '../../pipes/relative-time.pipe'
import { Model1 } from '../../model/model1'
import { MarkdownToHtmlPipe } from '../../pipes/markdown-to-html.pipe'

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RelativeTimePipe,
    MarkdownToHtmlPipe,
  ],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {

  @Input() model1: Model1 = new Model1()
  @Input() isShow:boolean = false;
  @Input() Index?:number;
  @Input() backendip?:string
  @Output() refresh = new EventEmitter<string>();

  model1form?: any
  baseurl?: string 
  error:boolean=false
  working:boolean=false
  lastupdate?:number=1
  markdownText?:string

  constructor(private formsbuilder: FormBuilder,private http: HttpClient ) { }

  ngOnInit(): void {
    this.baseurl='http://'+this.backendip+'/api/'
    this.get(this.model1.id)
  }

  update(form:any){
    this.http.put<any>(this.baseurl + '?file=' + form.value.id, JSON.stringify(form.value))
    .subscribe((data) => {
      this.refresh.emit('value')
      return data
    })
  }

  get(id:any){
    this.http.get<any>(this.baseurl + '?file='+id+'&action=cv')
      .subscribe({
        next: (result: any) => {
          this.lastupdate=result.lastupdate
          this.model1form = this.formsbuilder.group(result)
        },
        error: (err: any) => {
          console.error('ERROR from:',err)
          this.error = true
          this.working = false
        },
        complete: () => {
          this.working = false
        }
      });
    }



}
