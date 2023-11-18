# Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

docker build -t mysql-image .
docker run -p 3306:3306 mysql-image
