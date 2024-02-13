# run
```
node --env-file=.env server.js
```
# Endpoints
## /syllabus/query
```
curl 'localhost:8080/syllabus/query?name=<string>'
```
## /syllabus/insert
```
curl -X POST 'localhost:8080/syllabus/insert' -H name:<string> -H password:<string>
```
