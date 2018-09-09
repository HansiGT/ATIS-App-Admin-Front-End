import { Component, OnInit, Inject } from '@angular/core';
import { Position } from './position';
import { IdElementDialogComponent } from '../id-element-dialog/id-element-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { LayoutEditorService } from '../layout-editor.service';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';


export interface DialogData {
  id: number;
}


@Component({
  selector: 'app-layout-editor',
  templateUrl: './layout-editor.component.html',
  styleUrls: ['./layout-editor.component.css'],
  providers: [LayoutEditorService]
})
export class LayoutEditorComponent implements OnInit {

  layoutToLoadID = 1;
  layoutToSaveID = 2;
  elementID = 1;
  elementIndex = 0;
  layoutWidth = 100;
  layoutHeight = 100;
  displayingLayoutWidth = 0;
  displayingLayoutHeight = 0;
  layoutAlreadyExist = false;
  unit = 0;
  show = false;
  INDEX = 0;
  elementWidth = 5;
  elementHeight = 5;
  elementType = 'PC';
  elementTypes = ['PC', 'Printer', 'Laptop', 'Room', 'Door'];
  srcElement: HTMLElement;
  tempElement: HTMLElement;
  addedElement: Array<HTMLElement> = new Array<HTMLElement>();

  constructor(private _LayoutEditorService: LayoutEditorService,public dialog: MatDialog) { }

  openDialog(element: HTMLElement): void {
    const dialogRef = this.dialog.open(IdElementDialogComponent, {
      data: {id: this.elementID}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (isNaN(result)) {
        document.getElementById("container").removeChild(element);
      }
      else {
        // There is no element has the same type and id 
        if (document.getElementById(element.id + "," + result) == null) {
          // Auto-increment for id in dialog
          this.elementID = result;
          this.elementID++;

          // Create span to display element's id
          var idSpan = document.createElement('span');
          idSpan.innerHTML = result;
          idSpan.style.verticalAlign = 'top';
          idSpan.style.fontSize = '1vw';
          element.appendChild(idSpan);

          // Set element's id and add it to array
          element.id = element.id + "," + result;
          this.addedElement.push(element);
          this.dragElement(element);
        }
        else {
          var originalBorder = document.getElementById(element.id + "," + result).style.border;
          document.getElementById(element.id + "," + result).style.border = '2px solid red';
          setTimeout(function() {
            document.getElementById(element.id + "," + result).style.border = originalBorder;
          }, 2000);
          document.getElementById("container").removeChild(element);
        }
      }
      
    });
  }

