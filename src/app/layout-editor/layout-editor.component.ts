import { Component, OnInit, Inject } from '@angular/core';
import { Position } from './position';
import { IdElementDialogComponent } from '../id-element-dialog/id-element-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  id: number;
}


@Component({
  selector: 'app-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.css']
})
export class LayoutEditorComponent implements OnInit {

  elementID = 0;
  elementIndex = 0;
  layoutWidth = 0;
  layoutHeight = 0;
  displayingLayoutWidth = 0;
  displayingLayoutHeight = 0;
  layoutAlreadyExist = false;
  unit = 0;
  show = false;
  INDEX = 0;
  elementWidth = 0;
  elementHeight = 0;
  elementType = '';
  elementTypes = ['PC', 'Printer', 'Laptop', 'Wall', 'Door'];
  srcElement: Element;
  addedElement: Array<HTMLElement> = new Array<HTMLElement>();

  constructor(public dialog: MatDialog) { }

  openDialog(element: HTMLElement): void {
    const dialogRef = this.dialog.open(IdElementDialogComponent, {
      data: {id: this.elementID}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.elementID = result;
      element.id = element.id + result;
    });
  }

  ngOnInit() {
    // document.getElementById("layout").style.width = 0.8*screen.width + 82 + 'px';
    // document.getElementById("layout").style.height = 0.8*screen.width+ 'px';
    // document.getElementById("element").style.height = 0.8*screen.width + 'px';
  }

  createGridLayout() {
    if (this.layoutAlreadyExist) {
      for (var i = 0; i < this.displayingLayoutHeight; i++)
        for (var j = 0; j < this.displayingLayoutWidth; j++)
          document.getElementById("layout").removeChild(document.getElementById("gridElement" + i + '' + j));
    }
    this.displayingLayoutHeight = this.layoutHeight;
    this.displayingLayoutWidth = this.layoutWidth;
    this.show = true;
    this.layoutAlreadyExist = true;
    document.getElementById("layout").style.width = this.layoutWidth*10 + "px";
    document.getElementById("layout").style.height = this.layoutHeight*10 + "px";
    for (var i = 0; i < this.layoutHeight; i++) {
      for (var j = 0; j < this.layoutWidth; j++) {
        var gridElement = document.createElement('div');
        gridElement.id = "gridElement" + i + '' + j;
        gridElement.style.width = 10 + 'px';
        gridElement.style.height = 10 + 'px';
        gridElement.style.border = '1px solid #000';
        gridElement.style.display = 'inline-block'
        gridElement.style.cssFloat = 'left';
        document.getElementById("layout").appendChild(gridElement);
      }
    }

    for (let  i = this.addedElement.length - 1; i >= 0; i--) {
      if (this.outOfBound(this.addedElement[i])) {
        var container = <HTMLElement> document.getElementById('container');
        container.removeChild(document.getElementById(this.addedElement[i].id));
        this.addedElement.splice(i,1);
      }
    }
  }

  onDragStart(event: PointerEvent): void {
     this.srcElement = event.srcElement;
   }

   onDragMove(event: PointerEvent): void {
     // console.log(`got drag move ${Math.round(event.clientX)} ${Math.round(event.clientY)}`);
   }

   onDragEnd(event: PointerEvent, srcElement: any): void {
     var element = <HTMLElement> document.createElement('div');
     element.style.position = "absolute";
     element.style.background = "black";
     element.style.top = event.clientY + window.scrollY  + 'px';
     element.style.left = event.clientX + window.scrollX + 'px';
     element.style.width = srcElement.clientWidth + 'px';
     element.style.height = srcElement.clientHeight + 'px';
     element.style.background = srcElement.style.background;
     element.style.backgroundSize = 'contain';

     //Set ID for element
     var type = '';
     switch (element.style.background) {
         case 'url("assets/img/current-utilization-icons/win_free.svg") 0% 0% / contain':
             type = 'PC';
             break;
         case 'url("assets/img/current-utilization-icons/laptop.png") 0% 0% / contain':
             type = 'Laptop';
             break;
         case 'url("assets/img/current-utilization-icons/printer.svg") 0% 0% / contain':
             type = 'Printer';
             break;
         case '0% 0% / contain black':
             type = 'Wall';
             break;
         default:
     }
     element.id = type;

     var container = <HTMLElement> document.getElementById('container');
     container.appendChild(element);
     this.autofit(element);

     if (this.outOfBound(element)) {
        alert('Out of bound!');
        container.removeChild(element);
     }
     else {
       // Check if the new element is overlapped the others
       // If yes, the new element will not be added
       var overlapped = false;
       for (let i=0; i < this.addedElement.length; i++){
         overlapped = overlapped || this.overlapped(element, this.addedElement[i]);
       }
       if (overlapped) {
         container.removeChild(element);
         alert('Element überschnitten!');
       }
       else {
         this.openDialog(element);
         this.addedElement.push(element);
         this.dragElement(element);
       }
     }

   }

