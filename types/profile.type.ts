export interface IProfile {
  _id: string;
  name: {
    english: string;
    bangla: string;
  };
  specializedIn: string;
  shortDescription: string;
  longDescription: string;
  educationalQualification: string[];
  profileImage?: string;
  profileImagePublicId?: string;
  contactNumbers: {
    number: string;
    isPrimary: boolean;
  }[];
  chamber: {
    name: string;
    location: string;
    designation: string;
    isPrimary: boolean;
  }[];
  chamberTime: string;
  appointmentTime: string;
  onlineConsultancyTime: string;
  specialTrainings: string[];
  specializations: string[];
  stats: {
    serviceProvided: number;
    yearsOfExperience: number;
    criticalProblemSolved: number;
    professionalTraining: number;
  };
  socialLinks: {
    name: string;
    url: string;
  }[];
}