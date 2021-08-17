### Introduction 
Kerberos is a computer network security protocol that authenticates service requests between two
or more trusted hosts across an untrusted network, like the internet. It uses secret-key
cryptography and a trusted third party for authenticating client-server applications and verifying
users' identities.

Some Information about the project:
1. The following project is a prototype authentication model that uses hashing algorithm known as SHA256 to hash the password. 
2. I have used local storage of the browser to storage the data as an array of objects.
3. The project also has the feature to see the data stored in a table form. 

After Installing Docker, run cmd/terminal as admin
docker build -t kerberos .
docker run  -p 6000:3000 kerberos 

Created & designed by Prajeet Shrestha
Computer Science Batch 2017 
prajeet.shrestha.biz@gmail.com 
9810442111
