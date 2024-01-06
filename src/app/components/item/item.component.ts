import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {DataModel} from "../../models/data.model";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() item!: DataModel;
  @Input() index!: number;
  @Output() deleteItem =new EventEmitter<DataModel>()
  @Output() editItem =new EventEmitter<DataModel>()

  delete(item: DataModel) {
    this.deleteItem.emit(item)
  }

  edit(item: DataModel) {
    this.editItem.emit(item)
  }
}
