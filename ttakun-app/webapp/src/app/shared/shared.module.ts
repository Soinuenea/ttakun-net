import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule } from 'ng-pick-datetime';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxPaginationModule } from 'ngx-pagination';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AutocompleteFieldComponent } from './components/forms/autocomplete-field/autocomplete-field.component';
import { CheckboxFieldComponent } from './components/forms/checkbox-field/checkbox-field.component';
import { DatepickerFieldComponent } from './components/forms/datepicker-field/datepicker-field.component';
import { FieldErrorsComponent } from './components/forms/field-errors/field-errors.component';
import { FileFieldComponent } from './components/forms/file-field/file-field.component';
import { FileInputComponent } from './components/forms/file-input/file-input.component';
import { InputEmailFieldComponent } from './components/forms/input-email-field/input-email-field.component';
import { InputFieldComponent } from './components/forms/input-field/input-field.component';
import { InputIntegerFieldComponent } from './components/forms/input-integer-field/input-integer-field.component';
import { InputNumberFieldComponent } from './components/forms/input-number-field/input-number-field.component';
import { InputPasswordFieldComponent } from './components/forms/input-password-field/input-password-field.component';
import { InputRangeFieldComponent } from './components/forms/input-range-field/input-range-field.component';
import { InputTextFieldComponent } from './components/forms/input-text-field/input-text-field.component';
import { InputTimeFieldComponent } from './components/forms/input-time-field/input-time-field.component';
import { RadioFieldComponent } from './components/forms/radio-field/radio-field.component';
import { SelectFieldComponent } from './components/forms/select-field/select-field.component';
import { TextareaFieldComponent } from './components/forms/textarea-field/textarea-field.component';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { EditionModalComponent } from './components/modals/edition-modal/edition-modal.component';
import { InfoModalComponent } from './components/modals/info-modal/info-modal.component';
import { SortControlComponent } from './components/sort-control/sort-control.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { TabPaneComponent } from './components/tab-pane/tab-pane.component';
import { FormCellComponent } from './components/tables/form-table/form-cell/form-cell.component';
import { FormColumnComponent } from './components/tables/form-table/form-column/form-column.component';
import { FormTableColumnComponent } from './components/tables/form-table/form-table-column/form-table-column.component';
import { FormTableComponent } from './components/tables/form-table/form-table.component';
import { PaginationComponent } from './components/tables/pagination/pagination.component';
import { ColumnComponent } from './components/tables/sortable-table/column/column.component';
import { SortableCellComponent } from './components/tables/sortable-table/sortable-cell/sortable-cell.component';
import { SortableColumnComponent } from './components/tables/sortable-table/sortable-column/sortable-column.component';
import { SortableTableComponent } from './components/tables/sortable-table/sortable-table.component';
import { IntegerInputDirective } from './directives/integer-input.directive';
import { ScrollHereDirective } from './directives/scroll-here.directive';
import { TitleDirective } from './directives/title.directive';
import { CapitalizeAllPipe } from './pipes/capitalize-all.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { DayDiffPipe } from './pipes/day-diff.pipe';
import { IfEmptyPipe } from './pipes/if-empty.pipe';
import { IntLoopPipe } from './pipes/int-loop.pipe';
import { LocalizedCurrencyPipe } from './pipes/localized-currency.pipe';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';
import { LocalizedNumberPipe } from './pipes/localized-number.pipe';
import { LocalizedPercentPipe } from './pipes/localized-percent.pipe';
import { PercentagePipe } from './pipes/percentage.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    // Components
    AutocompleteFieldComponent,
    CheckboxFieldComponent,
    ColumnComponent,
    ConfirmModalComponent,
    DatepickerFieldComponent,
    EditionModalComponent,
    FieldErrorsComponent,
    FileFieldComponent,
    FileInputComponent,
    FormCellComponent,
    FormColumnComponent,
    FormTableColumnComponent,
    FormTableComponent,
    InfoModalComponent,
    InputEmailFieldComponent,
    InputFieldComponent,
    InputIntegerFieldComponent,
    InputNumberFieldComponent,
    InputPasswordFieldComponent,
    InputTextFieldComponent,
    InputTimeFieldComponent,
    InputRangeFieldComponent,
    PaginationComponent,
    RadioFieldComponent,
    SelectFieldComponent,
    SortableColumnComponent,
    SortableCellComponent,
    SortableTableComponent,
    SortControlComponent,
    SubHeaderComponent,
    TabPaneComponent,
    TextareaFieldComponent,
    // Pipes
    CapitalizePipe,
    CapitalizeAllPipe,
    DayDiffPipe,
    IfEmptyPipe,
    IntLoopPipe,
    LocalizedCurrencyPipe,
    LocalizedDatePipe,
    LocalizedNumberPipe,
    LocalizedPercentPipe,
    PercentagePipe,
    SortPipe,
    TimePipe,
    // Directives
    IntegerInputDirective,
    ScrollHereDirective,
    TitleDirective
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    NgSelectModule,
    NgxPaginationModule,
    NgxSmartModalModule.forChild(),
    OwlDateTimeModule,
    PerfectScrollbarModule,
    PdfViewerModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    DragDropModule
  ],
  exports: [
    // Modules
    CommonModule,
    NgxPaginationModule,
    NgxSmartModalModule,
    OwlDateTimeModule,
    PerfectScrollbarModule,
    PdfViewerModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    // Components
    AutocompleteFieldComponent,
    CheckboxFieldComponent,
    ColumnComponent,
    DatepickerFieldComponent,
    EditionModalComponent,
    FieldErrorsComponent,
    FileFieldComponent,
    FileInputComponent,
    FormTableColumnComponent,
    FormTableComponent,
    InfoModalComponent,
    InputEmailFieldComponent,
    InputIntegerFieldComponent,
    InputNumberFieldComponent,
    InputPasswordFieldComponent,
    InputTextFieldComponent,
    InputTimeFieldComponent,
    InputRangeFieldComponent,
    PaginationComponent,
    RadioFieldComponent,
    SelectFieldComponent,
    SortableTableComponent,
    SortControlComponent,
    SubHeaderComponent,
    TabPaneComponent,
    TextareaFieldComponent,
    ConfirmModalComponent,
    // Pipes
    CapitalizeAllPipe,
    CapitalizePipe,
    DayDiffPipe,
    IfEmptyPipe,
    IntLoopPipe,
    LocalizedCurrencyPipe,
    LocalizedDatePipe,
    LocalizedNumberPipe,
    PercentagePipe,
    SortPipe,
    TimePipe,
    // Directives
    IntegerInputDirective,
    ScrollHereDirective,
    TitleDirective
  ],
  providers: [
    // Pipes
    LocalizedCurrencyPipe,
    LocalizedDatePipe,
    LocalizedNumberPipe,
    LocalizedPercentPipe
  ]
})
export class SharedModule { }
