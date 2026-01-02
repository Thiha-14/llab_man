
export enum UserRole {
  MASTER = 'Master',
  CONFIGURATOR = 'Configurator',
  USER = 'User'
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  SUSPENDED = 'Suspended'
}

export enum ScheduleType {
  OPERATION = 'Operation',
  MAINTENANCE = 'Maintenance'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  email: string;
  phone: string;
  registrationDate: string;
  effectiveFrom: string;
  effectiveTo: string;
  status: UserStatus;
  role: UserRole;
}

export interface Lab {
  id: string;
  name: string;
  description: string;
  location: string;
  features: string[];
  media: MediaItem[];
}

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
  uploadProgress: number;
}

export interface Equipment {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  procurementDate: string;
  invoiceNumber: string;
  lastCalibrationDate: string;
  nextCalibrationDate: string;
  calibrationFrequency: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'National' | 'Cultural' | 'Weekend' | 'School';
  description?: string;
}

export interface Group {
  id: string;
  name: string;
  userIds: string[];
}

export interface Allowance {
  id: string;
  labId: string;
  machineId: string;
  effectiveFrom: string;
  effectiveTo: string;
  minUsers: number;
  maxUsers: number;
}
