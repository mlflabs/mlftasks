import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
import { Observable, fromEvent, Subject } from 'rxjs';
import { map, debounceTime, filter } from 'rxjs/operators';
import { Doc } from '../models';
import { generateCollectionId } from '../utils';
import { promise } from '../../../node_modules/protractor';
import { isEqual } from 'lodash';
import { diff } from 'deep-diff';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

export const TYPE_TASKS = 'todotasks';
export const TYPE_CATEGORIES = 'todocategories';

PouchDB.plugin(PouchDBFind);
// PouchDB.debug.enable('pouchdb:find');

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _pouch: any;
  private _changes;
  private _user;
  private _token;


  private _localPouchOptions = {
    revs_limit: 5,
    auto_compaction: true
  };

  constructor(private platform: Platform,
              public authService: AuthService) {
    console.log('Hello DataService');

    this._changes = new Subject();

    this.platform.ready().then(() => {
      this._user = authService.user;
      this.initPouch(this._user.username,
        this._user.username !== 'Guest',
        this._user.username !== 'Guest' );

      authService.user$.subscribe(user =>{
        if(user.username !== this._user.username){
          // only update if we are different, user change
          // also see if we are updating from guest, import old data
          if(this._user.username === 'Guest'){
            this.initPouch(user.username, true, true);
          }
          this._user = user;
        }
      });
    });
  }



  subscribeChanges(): Observable<any> {
    console.log('Subscribing to changes');
    return this._changes.asObservable().pipe(
      // debounceTime(1000),
      map(doc => {
        return doc;
      })
    );
  }

  subscribeCollectionChanges(type: string, debounce:number=0): Observable<any> {
    console.log('Subscribing to collection changes', type, debounce);
    return this._changes.asObservable().pipe(
      debounceTime(debounce),
      filter(doc => doc['_id'].startsWith(type+'|'))
    );
  }


  subscribeDocChanges(id: string, debounce: number = 0): Observable<any> {
    console.log('Subscribing to doc changes', id, debounce);
    return this._changes.asObservable().pipe(
      debounceTime(debounce),
      filter(doc => doc['_id'] === id)
    );
  }

  async getAllByType(type, serverRefreshForce = false){
    const res = await this._pouch.allDocs({
      include_docs: true,
      startkey: type+'|',
      endkey: type+'|'+ String.fromCharCode(65535)
    });
    const docs = res.rows.map(row => row.doc);
    console.log('Get Collection: ', type, docs);
    return docs;
  }

  async getAllDocs() {
    const res = await this._pouch.allDocs({include_docs: true});
    const docs = res.rows.map(row => row.doc);
    console.log('GetAllDocs:  ', res, docs);
    return docs;
  }

  async remove(id) {
    try {
      const doc = await this._pouch.get(id);
      doc._deleted = true;
      const res = await this._pouch.put(doc);

      if(res.ok)
        return res;
      else
        return false;
    }
    catch(e) {
      console.log('Remove Pouch Error:: ', e);
      return false;
    }
  }


  async save(doc, collection:string='', oldDoc = null): Promise<any> {

    // if its a design doc, or query, skip it
    if(doc._id != null && doc._id.startsWith('_') )
    {
      console.log('Skiped Save, internal doc:  ', doc);
      return false;
    }

    console.log('Saving Doc: ', doc, collection, oldDoc);

    // see if we need to compare changes and only save if there are any
    // lets see if there are actual changes
    const changes = diff(doc, oldDoc);
    if(oldDoc != null){
      console.log('Save, changes: ', changes);

      // console.log('ARE THERE CHANGES: ', changes);
      if(isEqual(oldDoc, doc)){
        // console.log('NO Changes');
        return false; // we have no need to save, maybe here we need something else, like a message
      }
    }


    let res;
    try {
      doc.updated = Date.now();

      if(doc._id == null){
        doc._id = generateCollectionId(collection);
        console.log(doc);
        res = await this._pouch.put(doc);
      }
      else{
        // try getting the doc and merge it
        const old = await this._pouch.get(doc._id);
        console.log('Got old doc: ', old);

        res = await this._pouch.put({...old, ...doc});
      }
      console.log('Saved doc: ', res);
      if(res.ok)
        return res;
      else
        return false;
    }
    catch(e) {
      console.log('Save Pouch Error:: ', e);
      return false;
    }
  }

  async getDoc(id:string): Promise<any> {
    try {
      const doc = await this._pouch.get(id);
      console.log('Get Doc Loaded: ', doc);
      return doc;
    }
    catch(e){
      console.log('Get Doc Error: ', e);
      return null;
    }
  }

  async findDocsByCategory(id:string): Promise<any> {
    try {
      const docs = await this._pouch.find({
        selector: {
          category: {$eq: id}
        }
      });
      console.log('Found docs by category::: ', docs);

      return docs.docs;
    }
    catch(e){
      console.log('Error finding docs: ', e);
      return [];
    }
  }

  async findDocsByProperty(value, prop:string): Promise<any> {
    try {

      const query = { [prop]: {$eq: value}};
      console.log('Query: ', query);


      const docs = await this._pouch.find({
        selector: {
          [prop]: {$eq: value}
        }
      });
      console.log('Found docs by property::: ', value, prop, docs);

      return docs.docs;
    }
    catch(e){
      console.log('Error finding docs by property: ', e, value, prop);
      return [];
    }
  }

  async findAllDocsByPropertyNotNull(prop:string): Promise<any> {
    try {
      const docs = await this._pouch.find({
        selector: {
          [prop]: {'$gt': 0}
        }
      });
      console.log('Found docs not null by property::: ', prop, docs);

      return docs.docs;
    }
    catch(e){
      console.log('Error finding not null docs by property: ', e,  prop);
      return [];
    }
  }



  /*
  save(doc:Doc): Promise<any>{
    return new Promise((resolve,reject) =>{
      console.log('DataProvider->save doc: ', doc);
      this._pouch.put(doc)
        .then((res)=>{
          resolve(res);
        })
        .catch(err=>{
          console.log('Datarovider Save Error:'+JSON.stringify(err));
          reject(err);
        });
      })
  }

  subscribeCollectionChanges(): Observable<any> {
    
  }

  async getDocById(id: string, collection: string): Promise<any> {
    
  }

  async searchByField(value, field, collection, limit=20): Promise<any>{
    
  }


 

*/


  private async  initPouch(pouchName:string,
                    syncRemote:boolean=false,
                    mergeOldData:boolean=false):Promise<any> {

    console.log('DataProvider->initDB localName: '+JSON.stringify(pouchName));

    let olddocs;

    if(mergeOldData){
      // if we are merging, first get all the data
      olddocs = await this.getAllDocs();
    }

    this._pouch = new PouchDB(pouchName, this._localPouchOptions);
   
   /*
    this._pouch.createIndex({
        index: {
          fields: ['category']
        }
    });
    this._pouch.createIndex({
        index: {
          fields: ['today']
        }
    });
    this._pouch.createIndex({
        index: {
          fields: ['important']
        }
    });
    this._pouch.createIndex({
        index: {
          fields: ['dueDate']
        }
    });
    this._pouch.createIndex({
        index: {
          fields: ['remindDate']
        }
    });

    */


    window['PouchDB'] = PouchDB;// make it visible for chrome extension

      // create our event subject
    this._pouch.changes({live: true, since: 'now', include_docs:true})
        .on('change', change => {
          console.log('Pouch on change', change);
          this._changes.next(change.doc);
    });

    if(syncRemote){
      console.log('USER::: ', this._user);
      const remoteDB = new PouchDB('http://localhost:9000/jwttest',
        {headers:{ 'x-access-token': this._user.token} });

      const opts = {
        live: false,
        retry: false
      };
      this._pouch.replicate.to(remoteDB, opts);
      this._pouch.replicate.from(remoteDB, opts)
       .on('change', function (change) {
        console.log('Remote Sync: ', change);
      }).on('error', function (err) {
        console.log('Remote Error: ', err);
        // yo, we got an error! (maybe the user went offline?)
      }).on('complete', function () {
        console.log('Remote Sync Completed ');
      }).on('paused', function (info) {
        console.log('Remote Sync PAUSED: ', info);
        // replication was paused, usually because of a lost connection
      }).on('active', function (info) {
        console.log('Remote Sync ACTIVE: ', info);
      });
    }

    // load the docs into new pouch db
    if(mergeOldData){
      olddocs.forEach(doc => {
        this.save(doc);
      });
    }
  }



