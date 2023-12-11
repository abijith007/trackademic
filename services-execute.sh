kubectl apply -f ./backend/users-service/deployment.yaml
kubectl apply -f ./backend/users-service/service.yaml
sleep 60
kubectl apply -f ./backend/notification-service/deployment.yaml
kubectl apply -f ./backend/notification-service/service.yaml
sleep 60
kubectl apply -f ./backend/issue-tracker-service/deployment.yaml
kubectl apply -f ./backend/issue-tracker-service/service.yaml
sleep 60
kubectl apply -f ./backend/chatbot-service/deployment.yaml
kubectl apply -f ./backend/chatbot-service/service.yaml
sleep 60
kubectl apply -f ./backend/api-gateway/deployment.yaml
kubectl apply -f ./backend/api-gateway/service.yaml


