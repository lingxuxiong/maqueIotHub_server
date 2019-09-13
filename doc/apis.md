# API Browser

## Introduction
This document aims to list all available APIs and their usage in terms of how the API get called or what response it returns.

### Device management
- Get all devices that pertain to a product.
<pre>
/devices/:productName

==>
curl -X GET -i  http://127.0.0.1:3000/devices/fan
 
<==
[{"product_name":"fan","device_name":"JWoLCAv","secret":"uYPMWY-6"},{"product_name":"fan","device_name":"R29i3M_","secret":"jXzNF5Bm"},{"product_name":"fan","device_name":"bVgCc99","secret":"xUKNSQ3M"}]

Errors:
- 404, Not found
</pre>

- Get device details
<pre>
/devices/:productName/:deviceName

==>
curl -X GET -i  http://127.0.0.1:3000/devices/fan/JWoLCAv

<==
{"product_name":"fan","device_name":"JWoLCAv","secret":"uYPMWY-6"}

Errors:
- 
</pre>

### Authentication management
- Get JWT tokens valid for a period of time
<pre>
/tokens

==>
curl -X POST -i  http://127.0.0.1:3000/tokens

<==
{"userName":"apBmfvk","password":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFwQm1mdmsiLCJleHBpcmVzIjoxNTY4Mzg5ODYwLCJpYXQiOjE1NjgzODkyNjB9.nuu5n-7_pUQ4fp7Pvw8GuGv8V1GGxVKvaclXOy7v6BQ"}
</pre>