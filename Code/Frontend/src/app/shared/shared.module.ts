import { SafePipe } from './pipe/safe.pipe';
import { EditorTableCreatePopupComponent } from './components/editor/editor-table-create-popup/editor-table-create-popup.component';
import { EditorComponent } from './components/editor/editor.component';
import { PrintButtonComponent } from './components/print-button/print-button.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MatTreeModule } from '@angular/material/tree';

import { TableComponent } from './components/table/table.component';
import { UploadComponent } from './components/upload/upload.component';
import { TextmaskComponent } from './components/textmask/textmask.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ValidationerrorotherComponent } from './components/validationerrorother/validationerrorother.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TextboxComponent } from './components/textbox/textbox.component';
import { ValidationErrorPipe } from './pipe/validationerror.pipe';
import { ValidationErrorOtherPipe } from './pipe/validationerrorother.pipe';
import { TextareaComponent } from './components/textarea/textarea.component';
import { CallbackPipe } from './pipe/callback.pipe';
import { AutosizeModule } from 'ngx-autosize';
import { TextMaskModule } from 'angular2-text-mask';
import { TextboxnumericComponent } from './components/textboxnumeric/textboxnumeric.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatetimepickerComponent } from './components/datetimepicker/datetimepicker.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MaterialModule } from './material.module';
import { ResizeColumnDirective } from './directive/resize-column.directive';
import { TableExpandedComponent } from './components/table-expanded/table-expanded.component';
import { TreeComponent } from './components/tree/tree.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { TextboxSearchTableComponent } from './components/textbox-search-table/textbox-search-table.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SafeUrlPipe } from './pipe/safe-url.pipe';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { AddComponent } from './components/select/add/add.component';
import { FormatNumberDirective } from './directive/format-number.directive';
import { DigitOnlyDirective } from './directive/digit-only.directive';
import { OpenOnKeyUpDirective } from './directive/open-on-keyup.directive';
import { TextboxDoubleComponent } from './components/textbox-double/textbox-double.component';
import { MoneyComponent } from './components/money/money.component';
@NgModule({
    exports: [
        CommonModule,
        ValidationErrorPipe,
        ValidationErrorOtherPipe,
        CallbackPipe,
        SafePipe,
        SafeUrlPipe,
        FormatNumberDirective,
        TextboxComponent,
        TextareaComponent,
        RadioComponent,
        CheckboxComponent,
        SelectComponent,
        ConfirmComponent,
        ValidationerrorotherComponent,
        DatepickerComponent,
        TextmaskComponent,
        TextboxnumericComponent,
        LoadingComponent,
        UploadComponent,
        TimepickerComponent,
        TableComponent,
        DatetimepickerComponent,
        TableExpandedComponent,
        TreeComponent,
        SnackbarComponent,
        PrintButtonComponent,
        AutocompleteComponent,
        EditorComponent,
        TextboxSearchTableComponent,
        EditorTableCreatePopupComponent,
        ImageViewerComponent,
        AddComponent,
        DigitOnlyDirective,
        OpenOnKeyUpDirective,
        TextboxDoubleComponent,
        MoneyComponent
    ],
    imports: [
        MaterialModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatTreeModule,

        AutosizeModule,
        TextMaskModule,
        NgxMatSelectSearchModule,
        MatPaginatorModule,
        NgxMatTimepickerModule,
        DragDropModule,
        NgScrollbarModule,
        AngularEditorModule
    ],
    declarations: [
        ValidationErrorPipe,
        ValidationErrorOtherPipe,
        CallbackPipe,
        SafePipe,
        SafeUrlPipe,
        TextboxComponent,
        TextareaComponent,
        RadioComponent,
        CheckboxComponent,
        SelectComponent,
        ConfirmComponent,
        ValidationerrorotherComponent,
        DatepickerComponent,
        TextmaskComponent,
        TextboxnumericComponent,
        LoadingComponent,
        UploadComponent,
        TimepickerComponent,
        TableComponent,
        DatetimepickerComponent,
        TableExpandedComponent,
        TreeComponent,
        SnackbarComponent,
        PrintButtonComponent,
        TextboxSearchTableComponent,
        AutocompleteComponent,
        EditorComponent,
        ResizeColumnDirective,
        EditorTableCreatePopupComponent,
        ImageViewerComponent,
        AddComponent,
        FormatNumberDirective,
        DigitOnlyDirective,
        OpenOnKeyUpDirective,
        TextboxDoubleComponent,
        MoneyComponent
    ]
})
export class SharedModule { }
