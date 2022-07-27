import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {


  /*Entry Properties*/
//NO INICIALIZADAS - OJO Quitar signo de admiración
  @Input() 
  page!: number;

  @Input() 
  count!: number;

  @Input() 
  perPage!: number;

  @Input()
  pagesToShow!: number;

  @Input() 
  loading!: boolean;

  /*Output event*/
  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();
  @Output() goPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }


  onPrev(): void{
    this.goPrev.emit(true);
  }


  onNext(): void{
    this.goNext.emit(true);
  }


  onPage(num: number): void {
    this.goPage.emit(num);
  }
  

  totalPages(): number {
    return Math.ceil(this.count / this.perPage) || 0;
  }


  isLastPage(): boolean {
    return this.perPage * this.page >= this.count;
  }


  // Mostrar mínimo de numero de páginas
  getMin(): number{
    return ((this.perPage * this.page) - this.perPage) + 1;
  }


  // Mostrar máximo numero de páginas
  getMax(): number{
    let max = this.perPage * this.page;
    
    if (max > this.count) {
      max = this.count
    }
    return max;
  }


  // Matriz de páginas
  getPages(): number[] {
    const totalPages = Math.ceil(this.count / this.page);
    const thisPage = this.page || 1;
    const pagesToShow = this.pagesToShow || 9;
    const pages: number[] = [];
    pages.push(thisPage);

    console.log('starting loop with: total pages:', totalPages, 'thisPage:', thisPage, 'pagesToShow:', pagesToShow);
    
    for(let i = 0; i < pagesToShow - 1; i++){
      
      console.log('pages[]:', pages);

      if (pages.length < pagesToShow) {
        if (Math.min.apply(null, pages) > 1) {
          pages.push(Math.min.apply(null, pages) - 1);
          console.log('pushing:', Math.min.apply(null, pages) - 1, 'onto array');
        }
      }

      if (pages.length < pagesToShow) {
        if (Math.max.apply(null, pages) < totalPages) {
          pages.push(Math.max.apply(null, pages) + 1);
          console.log('pushing:', Math.max.apply(null, pages) + 1, 'onto array')
        }
      }
    }
    pages.sort((a, b) => a - b);

    return pages;
  }

}
