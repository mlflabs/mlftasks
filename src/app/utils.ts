


export function generateCollectionId(prefix:string=''):string {
  return prefix+'|'+generateUUID();
}


export function saveIntoArray(item:Object, ary:Array<any>, idKey:string='_id'):Array<any>{
let i = getIndexById(item[idKey],ary,idKey);
    if(i === -1) {
      i=ary.length;
    }
    return [  ...ary.slice(0, i),
              Object.assign({},item),
              ...ary.slice(i + 1) ];
}

export function getIndexById(id:string, ary:any, idKey:string = '_id'):number{
 for(let i = 0; i < ary.length; i++) {
      if(id === ary[i][idKey]) {
        return i;
      }
    }

    // if we don't have a match return null
    return -1;
}


/**
* This is a simple generattor that will have date timestamp plush random numbers
*/
export function generateUUID():string{
  let d = Date.now();

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      // tslint:disable-next-line:no-bitwise
      return (c==='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}

export function generateShortUUID():string {
  let d = Date.now();

  const uuid = 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      // tslint:disable-next-line:no-bitwise
      return (c==='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}
