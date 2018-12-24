import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DataService, TYPE_TASKS, TYPE_CATEGORIES } from '../../../services/data.service';
import { ModalController } from '@ionic/angular';
import { Category } from '../../../models';
import { CategoryPage } from '../category/category.page';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {

  public subscriptions = [];
  public items =[];
  public item;
  constructor(public dataService: DataService,
              public modalController: ModalController,
              public cdr: ChangeDetectorRef) { }


  async ngOnInit() {
    console.log('ngOnInit');
    this.subscriptions[0] = this.dataService.subscribeCollectionChanges(
      TYPE_CATEGORIES, 1000).subscribe(async doc => {
        console.log('We are making changes to docs', doc);
        this.items = await this.dataService.getAllByType(TYPE_CATEGORIES);
        this.cdr.detectChanges();

    });

    this.items = await this.dataService.getAllByType(TYPE_CATEGORIES);
    this.cdr.detectChanges();

  }

  async add(){
    console.log('ADD');
    const modal = await this.modalController.create({
      component: CategoryPage,
      componentProps: { item: new Category }
    });
    modal.present();
  }

  saveItem() {
    console.log('Saving: ', this.item);
    this.dataService.save(Object.assign({}, this.item), TYPE_CATEGORIES);
    delete this.item['_id'];
    delete this.item['_rev'];
    this.cdr.detectChanges();


  }

  async selectedItem(item){
    console.log('SELECT', item);
    const modal = await this.modalController.create({
      component: CategoryPage,
      componentProps: { item: {...{}, ...item}}
    });
    modal.present();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    });
  }

}
