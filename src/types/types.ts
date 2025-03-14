export interface Blogs  {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
};


export interface FoodList {
 _id:          string;
 availability: string;
 category:     string;
 description:  string;
 id:           number;
 image:        string;
 ingredients?: string[];
 name:         string;
 price:        string;
}



export interface Product {
 _id:             string;
 availableColors: string[];
 category:        string;
 imageUrls:       string[];
 includedItems:  string[];
 manufacturer:    string;
 price:           number;
 productName:     string;
 quantity:        number;
 specifications:  Specifications;
}

export interface Specifications {
 color?:        string;
 gender?:       string;
 graphics?:     string;
 maxFrameRate?: string;
 processor?:    string;
 resolution?:   string;
 size?:         string;
 storage?:      string;
 type?:         string;
}



export interface RootObject {
 employees: Employee[];
}

export interface Employee {
 __v:        number;
 _id:        string;
 department: string;
 employeeId: string;
 name:       string;
 position:   string;
 qrCode:     string;
 timeLogs:   TimeLog[];
}

export interface TimeLog {
 _id:        string;
 date:       Date;
 timeIn:     Date;
 timeOut:    Date;
 totalHours: number;
}




