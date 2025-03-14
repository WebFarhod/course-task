export interface ICourse {
  _id: string;
  image?: string;
  title: string;
  price: number;
  isActive: boolean;
}

export interface IAddCourse {
  image?: string;
  title: string;
  price: number;
}

export interface IEditCourse {
  image?: string;
  title: string;
  isActive: boolean;
  price: number;
  courseId: string;
}
