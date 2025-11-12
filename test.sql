create table department(
  dept_id int primary key,
  dept_name varchar(50) not null
);

create table doctors(
  doctor_id int primary key,
  name varchar(100) not null,
  phone varchar(15),
  specialization varchar(100),
  dept_id int,
  foreign key (dept_id) references department(dept_id)
);

create table patients(
  patient_id int primary key,
  name varchar(100) not null,
  birth_date date,
  phone varchar(15),
  address varchar(255),
  dept_id int,
  foreign key (dept_id) references department(dept_id)
);

create table appointments(
  appointments_id int primary key,
  appointments_date date not null,
  appointments_time time not null,
  patient_id int,
  doctor_id int,
  foreign key (patient_id) references patients(patient_id),
  foreign key (doctor_id) references doctors(doctor_id)
);

create table treatments(
  treatment_id int primary key,
  name varchar(100) not null,
  cost decimal(10,2) not null
);

create table patient_treatments(
  patient_id int,
  treatment_id int,
  date_given date not null,
  primary key (patient_id, treatment_id, date_given),
  foreign key (patient_id) references patients(patient_id),
  foreign key (treatment_id) references treatments(treatment_id)  
);