   createElement() {
    var tempElement = document.getElementById('element' + this.INDEX++);
    tempElement.style.width = this.elementWidth*10 + 'px';
    tempElement.style.height = this.elementHeight*10 + 'px';
    tempElement.style.marginTop = '10px';
    tempElement.style.marginLeft = '10px';
    tempElement.style.border = '1px solid black';
    switch (this.elementType) {
        case "PC":
            tempElement.style.background = "url('assets/img/current-utilization-icons/win_free.svg')";
            break;
        case "Laptop":
            tempElement.style.background = "url('assets/img/current-utilization-icons/laptop.png')";
            break;
        case "Printer":
            tempElement.style.background = "url('assets/img/current-utilization-icons/printer.svg')";
            break;
        case "Wall":
            tempElement.style.background = 'black';
            break;
        default:
    }
    tempElement.style.backgroundSize = 'contain';
   }

   save() {
     var firstElementRect = document.getElementById("gridElement00").getBoundingClientRect();
     for (let i=0; i < this.addedElement.length; i++) {
       var type = '';
       switch (this.addedElement[i].style.background) {
           case 'url("assets/img/current-utilization-icons/win_free.svg") 0% 0% / contain':
               type = 'PC';
               break;
           case 'url("assets/img/current-utilization-icons/laptop.svg") 0% 0% / contain':
               type = 'Laptop';
               break;
           case 'url("assets/img/current-utilization-icons/printer.svg") 0% 0% / contain':
               type = 'Printer';
               break;
           case '0% 0% / contain black':
               type = 'Wall';
               break;
           default:
       }

       console.log(Math.round((this.addedElement[i].getBoundingClientRect().left - firstElementRect.left)/10) + ', '
                 + Math.round((this.addedElement[i].getBoundingClientRect().top - firstElementRect.top)/10) + ', '
                 + Math.round(this.addedElement[i].offsetWidth/10) + ', '
                 + Math.round(this.addedElement[i].offsetHeight/10) + ', ' + this.addedElement[i].id);
     }
   }

   // A helper method to check if 2 element are overlapped each other
   overlapped(element1: Element, element2: Element) {
     var rect1 = element1.getBoundingClientRect();
     var rect2 = element2.getBoundingClientRect();
     return !(rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom)
   }

   outOfBound(element: HTMLElement) {
     var rect = element.getBoundingClientRect();
     var layout = document.getElementById("layout").getBoundingClientRect();
     return (rect.left < layout.left || rect.top < layout.top || rect.right > layout.right || rect.bottom > layout.bottom);
   }

   autofit(element: HTMLElement) {
     var firstElementRect = document.getElementById("gridElement00").getBoundingClientRect();
     element.style.left = firstElementRect.left + Math.round((element.offsetLeft  - firstElementRect.left)/10)*10 + 1 + 'px';
     element.style.top = firstElementRect.top + window.scrollY + Math.round((element.offsetTop -  window.scrollY - firstElementRect.top)/10)*10 + 1 + 'px';
   }


  dragElement(elmnt) {
    var originTop = elmnt.style.top;
    var originLeft = elmnt.style.left;
    var addedElement = this.addedElement;
    var autof = function (element: HTMLElement) {
      var firstElementRect = document.getElementById("gridElement00").getBoundingClientRect();
      element.style.left = firstElementRect.left + Math.round((element.offsetLeft  - firstElementRect.left)/10)*10 + 1 + 'px';
      element.style.top = firstElementRect.top + window.scrollY + Math.round((element.offsetTop -  window.scrollY - firstElementRect.top)/10)*10 + 1 + 'px';
    };

    var checkOverlap = this.overlapped;
    var checkOutOfBound = this.outOfBound;

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

   function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
      autof(elmnt);

      if (checkOutOfBound(elmnt)) {
        alert('Element out of bound');
        elmnt.style.top = originTop;
        elmnt.style.left = originLeft;
      }
      else {
        // Check if the element which is moving is overlapped the others
        // If yes, the new element will not be added
        var overlapped = false;
        for (let i=0; i < addedElement.length; i++){
          if (elmnt !== addedElement[i]) {
            overlapped = overlapped || checkOverlap(elmnt, addedElement[i]);
          }
        }
        if (overlapped) {
          alert('Element überschnitten!');
          elmnt.style.top = originTop;
          elmnt.style.left = originLeft;
        }
        else {
          originTop = elmnt.style.top;
          originLeft = elmnt.style.left;
        }
      }

  }



 }
}
