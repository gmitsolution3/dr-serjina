export interface IAppointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  age: number;
  gender: "male" | "female" | "other";
  address: string;
  consultancyMethod: "online" | "offline";
  disease: string;
  appointmentDate: string;
  createdAt: string;
  updatedAt: string;
}