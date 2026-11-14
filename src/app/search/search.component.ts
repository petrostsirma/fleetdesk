import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import recordsData from '../../assets/records.json';
import driversData from '../../assets/drivers.json';
import { Vehicle, VehicleService } from '../vehicle.service';

export interface Driver { id: number | string; fullName: string; }
export interface VehicleRecord { serialNumber: string; fullName: string; driverId: number | string; plate: string; issueDate: string; isApproved: boolean; tierAmount: number; registrationAmount: number; consumptionAmount: number; rewardAmount: number; }
interface SearchCriteria { serialNumber: string; driver: string | number | null; dateRange: { start: Date | null; end: Date | null }; status: string; }

@Component({ selector: 'app-search', templateUrl: './search.component.html', styleUrls: ['./search.component.css'], standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, PercentPipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatChipsModule, MatPaginatorModule] })
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  readonly records: VehicleRecord[] = recordsData;
  readonly drivers: Driver[] = driversData;
  readonly displayedColumns = ['serialNumber', 'fullName', 'issueDate', 'isApproved', 'tierAmount', 'registrationAmount', 'consumptionAmount', 'rewardAmount'];
  readonly dataSource = new MatTableDataSource<VehicleRecord>([]);
  searchForm: FormGroup;
  selectedVehicle: Vehicle | null = null;
  vehicleRecords: VehicleRecord[] = [];
  filteredRecords: VehicleRecord[] = [];
  applied = false;
  private selectedSubscription?: Subscription;
  constructor(private readonly fb: FormBuilder, private readonly vehicleService: VehicleService) {
    this.searchForm = this.fb.group({ serialNumber: [''], driver: [''], dateRange: this.fb.group({ start: [null], end: [null] }), status: ['all'] });
  }
  get dateRangeForm(): FormGroup { return this.searchForm.get('dateRange') as FormGroup; }
  ngAfterViewInit(): void { this.dataSource.paginator = this.paginator; }
  ngOnInit(): void {
    this.selectedSubscription = this.vehicleService.selectedVehicle$.subscribe(vehicle => {
      this.selectedVehicle = vehicle;
      this.searchForm.reset({ serialNumber: '', driver: '', dateRange: { start: null, end: null }, status: 'all' });
      this.applied = false;
      this.vehicleRecords = vehicle ? this.records.filter(record => record.plate === vehicle.plate) : [];
      this.filteredRecords = [...this.vehicleRecords];
      this.dataSource.data = this.filteredRecords;
      this.paginator?.firstPage();
    });
  }
  ngOnDestroy(): void { this.selectedSubscription?.unsubscribe(); }
  onSearch(): void {
    const criteria = this.searchForm.getRawValue() as SearchCriteria;
    const serial = String(criteria.serialNumber ?? '').trim().toLowerCase();
    const driverId = criteria.driver === '' || criteria.driver == null ? null : String(criteria.driver);
    const start = this.dateKey(criteria.dateRange?.start);
    const end = this.dateKey(criteria.dateRange?.end);
    this.filteredRecords = this.vehicleRecords.filter(record => {
      const issueKey = this.issueDateKey(record.issueDate);
      return (!serial || record.serialNumber.toLowerCase().includes(serial)) &&
        (driverId === null || String(record.driverId) === driverId) &&
        (criteria.status === 'all' || (criteria.status === 'approved' ? record.isApproved : !record.isApproved)) &&
        (!start || issueKey >= start) && (!end || issueKey <= end);
    });
    this.applied = true;
    this.dataSource.data = this.filteredRecords;
    this.paginator?.firstPage();
  }
  clearFilters(): void {
    this.searchForm.reset({ serialNumber: '', driver: '', dateRange: { start: null, end: null }, status: 'all' });
    this.filteredRecords = [...this.vehicleRecords]; this.dataSource.data = this.filteredRecords; this.applied = false; this.paginator?.firstPage();
  }
  formatDate(value: string): Date | null {
    const key = this.issueDateKey(value);
    return key ? new Date(Number(key.slice(0, 4)), Number(key.slice(4, 6)) - 1, Number(key.slice(6, 8))) : null;
  }
  private issueDateKey(value: string): string { return /^\d{8}$/.test(value) ? value : ''; }
  private dateKey(value: Date | string | null): string {
    if (!value) return '';
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  }
}









