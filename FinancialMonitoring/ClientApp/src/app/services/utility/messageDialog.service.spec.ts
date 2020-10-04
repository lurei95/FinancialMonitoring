import { MatDialogRef } from '@angular/material/dialog/typings/dialog-ref';
import { DialogResult } from './../../components/utility/message-dialog/dialogResult';
import { DialogInformation } from './../../components/utility/message-dialog/dialogInformation';
import { MessageDialogComponent } from './../../components/utility/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material';
import { MessageDialogService } from './messageDialog.service';
import { of } from 'rxjs';

describe('MessageDialogService', () => 
{
  let service : MessageDialogService;
  let dialog: MatDialog = { open(a: any, b: any) {}} as MatDialog;
  let ref: MatDialogRef<any> = { afterClosed() { return of(DialogResult.No)} } as MatDialogRef<any>;
  let spy: jasmine.Spy;

  beforeEach(() => 
  {
    spy = spyOn(dialog, "open").and.returnValue(ref);
    service = new MessageDialogService(dialog);
  })

  it("does show message dialog", async () => 
  {
    let wasCalled: boolean = false;
    let data = new DialogInformation("text", "title", [DialogResult.Yes, DialogResult.No]);

    service.execute("title", "text", [DialogResult.Yes, DialogResult.No], (result => {
      wasCalled = true;
      expect(result).toBe(DialogResult.No);
    }));
    let args = spy.calls.first().args;

    expect(wasCalled).toBe(true);
    expect(args[0]).toBe(MessageDialogComponent);
    expect(args[1]).toMatchObject({ data: data, disableClose: true });
  })
});
