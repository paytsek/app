
# PayTsek

API for PayTsek version 1.0.0

## Indices

* [Auth](#auth)

  * [Get Auth user](#1-get-auth-user)
  * [Login a user](#2-login-a-user)
  * [Register a user](#3-register-a-user)

* [Companies](#companies)

  * [Create x-company-tenant](#1-create-x-company-tenant)
  * [Get all companies](#2-get-all-companies)
  * [Get company tenant](#3-get-company-tenant)
  * [Get single company by id](#4-get-single-company-by-id)

* [Company Name](#company-name)

  * [Create Company Name](#1-create-company-name)
  * [Delete a company by id](#2-delete-a-company-by-id)
  * [Update company name](#3-update-company-name)

* [Company Settings](#company-settings)

  * [Create a company setting](#1-create-a-company-setting)
  * [Delete a company setting](#2-delete-a-company-setting)
  * [Update company setting](#3-update-company-setting)

* [Compensation](#compensation)

  * [Create employee's compensation](#1-create-employee's-compensation)
  * [Delete employee's compensation](#2-delete-employee's-compensation)
  * [Get employee's compensation](#3-get-employee's-compensation)
  * [Get single employee's compensation](#4-get-single-employee's-compensation)
  * [Update employee's compensation](#5-update-employee's-compensation)

* [Departments](#departments)

  * [Create a department](#1-create-a-department)
  * [Delete department](#2-delete-department)
  * [Get all departments of a company](#3-get-all-departments-of-a-company)
  * [Update department](#4-update-department)

* [Employee](#employee)

  * [Create employee](#1-create-employee)
  * [Delete emplyee](#2-delete-emplyee)
  * [Get Employees](#3-get-employees)
  * [Get single employee](#4-get-single-employee)
  * [Update employee](#5-update-employee)

* [Non Taxable Pays](#non-taxable-pays)

  * [Create non taxable pay](#1-create-non-taxable-pay)
  * [Delete non taxable pay](#2-delete-non-taxable-pay)
  * [Get all non taxable pays](#3-get-all-non-taxable-pays)
  * [Get single non taxable pay](#4-get-single-non-taxable-pay)
  * [Update non taxable pay](#5-update-non-taxable-pay)

* [Not Found](#not-found)

  * [ANY /*](#1-any-*)

* [Payrun](#payrun)

  * [Create payrun](#1-create-payrun)
  * [Delete payrun](#2-delete-payrun)
  * [Get payruns](#3-get-payruns)
  * [Get single Payrun](#4-get-single-payrun)
  * [Update Payrun](#5-update-payrun)
  * [Update payrun status](#6-update-payrun-status)

* [Status](#status)

  * [Create employee's status](#1-create-employee's-status)
  * [Delete employee's status](#2-delete-employee's-status)
  * [Get employee's statuses](#3-get-employee's-statuses)
  * [Get single employee's status](#4-get-single-employee's-status)
  * [Update employee's status](#5-update-employee's-status)

* [TaxablePays](#taxablepays)

  * [Create Taxable pay](#1-create-taxable-pay)
  * [Delete taxable pay](#2-delete-taxable-pay)
  * [Get single taxable pays](#3-get-single-taxable-pays)
  * [Get taxable pays](#4-get-taxable-pays)
  * [Update taxable pay](#5-update-taxable-pay)

* [Users](#users)

  * [Delete a user by ID](#1-delete-a-user-by-id)
  * [Delete current logged in user](#2-delete-current-logged-in-user)
  * [Get a single user by id](#3-get-a-single-user-by-id)
  * [Get all users](#4-get-all-users)
  * [Get current user logged in](#5-get-current-user-logged-in)
  * [Update current user information](#6-update-current-user-information)
  * [Update current user password](#7-update-current-user-password)
  * [Update user by its ID](#8-update-user-by-its-id)


--------


## Auth
Login and register a user



### 1. Get Auth user


GET /api/v1/auth

Get auth user from the token stored in local storage


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/auth
```



### 2. Login a user


POST /api/v1/auth/login

Login a user. Get token and store to the Authorization headers


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |



***Body:***

```js        
{
    "email": "john@example.com",
    "password": "123456"
}
```



### 3. Register a user


POST /api/v1/auth/register

Create and register a user to the database


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |



***Body:***

```js        
{
    "username": "darrylmangibin",
    "email": "darryl@gmail.com",
    "password": "123456",
    "firstName": "darryl",
    "lastName": "mangibin"
}
```



## Companies
CRUD functionality for Company



### 1. Create x-company-tenant


POST /api/v1/companies/tenant/:tenantId

Set slug into x-company-tenant headers


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/api/v1/companies/tenant/full-suite
```



### 2. Get all companies


GET /api/v1/companies

Get all registered companies from the database - logged in user only


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/companies
```



### 3. Get company tenant


GET /api/v1/companies/tenant/:tenantId

Get company id from the database to make a tenant


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/companies/tenant/{{TENANT}}
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 4. Get single company by id


GET /api/v1/companies/:id

Get single company from the database - logged in user only


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/companies/6010d3dc7951e30d3a584798
```



## Company Name
CRUD functionality for Company Name



### 1. Create Company Name


POST /api/v1/company/name

Create a name and slug for company to the database - logged in and admin user only


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/companies/name
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "name": "test company"
}
```



### 2. Delete a company by id


DELETE /api/v1/companies/name/:id

Delete a company by id from the database - logged in user only


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/companies/name/5ffbd96e518a0b1417f9e055
```



### 3. Update company name


PUT /api/v1/companies/name/:id

Update company name from the database - logged in user only


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/companies/name/600e6c09375c9619203d426f
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |



***Body:***

```js        
{
    "name": ""
}
```



## Company Settings
Configure Company settings - logged in and admin user only



### 1. Create a company setting


POST /api/v1/companies/:id/settings

Create a company settings to the database


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/companies/settings
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "tin": "18471950195",
    "rdoCode": "583850181",
    "registeredAddress": {
        "street": "11g Marcoville St",
        "city": "Baguio city",
        "country": "Philippines",
        "zipCode": "2600"
    },
    "telephoneNumber": "4710571094",
    "category": "government",
    "frequency": "semiMonthly",
    "firstCutOff": "30",
    "firstPayout": "5",
    "secondCutOff": "15",
    "secondPayout": "20",
    "reportingBase": "payoutDates",
    "nightDifferential": "percentage",
    "nightDifferentialPercentage": "0.4",
    "overtime": "hourly",
    "overtimeRestDayPay": 0.5,
    "holiday": true,
    "regularHoliday": 1.2,
    "specialHoliday": 1.5,
    "deminimis": true,
    "emailNotification": true,
    "hideEmployeeList": false,
    "atc": "483858501057",
    "sssRegistrationNumber": "837401053",
    "phicNumber": "583859105748",
    "hdmfNumber": "5783010574",
    "nonTaxablePays": ["food", "snacks"],
    "sssCalculation": {
        "deminimis": true,
        "taxablePays": ["602c96b4572b7214b11b3281"],
        "nonTaxablePays": {
            "food": false,
            "snacks": true
        }
    },
    "phicCalculation": {
        "deminimis": false,
        "taxablePays": ["602c96b4572b7214b11b3281"],
        "nonTaxablePays": {
            "food": true,
            "snacks":true
        }
    },
    "thirteenthMonthPayCalculation": {
        "deminimis": true,
        "absences": true,
        "taxablePays": ["602c96b4572b7214b11b3281"],
        "nonTaxablePays": {
            "food": false,
            "snacks": false
        }
    },
    "accountingJournal": {
        "deminimisBenefits": "wagesAndSalaries",
        "employeeBenefits": "wagesAndSalaries",
        "hdmfPayable": "wagesAndSalaries",
        "netPay": "wagesAndSalaries",
        "nonTaxableCompensation": "wagesAndSalaries",
        "phicPayable": "wagesAndSalaries",
        "postTaxDeduction": "wagesAndSalaries",
        "preTaxDeduction": "wagesAndSalaries",
        "reimbursement": "wagesAndSalaries",
        "sssPayable": "wagesAndSalaries",
        "taxDue": "wagesAndSalaries",
        "taxableCompensation": "wagesAndSalaries",
        "thirteenthMonthPay": "wagesAndSalaries"
    }
}
```



### 2. Delete a company setting


DELETE /api/v1/companies/settings/:id

Delete company setting from the database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/companies/settings/602c972a572b7214b11b3283
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 3. Update company setting


PUT /api/v1/companies/settings/:id

Update company settings from the database - Logged in user only


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/companies/settings/60120c38f44b8109004862bd
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "registeredAddress": {
        "street": "12g Marcoville St",
        "city": "Baguio city",
        "country": "Philippines",
        "zipCode": "2600"
    },
    "accountingJournal": {
        "deminimisBenefits": "wagesAndSalaries",
        "employeeBenefits": "wagesAndSalaries",
        "hdmfPayable": "wagesAndSalaries",
        "netPay": "wagesAndSalaries",
        "nonTaxableCompensation": "wagesAndSalaries",
        "phicPayable": "wagesAndSalaries",
        "postTaxDeduction": "wagesAndSalaries",
        "preTaxDeduction": "wagesAndSalaries",
        "reimbursement": "wagesAndSalaries",
        "sssPayable": "wagesAndSalaries",
        "taxDue": "wagesAndSalaries",
        "taxableCompensation": "wagesAndSalaries",
        "thirteenthMonthPay": "wagesAndSalaries"
    },
    "category": "government",
    "frequency": "semiMonthly",
    "reportingBase": "payoutDates",
    "nightDifferential": "percentage",
    "nightDifferentialPercentage": 0.2,
    "overtime": "hourly",
    "overtimePay": 1.25,
    "overtimeRestDayPay": 0.5,
    "holiday": true,
    "regularHolidayPay": 1,
    "specialHolidayPay": 0.3,
    "taxReliefInternationTaxTreaty": false,
    "deminimis": true,
    "emailNotification": true,
    "hideEmployeeList": false,
    "taxablePays": [
        "beer",
        "yosi"
    ],
    "nonTaxablePays": [
        "food",
        "snacks"
    ],
    "sssCalculation": {
        "deminimis": true,
        "taxablePays": {
            "beer": true,
            "yosi": false
        },
        "nonTaxablePays": {
            "food": false,
            "snacks": true
        }
    },
    "phicCalculation": {
        "deminimis": false,
        "taxablePays": {
            "beer": false,
            "yosi": true
        },
        "nonTaxablePays": {
            "food": true,
            "snacks": true
        }
    },
    "thirtheenthMonthPayCalculation": {
        "deminimis": true,
        "absences": true,
        "taxablePays": {
            "beer": true,
            "yosi": false
        },
        "nonTaxablePays": {
            "food": false,
            "snacks": false
        }
    },
    "departments": [],
    "tin": "18471950195",
    "rdoCode": "583850181",
    "telephoneNumber": "4710571094",
    "firstCutOff": 30,
    "firstPayout": 5,
    "secondCutOff": 15,
    "secondPayout": 20,
    "atcCodes": "483858501057",
    "sssRegistrationNumber": "837401053",
    "phicNumber": "583859105748",
    "hdmfNumber": "5783010574",
    "formattedAddress": "11g Marcoville St, Baguio city, Philippines",
    "zipCode": "2600"
}
```



## Compensation
CRUD functionality for compensation



### 1. Create employee's compensation


POST /api/v1/employees/:employeeId/compensations/

Create employee's compensation to the database - logged in user



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a881/compensations/
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "basicPay": 39999,
    "effectivityDate": "2020-09-09",
    "deminimis": 300,
    "otherTaxablePays": [{ "taxablePay": "602c96b4572b7214b11b3281", "value": 123 }],
    "otherNonTaxablePays": [{ "nonTaxablePay": "602c96b4572b7286b11b3281", "value": 1234 }]
}
```



### 2. Delete employee's compensation


DELETE /api/v1/employees/:employeeId/compensations/:id

Delete employee's compensation - logged in user


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a881/compensations/6025fd533e1b4f138a30d141
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 3. Get employee's compensation


GET /api/v1/employees/:employeeId/compensations

Get all compensation of an employee - logged in user


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a882/compensations
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 4. Get single employee's compensation


GET /api/v1/employees/:employeeId/compensations/:id

Get single employee's compensation by its id from the database - logged in user


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a882/compensations/6025fd533e1b4f138a30d142
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 5. Update employee's compensation


PUT /api/v1/employees/:employeeId/compensations/:id

Update employee's compensation - logged in user


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a882/compensations/6025fd533e1b4f138a30d142
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "basicPay": 3000,
    "effectivityDate": "2020-01-01",
    "otherTaxablePays": [{ "taxablePay": "603384bee7b7491c8eea4872", "value": 1211 }],
    "otherNonTaxablePays": [{ "nonTaxablePay": "603384bee7b8491c8eea4872", "value": 122 }]
}
```



## Departments
Crud functionality for departments



### 1. Create a department


POST /api/v1/departments

Create a department for a specific company to the database - logged user


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/departments
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "name": "Staff"
}
```



### 2. Delete department


DELETE /api/v1/departments/:id


Delete a department from the database by its ID - logged in user


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/departments/60248cc5df28d8090b85bf54
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



### 3. Get all departments of a company


GET /api/v1/departments

Get all company's departments from the database


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/departments
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 4. Update department


PUT /api/v1/departments/:id

Update a department from the database by its ID


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/departments/60237e8a260fb31fc6afe686
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "name": "TsekPay Staff"
}
```



## Employee
Employees for a certain company(CRUD)



### 1. Create employee


POST /api/v1/employees

Create an employee to the database - logged user and administrator


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/employees
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "email": "fullsuiteEmployee125@example.com",
    "employeeNumber": "fullsuite-0025",
    "firstName": "Kayven1",
    "lastName": "Rodrigo1",
    "birthDate": "1994-02-11",
    "hireDate": "2020-03-09",
    "resignationDate": "",
    "payRemittances": true,
    "gender": "male",
    "nationality": "Filipino",
    "civilStatus": "single",
    "numberOfQualifiedDependents": 0,
    "rdoCode": "",
    "validId": "Passport",
    "validIdNumber": "12345678",
    "placeOfIssue": "Baguio City",
    "nightDifferential": true,
    "registeredAddress": {
      "street": "22p Marcoville",
      "city": "Baguio City",
      "country": "Philippines",
      "zipCode": "2600"
    },
    "permanentAddress": {
      "street": "Salt Lake",
      "city": "Utah",
      "country": "USA",
      "zipCode": "3151"
    },
    "bankingInformation": "1234145",
    "department": "602210ac3df32e1350e34bc1",
    "position": "Senior",
    "workingDays": 22,
    "workingHours": 8,
    "sssNumber": "1958483758",
    "phicNumber": "38480581",
    "hdmfNumber": "483050105",
    "tin": "12315136",
    "sssLoanBalance": 2000,
    "allowances": 3000,
    "hdmfLoanBalance": 0,
    "primaryEmployer": true,
    "compensation": {
        "basicPay": 1234,
        "deminimis": 1400,
        "otherTaxablePays": [{ "taxablePay": "6024c4d798d913139963a896", "value": 1200 }],
        "otherNonTaxablePays": [{ "nonTaxablePay": "6024c4d798d913139963a896", "value": 200 }]
    }
}
```



### 2. Delete emplyee


DELETE /api/v1/employees/:id

Delete an employee from the database - logged in and admin


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a886
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 3. Get Employees


GET /api/v1/employees

Get all employees from the database for specific employee only - logged in


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/employees
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 4. Get single employee


GET /api/v1/employees/:id

Get single employee information from the database by its ID - logged in and administrators


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a882
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



### 5. Update employee


PUT /api/v1/employees/:id

Update employee from the database - logged in user


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a882
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "email": "employee2@examle.com",
    "employeeNumber": "fullsuite-001",
    "firstName": "Kayven1",
    "lastName": "Rodrigo1",
    "birthDate": "1994-02-11",
    "hireDate": "2020-03-09",
    "resignationDate": "",
    "payRemittances": true,
    "gender": "male",
    "nationality": "Filipino",
    "civilStatus": "single",
    "numberOfQualifiedDependents": 0,
    "rdoCode": "",
    "validId": "Passport",
    "validIdNumber": "12345678",
    "placeOfIssue": "Baguio City",
    "registeredAddress": {
      "street": "22p Marcoville",
      "city": "Baguio City",
      "country": "Philippines",
      "zipCode": "2600"
    },
    "permanentAddress": {
      "street": "Salt Lake",
      "city": "Utah",
      "country": "USA",
      "zipCode": "3151"
    },
    "bankingInformation": "1234145",
    "department": "602210ac3df32e1350e34bc1",
    "position": "Senior",
    "workingDays": 22,
    "workingHours": 8,
    "sssNumber": "1958483758",
    "phicNumber": "38480581",
    "hdmfNumber": "483050105",
    "tin": "12315136",
    "sssLoanBalance": 2000,
    "allowances": 3000,
    "hdmfLoanBalance": 0,
    "primaryEmployer": false
}
```



## Non Taxable Pays
CRUD functionality for non taxable pays



### 1. Create non taxable pay


POST /api/v1/nonTaxablePays

Create a non taxable pays to the database


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/nonTaxablePays
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "name": "test non taxable pay"
}
```



### 2. Delete non taxable pay


DELETE /api/v1/nonTaxablePays/:id

Delete a non taxable pay from the database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/nonTaxablePays/602c96b4572b7286b11b3283
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 3. Get all non taxable pays


GET /api/v1/nonTaxablePays/

Get all non taxable pays from the database


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/nonTaxablePays
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 4. Get single non taxable pay


GET /api/v1/nonTaxablePays/:id

Get single non taxable pay from the database


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/nonTaxablePays/602c96b4572b7286b11b3283
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 5. Update non taxable pay


PUT /api/v1/nonTaxablePays/:id

Update non taxable pays from the database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/nonTaxablePays/602c96b4572b7286b11b3283
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "name": "Updated non taxable pay"
}
```



## Not Found
Unknown api routes



### 1. ANY /*


Throw 404 status code and an error response for not found API routes


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/any_routes
```



## Payrun
CRUD functionality for payrun



### 1. Create payrun


POST /api/v1/payruns

Create a payrun to a company to the database - logged in user


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/payruns
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "startDate": "2021-01-01",
    "endDate": "2021-01-15",
    "special": false
}
```



### 2. Delete payrun


DELETE /api/v1/payruns/:id

Delete a payrun by its id - logged in user


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/payruns/60752a518b70641293ea1cdb
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 3. Get payruns


GET /api/v1/payruns

Get all payrun for the company in the database - logged in user


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/payruns
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 4. Get single Payrun


GET /api/v1/payruns/:id

Get a single payrun by its id of a company from the database - logged in user


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/payruns/6073f55fef28d01bf5085b65
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 5. Update Payrun


PUT /api/v1/payruns/:id

Update payrun settings for a company - logged in user


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/payruns/6073f55fef28d01bf5085b62
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "startDate": "2021-01-01",
    "endDate": "2021-01-15",
    "payoutDate": "2021-01-20",
    "displayBeforePayout": false,
    "taxPayment": "half"
}
```



### 6. Update payrun status


PUT /api/v1/payruns/:id/status


Update payrun' status - logged in user


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/payruns/6073f55fef28d01bf5085b62/status
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "status": "void"
}
```



## Status



### 1. Create employee's status


POST /api/v1/employees/:employeeId/status/

Create status to the database - logged in user


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a881/status
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "employmentStatus": "inactive",
    "effectivityDate": "2020-09-09"
}
```



### 2. Delete employee's status


DELETE /api/v1/employees/:employeeId/status/:id

Delete status by id from the database - logged in user


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a881/status/6038b1e60e23d41c73f0209
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 3. Get employee's statuses


GET /api/v1/employees/:employeeId/status

Get employee's statuses from the database


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a881/status
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 4. Get single employee's status


GET /api/v1/employees/:employeeId/status/:id

Get single status from the database - logged in user


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a881/status/6025f0900a9552105d4bf581
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 5. Update employee's status


PUT /api/v1/employees/:employeeId/status/:id

Update status from the database - logged in user


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/employees/6024c4d798d913139963a881/status/6038b7bc0e509c1e36e2243d
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "employmentStatus": "active",
    "effectivityDate": "2020-01-30"
}
```



## TaxablePays
CRUD functionality for taxable pays



### 1. Create Taxable pay


POST /api/v1/taxablePays/:id

Create a taxable pays to the database


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/taxablePays
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "name": "test"
}
```



### 2. Delete taxable pay


DELETE /api/v1/taxablePays/:id

Delete a taxable pay from the database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/taxablePays/602de6baa4b06816d5ecb016
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 3. Get single taxable pays


GET /api/v1/taxablePays/:id

Get a single taxable pays from the database


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/taxablePays/603384bee7b7491c8eea4871
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 4. Get taxable pays


GET /api/v1/taxablePays

Get all taxable pays from the database for specific company


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/taxablePays
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| x-company-tenant | {{TENANT}} |  |



### 5. Update taxable pay


PUT /api/v1/taxablePays/:id

Update a taxable by by its ID


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/taxablePays/602c96b4572b7214b11b3283
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |
| x-company-tenant | {{TENANT}} |  |



***Body:***

```js        
{
    "name": "sample taxable pay"
}
```



## Users
Get all and single user. Update and delete user



### 1. Delete a user by ID


DELETE /api/v1/users/:id


Delete a user from the database admin only


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/users/600bc14430f8ec127be001d1
```



***Body:***

```js        
{
    "password": "123456",
    "confirmPassword": "123456"
}
```



### 2. Delete current logged in user


DELETE /api/v1/users/current-user

Delete current user and its companies and settings on the database - logged in user only


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/users/current-user
```



***Body:***

```js        
{
    "password": "123456",
    "confirmPassword": "123456"
}
```



### 3. Get a single user by id


GET /api/v1/users/:id

Get single user by id from the database - logged in user only


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users/5d7a514b5d2c12c7449be052
```



### 4. Get all users


GET /api/v1/users

Get all users from the database - logged in users


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users
```



### 5. Get current user logged in


GET /api/v1/users/current-user

Get current user information from the database - logged in user only


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users/current-user
```



### 6. Update current user information


PUT /api/v1/users/current-user

Update current user from the database - logged in user only


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/users/current-user
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |



***Body:***

```js        
{
    "username": "darrylmangibin",
    "email": "darryl@gmail.com",
    "firstName": "Darryl",
    "lastName": "Mangibin"
}
```



### 7. Update current user password


PUT /api/v1/users/current-user/password

Change Password of a current user - Logged in user only


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/users/current-user/password
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |



***Body:***

```js        
{
    "currentPassword": "123456",
    "newPassword": "12345",
    "confirmPassword": "12345"
}
```



### 8. Update user by its ID


PUT /api/v1/users/:id

Update a user from the  database - logged in and admin user only


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/users/600663f72b8226160c556c5b
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON type |



***Body:***

```js        
{
    "email": "admin@admin.com"
}
```



---
[Back to top](#paytsek)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-04-13 16:26:49 by [docgen](https://github.com/thedevsaddam/docgen)
