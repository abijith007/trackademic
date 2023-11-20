# Define paths to your frontend and backend folders
$frontendPath = "./frontend"
$backendUserServicePath = "./backend/users-service"

function Start-NpmInNewWindow {
    param (
        [string]$path
    )
    Start-Process PowerShell -ArgumentList "-NoExit", "-Command cd '$path'; npm start"
}

Start-NpmInNewWindow -path $frontendPath
Start-NpmInNewWindow -path $backendUserServicePath