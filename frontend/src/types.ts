export interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  membershipType: string;
  membershipStartDate: string; // Use Date if you want to parse it as a Date object
  active: boolean;
  createdAt: string; // Use Date if you want to parse it as a Date object
  updatedAt: string; // Use Date if you want to parse it as a Date object
  __v: number;
}

export interface Locker {
  _id: string
  lockerNumber: string
  section: string
  isTaken: boolean
  createdAt: string
  updatedAt: string
}
