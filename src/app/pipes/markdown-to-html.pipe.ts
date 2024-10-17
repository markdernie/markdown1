import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked'

@Pipe({
  name: 'markdownToHtml',
  standalone: true
})
export class MarkdownToHtmlPipe implements PipeTransform {

  transform(markdown: string): string {
    if (!markdown) return '';
    return marked(markdown).toString();
  }

}
