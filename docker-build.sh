docker build -t abijith007/trackademic-frontend ./frontend
docker push abijith007/trackademic-frontend

docker build -t abijith007/trackademic-user-service ./backend/users-service
docker push abijith007/trackademic-user-service

docker build -t abijith007/trackademic-chatbot ./backend/chatbot-service
docker push abijith007/trackademic-chatbot

docker build -t abijith007/trackademic-issue-service ./backend/issue-tracker-service
docker push abijith007/trackademic-issue-service

docker build -t abijith007/trackademic-notification-service ./backend/notification-service
docker push abijith007/trackademic-notification-service

docker build -t abijith007/trackademic-api-gateway ./backend/api-gateway
docker push abijith007/trackademic-api-gateway