/*
  subscribeChanges(collection:string): Observable<any> {
    
    return fromEvent(nSQL(collection), 'change').pipe(
      debounceTime(1000),
      map(event => {
        console.log('subscribe ', event);
        if(event[0]['affectedRows'])
        return event[0]['affectedRows'];
      })
    );
  }

  async getDocById(id: string, collection: string): Promise<any> {
    const doc = await nSQL(collection).query('select')
      .where(['id','=',id]).exec();
    console.log('GetDoc: ', id, collection, doc);
    return doc[0];
  }

  async getAllDocs(collection, serverRefreshForce = false){
    const docs = await nSQL(collection).query('select').exec();

    console.log('GetAllDocs:::: ', collection, docs);
    if(serverRefreshForce){
      this._serverLoadCollection(collection);
    }
    return docs;
  }

  async getByQuery(field, operator, value, collection): Promise<any>{
    const doc = await nSQL(collection).query('select')
      .where([field, operator, value ]).exec();

    console.log('GetDoc: ', field, operator,value, collection, doc);
    return doc;
  }

  async searchByField(value, field, collection, limit=20): Promise<any>{
    const doc = await nSQL(collection).query('select')
      .where([field, 'LIKE', value ]).limit(limit).exec();

    console.log('Search Docs: ', collection, field, limit, value, doc);
    return doc;
  }


  async save(doc, collection) {
    console.log('Doc Save', doc);

    if(!doc.id){
      console.log('New doc, giving new id: ', doc);
      const username =  await this.authService.getUsername();
      console.log('Username: ', username);
      ObjectID.setMachineID(username);
      doc.id = await ObjectID.generate(Date.now() / 10);
      doc.meta_newid = true;
      doc._id = doc.id;
    }
    else {
      //get old doc
      const old = await this.getDocById(doc.id, collection);

      //lets see if there are actual changes
      const changes = diff(doc, old);

      //console.log('ARE THERE CHANGES: ', changes);
      if(isEqual(old, doc)){
        //console.log('NO Changes');
        return doc;
      }
      else {
        //console.log('YES Changes');
        //lets make it dirty
        doc.meta_dirty = true;
      }
  
    }
    const result = await nSQL(collection).query('upsert', doc).exec();

    console.log('Save 1 Results: ', result);

    //since this is a new change, put into change stream, 
    if(environment.collections.includes(collection)){

      if(environment.sync_collections.includes(collection)){
        //only add to stream if its a sync collection
        await nSQL(DOC_LOCAL_CHANGES_STREM)
          .query('upsert', { id: doc.id, 
                            collection: collection, 
                            isDelete: doc.meta_removed,
                            action: 'saved',
                            doc: doc,
                            }).exec();
      }
      const localDoc = result[0]['affectedRows'][0];

      await this._server_save(localDoc, collection);

      console.log('Saved, localdoc: ', localDoc);
      return localDoc;
    }

    return result[0]['affectedRows'][0];
  }

  async delete_full(id, collection){
    await nSQL(collection).query('delete').where(['id','=',id]).exec();
  }

  async delete(doc, collection) {
    console.log('Remove', doc, collection);
    doc.meta_removed = true;
    doc.meta_dirty = true;

    //save into deleted collection, and remove it from this one
    await nSQL(collection+'_deleted').query('upsert', doc).exec();
    //first same as deleted, so subscriptions know that its gone, then remove it
    await nSQL(collection).query('upsert', doc).exec();
    await nSQL(collection).query('delete').where(['id','=',doc.id]).exec();
    await nSQL(DOC_LOCAL_CHANGES_STREM)
      .query('upsert', { id: doc.id, collection: collection, action: 'deleted'})
      .exec();

    
    const msg = await this._server_save(doc, collection);
    //console.log('Deleting result', msg);
  }

  async _server_save(doc, collection){
    try{

      //first filter private collections
      if(collection === SETTINGS_SERVICE)
        return false;

      console.log('Preparing for save: ', collection);
      if(doc.meta_newid){
        console.log('Saving to Server');
        this.feathersService[collection].create(doc);
      }
      else {
        console.log('Updating to Server::: ', collection);
        this.feathersService[collection].update(doc.id, doc);
      }
    }
    catch(e){
      console.log('Server Save Error: ', e);
      this.events.next({
        type:'', 
        message:e.message, 
        collection: collection, 
        e:e,
        doc: doc
      });
    }
  }

  async _server_onLoadDataFromServer(doc, collection) {
    //console.log('Load data from Server', doc, collection);

    //for some reason nSQL will keep unsaved props
    //so we have to specify them here, otherwise will not overwrite
    doc.meta_newid = false;
    doc.id = doc._id;
    //now we have to see if its a deleted doc or not
    if(doc.meta_removed){
      const result = await nSQL(collection+'_deleted').query('upsert', doc).exec();
      console.log('LOADED DELETED DOC: ', collection+'_deleted', result[0]['affectedRows']);
    }
    else {
      const result = await nSQL(collection).query('upsert', doc).exec();
      //console.log('Server to Local Save: ', collection, result);
      console.log('LOADED DOC: ', collection, result[0]['affectedRows']);
    }

    //also need to remove this item from change feed
    await nSQL(DOC_LOCAL_CHANGES_STREM)
      .query('delete').where(['id','=',doc.id]).exec();
    
  }


  async _server_onRemove(doc, collection): Promise<any> {
    console.log('Feathers Remove: ', doc, collection);
    return doc;
  }

  async _serverLoadCollection(collection, lastUpdateDate=null) {
      try {
        console.log('Server Load: ', collection);
        let docs;
        if(lastUpdateDate){
          docs = await this.feathersService[collection].find({
            query: { 
              $limit: 10000,
              $sort: {
                _id: -1
              },
              updatedAt: {
                $gt: lastUpdateDate - 1000 //take out 500 millseconds, give buffer for missed docs
              }
            }
          });
        }
        else {
          docs = await this.feathersService[collection].find({
            query: { $limit: 10000 }
          });

          await this._dropCollection(collection);
          await this._dropCollection(collection+_COLLECTION_DELETED_SUFIX);
        }

        if(docs.date)
          await this.save({id: collection+'_lastChange',
                          date: docs.date},
                          SETTINGS_SERVICE);

        console.log('Loading all docs::::', docs);

        await docs.data.forEach( async d => {
          await this._server_onLoadDataFromServer(d, collection);
        });

        console.log('Added '+docs.data.length+' docs to::::: '+ collection);
      } catch (e) {
        console.log('Error pulling all events', e);
      }
  }

  async _dropCollection(collection = 'all'){
    if(collection === 'all'){
      environment.collections.forEach( async col =>{
        await nSQL(col).query('drop').exec();
      });

      //drop settings and change feed
      await nSQL(SETTINGS_SERVICE).query('drop').exec();
      await nSQL(DOC_LOCAL_CHANGES_STREM).query('drop').exec();
    }
    else {
      //await nSQL(collection).query('drop').exec();
      await nSQL(collection)
        .query('delete').exec();
      //also drop any sync doc that reference this query
      console.log('Removing Docs from Change Stream for Group: ', collection);
      //await nSQL(DocService.DOC_CHANGES_STREM)
      //  .query('delete').where(['collection','=',collection]).exec();
    }
  }

*/











  /* Get single doc by id */

  /*
  getDoc(id:string):Doc{
    let d =  this.dataStore.docs.find((doc)=> {
      if(doc._id === id)
        return true;
      return false;
    })

    if(d._id)
      return d;

    return null;
  }

  getDocs(type:string = null){
    if(type)
      return  this.dataStore.docs.filter((doc)=> doc.type === type)
    return this.dataStore.docs;
  }

  getAllDocs(){
    return this.dataStore.docs;
  }

  getDocObservable(id:string):Observable<any> {
    return this._docs.asObservable().map(doc => {
      return doc.find(doc => doc._id === id);
    })
  }

  getDocsObservable(type:string):Observable<any> {
    if(type == null)
      return this._docs.asObservable();

    //lets filter by type
    return this._docs.asObservable().map(doc => {
      return doc.filter((doc,idx)=> doc.type === type)
    }).do(doc =>{
     // console.log('Filter docs:'+JSON.stringify(doc));
    })
  }


  save(doc:Doc): Promise<any>{
    return new Promise((resolve,reject) =>{
      console.log('DataProvider->save doc: ', doc);
      this._pouch.put(doc)
        .then((res)=>{
          resolve(res);
        })
        .catch(err=>{
          console.log('Datarovider Save Error:'+JSON.stringify(err));
          reject(err);
        });
      })
  }

  remove(doc:Doc): Promise<Doc>{
    return new Promise((res,rej) =>{
        this._pouch.get(doc._id).then((doc)=>{
            doc._deleted = true;
            res(this._pouch.put(doc));
        })
    });
  }

  addAttachment(doc:Doc, filename:string, type:string, file:any){
    return new Promise(resolve=>{
      //first lets make sure we have the file
      this._pouch.get(doc._id).then(res=>{
        console.log("Got doc", res);
        this._pouch.putAttachment(doc._id, filename, doc._rev, file, type).then(res =>{
          console.log('Added file', res);
        });
      }).catch(err=>{
        console.log("AddAttachment error loading doc: ", err);
        //save doc first then add attachments
        //make sure doc has a name
        this.save(doc).then(res2=>{
          console.log("Saved Doc", res2);
          this._pouch.putAttachment(res2.id, filename, res2.rev, file, type).then(res3 =>{
            console.log('Added file', res3);
        });
        })
      })


    })
  }

  getAttachment(doc:Doc, filename:string):Promise<any>{
    return new Promise(resolve=>{
      this._pouch.getAttachment(doc, filename).then(res=>{
        console.log("Got File", res);
        resolve(res);
      }).catch(err=>{
        console.log("Error loading file:", err);
        resolve(null);
      })
    });
  }



  private pouchRemoved(doc:Doc) {
    // console.log('DocReducer->REMOVE_SUCCESS: '+JSON.stringify(doc));
    // this.dataStore.docs = this.dataStore.docs.filter(d=>d._id !== doc._id);
    // console.log('remove filter:'+JSON.stringify(this.dataStore.docs));
    // this._docs.next(this.dataStore.docs);
  }

  private pouchSaved(doc:Doc) {
    // this.dataStore.docs.push(doc);
    // console.log('Save successfull:'+JSON.stringify(this.dataStore.docs));
    // this.dataStore.docs = saveIntoArray(doc, this.dataStore.docs);
    // this._docs.next(this.dataStore.docs);
  }


  private loadAllDocs(docs:Doc[]) {
    // this.dataStore.docs = docs;
    // this._docs.next(this.dataStore.docs);
  }





  private initPouch(pouchName:string, connectRemote:boolean=false):Promise<any> {
    console.log('DataProvider->initDB localName: '+JSON.stringify(pouchName));
    return this.platform.ready().then(() => {
      this._pouch = new PouchDB(pouchName, this._localPouchOptions);
      window['PouchDB'] = PouchDB;// make it visible for chrome extension

      // lets load all the data and then listen to all the changes
      // lets init db, and load all the docs
      this._pouch.allDocs({include_docs: true})
        .then(doc => {
          console.log('Init Docs: '+JSON.stringify(doc));
          // this.loadAllDocs(doc.rows);
          const state:Doc[] = doc.rows.map(row => row.doc);
          this.loadAllDocs(state);

        });

      // now watch for changes
      his._pouch.changes({live: true, since: 'now', include_docs:true})
        .on('change', change => {
           console.log('Changes obj:'+JSON.stringify(change));
           if (change['deleted']) {
                this.pouchRemoved(change.doc);
            } else {
              console.log('PouchChange:'+JSON.stringify(change));
                this.pouchSaved(change.doc);
            }
         });
    });// end of platform ready
  }

*/
}
