import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPage implements OnInit, OnDestroy {

  public items = [];
  public item = {
    type:'test',
    note: '',
    text: '',
  };
  subscriptions = [];

  constructor(public dataService: DataService,
              public cdr: ChangeDetectorRef) {

  }

  async ngOnInit() {
    console.log('ngOnInit');
    this.subscriptions[0] = this.dataService.subscribeChanges()
      .subscribe(async doc => {
        console.log('We are making changes to docs', doc);
        this.items = await this.dataService.getAllDocs();
        this.cdr.detectChanges();

    });

    this.items = await this.dataService.getAllDocs();
    this.cdr.detectChanges();

  }


  saveItem() {
    console.log('Saving Test: ', this.item);
    this.dataService.save(Object.assign({}, this.item), 'test');
    delete this.item['_id'];
    delete this.item['_rev'];
    this.cdr.detectChanges();


  }

  removeItem(doc){
    console.log('Deleting doc:: ', doc);
    this.dataService.remove(doc._id);
  }

  selectedItem2(item){
    this.item = {...{}, ...item};
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    });
  }

  /*
  removeItem(doc) {
    console.log('Removing: ', doc);
    this.docService.delete(doc, 'test');

  }

  */

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
