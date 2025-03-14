export interface IStudent {
  _id: string;
  firstname: string;
  lastname: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAddStudent {
  firstname: string;
  lastname: string;
  phone: string;
}

export interface IEditStudent {
  firstname: string;
  lastname: string;
  phone: string;
  isActive: boolean;
  studentId: string;
}
