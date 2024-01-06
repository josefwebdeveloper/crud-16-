export interface DataModel {
  id: number;
  name: string;
  description: string;
  index?: number;
}

export interface DialogData extends DataModel {
  title: string;

}