  ngOnInit() {

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
        gridElement.style.border = '1px solid #ACA5A3';
        gridElement.style.display = 'inline-block';
        gridElement.style.cssFloat = 'left';
        document.getElementById("layout").appendChild(gridElement);
      }
    }

    var container = <HTMLElement> document.getElementById('container');
    for (let  i = this.addedElement.length - 1; i >= 0; i--) {
      if (this.outOfBound(this.addedElement[i])) {
        container.removeChild(this.addedElement[i]);
        this.addedElement.splice(i,1);
      }
    }
  }

  loadExistedLayout() {
    this.createGridLayout();
    var container = <HTMLElement> document.getElementById('container');
    for (let  i = this.addedElement.length - 1; i >= 0; i--) {
      container.removeChild(this.addedElement[i]);
      this.addedElement.splice(i,1);
    }

    this._LayoutEditorService.getLayout(this.layoutToLoadID)
    .subscribe(res => {
      var container = <HTMLElement> document.getElementById('container');
      var firstElementRect = document.getElementById("gridElement00").getBoundingClientRect();

      // Load pool's rooms to layout
      var rooms = res['rooms'];
      rooms.forEach(room => {
        var element = <HTMLElement> document.createElement('div');
        element.style.position = "absolute";
        element.style.top = room.pos[0].y*5 + firstElementRect.top + window.scrollY  + 'px';
        element.style.left = room.pos[0].x*5 + firstElementRect.left - container.getBoundingClientRect().left + 'px';
        element.style.width = (room.pos[1].x - room.pos[0].x)*5 - 2 + 'px';
        element.style.height = (room.pos[3].y - room.pos[0].y)*5 - 2 + 'px';
        element.style.background = 'transparent';
        element.style.outline = '2px solid blue';
        element.id = "Room" + "," + room.id;
        container.appendChild(element);
        this.autofit(element);
        this.addedElement.push(element);
        this.dragElement(element);

        // Load room's door
        room.portalGates.forEach(door => {
          var element = <HTMLElement> document.createElement('div');
          element.style.position = "absolute";
          element.style.top = door.pos[0].y*5 + firstElementRect.top + window.scrollY  + 'px';
          element.style.left = door.pos[0].x*5 + firstElementRect.left - container.getBoundingClientRect().left + 'px';
          if (door.pos[0].x == door.pos[1].x) {
            element.style.width = '10px';
            element.style.height = (door.pos[1].y - door.pos[0].y)*5 - 2 + 'px';
          }
          else {
            element.style.height = '10px';
            element.style.width = (door.pos[1].x - door.pos[0].x)*5 - 2 + 'px';
          }
          element.style.background = '#1e90ff';
          element.id = "Door" + "," + door.id;
          container.appendChild(element);
          this.autofit(element);
          this.addedElement.push(element);
          this.dragElement(element);
        });

      });

      // Load pool's elements to layout
      var poolElements = res['poolElements'];
      poolElements.forEach(poolElement => {
        var element = <HTMLElement> document.createElement('div');
        element.style.position = "absolute";
        element.style.top = poolElement.pos.y*5 + firstElementRect.top + window.scrollY  + 'px';
        element.style.left = poolElement.pos.x*5 + firstElementRect.left - container.getBoundingClientRect().left + 'px';
        element.style.width = poolElement.width*5 - 2 + 'px';
        element.style.height = poolElement.length*5 - 2 + 'px';
        switch (poolElement.type) {
          case "PC":
            element.style.background = "url('assets/img/current-utilization-icons/win_free.svg')";
            break;
          case "Laptop":
            element.style.background = "url('assets/img/current-utilization-icons/laptop.png')";
            break;
          case "Printer":
            element.style.background = "url('assets/img/current-utilization-icons/printer.svg')";
            break;
          case "Room":
            element.style.background = 'transparent';
            element.style.outline = '2px solid blue';
             break;
          case "Door":
            element.style.background = '#1e90ff';
            break;
          default:
        }
        element.style.backgroundSize = 'contain';
        element.id = poolElement.type + "," + poolElement.id;

        // Create span to display element's id
        var idSpan = document.createElement('span');
        idSpan.innerHTML = poolElement.id;
        idSpan.style.verticalAlign = 'top';
        idSpan.style.fontSize = '1vw';
        element.appendChild(idSpan);

        container.appendChild(element);
        this.autofit(element);
        this.addedElement.push(element);
        this.dragElement(element);
      });

      });
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
        case "Room":
            tempElement.style.background = 'transparent';
            tempElement.style.outline = '2px solid blue';
            break;
        case "Door":
            tempElement.style.background = '#1e90ff';
            break;
        default:
    }
    tempElement.style.backgroundSize = 'contain';
   }

  onDragStart(event: PointerEvent): void {
     this.srcElement = <HTMLElement> event.srcElement;
     this.tempElement = <HTMLElement> this.srcElement.cloneNode(true);
     this.tempElement.style.position = 'absolute';
     document.getElementById('container').appendChild(this.tempElement);
   }

   onDragMove(event: PointerEvent): void {
     this.tempElement.style.top = event.clientY + window.scrollY - 10  + 'px';
     this.tempElement.style.left = event.clientX + window.scrollX - document.getElementById('container').getBoundingClientRect().left - 10  + 'px';
   }

   onDragEnd(event: PointerEvent, srcElement: any): void {
     var element = <HTMLElement> document.createElement('div');
     var container = <HTMLElement> document.getElementById('container');
     container.removeChild(this.tempElement);
     element.style.position = "absolute";
     element.style.background = "black";
     element.style.top = event.clientY + window.scrollY  + 'px';
     element.style.left = event.clientX + window.scrollX - container.getBoundingClientRect().left  + 'px';
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
         case '0% 0% / contain transparent':
             type = 'Room';
             element.style.outline = '2px solid blue';
             break;
          case '0% 0% / contain rgb(30, 144, 255)':
             type = 'Door';
             break;
         default:
     }
     element.id = type;

     // The element must first be appended into the container, so that its getBoundingClientRect
     // will be set
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
       }
     }

   }




   save() {
     var json = {"poolElements":[],"rooms":[{"pos":[{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0},{"x":0,"y":0}],"portalGates":[],"id":0}]};
     var firstElementRect = document.getElementById("gridElement00").getBoundingClientRect();
     for (let i=0; i < this.addedElement.length; i++) {
      var iRect = this.addedElement[i].getBoundingClientRect();
      var elementType = this.addedElement[i].id.slice(0,this.addedElement[i].id.indexOf(","));
      var elementID = this.addedElement[i].id.slice(this.addedElement[i].id.indexOf(",") + 1, this.addedElement[i].id.length);

      if (elementType.includes("Door")) {
        if (this.addedElement[i].offsetWidth > this.addedElement[i].offsetHeight) {
          json['rooms'][0].portalGates.push(JSON.parse(
                        '{"pos":[{"x":' + Math.round((iRect.left - firstElementRect.left)/10)*2 + ',"y":' + Math.round((iRect.top - firstElementRect.top)/10)*2 
                      + '},{"x":' + Math.round((iRect.left - firstElementRect.left + this.addedElement[i].offsetWidth)/10)*2 
                      + ',"y":'   + Math.round((iRect.top - firstElementRect.top)/10)*2 
                      + '}],"type":"' + "door" + '"}'));
        }
        else {
          json['rooms'][0].portalGates.push(JSON.parse(
                        '{"pos":[{"x":' + Math.round((iRect.left - firstElementRect.left)/10)*2 + ',"y":' + Math.round((iRect.top - firstElementRect.top)/10)*2 
                      + '},{"x":' + Math.round((iRect.left - firstElementRect.left)/10)*2
                      + ',"y":'   + Math.round((iRect.top - firstElementRect.top + this.addedElement[i].offsetHeight)/10)*2
                      + '}],"type":"' + "door" + '"}'));
        }
      }
      else if (elementType.includes("Room")) {
        json['rooms'].push(JSON.parse(
                         '{"pos":[{"x":' + Math.round((iRect.left - firstElementRect.left)/10)*2 + ',"y":' + Math.round((iRect.top - firstElementRect.top)/10)*2 
                       + '},{"x":'  + Math.round((iRect.right - firstElementRect.left)/10)*2 + ',"y":' + Math.round((iRect.top - firstElementRect.top)/10)*2
                       + '},{"x":'  + Math.round((iRect.right - firstElementRect.left)/10)*2 + ',"y":' + Math.round((iRect.bottom - firstElementRect.top)/10)*2
                       + '},{"x":'  + Math.round((iRect.left - firstElementRect.left)/10)*2 + ',"y":' + Math.round((iRect.bottom - firstElementRect.top)/10)*2 
                       + '}],"id":' + elementID +"}"));
      }
      else {
        json['poolElements'].push(JSON.parse(
                      '{"pos":{"x":' + Math.round((iRect.left - firstElementRect.left)/10)*2 + ',"y":' + Math.round((iRect.top - firstElementRect.top)/10)*2 
                    + '},"width":' + Math.round(this.addedElement[i].offsetWidth/10)
                    + ',"length":' + Math.round(this.addedElement[i].offsetHeight/10)
                    + ',"id":' +  elementID
                    + ',"type":"' + elementType + '"}'));
      }
     }
     console.log(JSON.stringify(json));
    this._LayoutEditorService.putLayout(this.layoutToSaveID,json).subscribe((data:any) => {console.log(data)});
   }

   // A helper method to check if 2 element are overlapped each other
   overlapped(element1: Element, element2: Element) {
     if (element1.id.includes("Room") || element2.id.includes("Room") ) {
       return false;
     }
     else {
      var rect1 = element1.getBoundingClientRect();
      var rect2 = element2.getBoundingClientRect();
      return !(rect1.right < rect2.left ||
                 rect1.left > rect2.right ||
                 rect1.bottom < rect2.top ||
                 rect1.top > rect2.bottom)
     }
   }

   outOfBound(element: HTMLElement) {
     var rect = element.getBoundingClientRect();
     var layout = document.getElementById("layout").getBoundingClientRect();
     return (rect.left < layout.left || rect.top < layout.top || rect.right > layout.right || rect.bottom > layout.bottom);
   }

   autofit(element: HTMLElement) {
     var firstElementRect = document.getElementById("gridElement00").getBoundingClientRect();
     var elementRect = element.getBoundingClientRect();
     element.style.left = firstElementRect.left - document.getElementById("container").getBoundingClientRect().left  
                          + Math.round((elementRect.left - firstElementRect.left)/10)*10 + 1 + 'px';
     element.style.top = firstElementRect.top + window.scrollY + Math.round((element.offsetTop -  window.scrollY - firstElementRect.top)/10)*10 + 1 + 'px';
   }


  dragElement(elmnt) {
    var originTop = elmnt.style.top;
    var originLeft = elmnt.style.left;
    var addedElement = this.addedElement;
    var autof = this.autofit;

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
        document.getElementById("container").removeChild(elmnt);
        addedElement.splice(addedElement.indexOf(elmnt),1);
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
