import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Observable, Subscription} from "rxjs";
import {DataModel} from "../../models/data.model";
import {MatDialog} from "@angular/material/dialog";
import {AddEditComponent} from "../../components/add-edit/add-edit.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  items!: DataModel[];
  subscription$ = new Subscription()
  constructor(
    private dataService: DataService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.subscription$.add(
      this.dataService.currentData.subscribe(data => {
        this.items = data
      }))
    this.subscription$.add(this.dataService.getData().subscribe(data => {
        if (this.items.length === 0) {
          this.dataService.setCurrentData(data)
        }
      })
    )

  }

  trackByItems(index: number, item: any): number {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  deleteItem(event: DataModel) {
    console.log(event)
    this.dataService.deleteData(event.id)

  }

  editItem($event: DataModel) {
    const data={
      ...$event,
      title: 'Edit Item'
    }
    const dialogRef = this.dialog.open(AddEditComponent,{
      width: '500px',
      height: '400px',
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.updateData(result)
      }
    });
  }
}
