import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models';
import { DataService, TYPE_CATEGORIES, TYPE_TASKS } from '../../../services/data.service';
import { ModalController } from '../../../../../node_modules/@ionic/angular';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  public item:Category = new Category();
  public isLoading = false;

  constructor( public dataService: DataService,
               public modalController: ModalController ) { }

  ngOnInit() {
  }

  saveItem() {
    console.log('Saving: ', this.item);
    this.dataService.save(Object.assign({}, this.item), TYPE_CATEGORIES);
    this.close();
  }

  close(){
    this.modalController.dismiss();
  }

  async removeItem(){
    console.log('Remove doc:: ', this.item);
    // first see if there are any tasks in this category
    // load all tasks and see which ones belong to it
    const tasks = await this.dataService.getAllByType(TYPE_TASKS);
    tasks.forEach(cat => {
      if(cat.category === this.item._id)
        this.dataService.save({...cat, ...{category: null}});
    });
    this.dataService.remove(this.item._id);
    this.close();
  }


}
