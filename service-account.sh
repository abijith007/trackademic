kubectl create serviceaccount my-k8s-service-account --namespace default

gcloud iam service-accounts add-iam-policy-binding \
  --role roles/iam.workloadIdentityUser \
  --member "serviceAccount:macro-pulsar-397402.svc.id.goog[default/my-k8s-service-account]" \
  my-gcs-service-account@macro-pulsar-397402.iam.gserviceaccount.com

gcloud projects add-iam-policy-binding macro-pulsar-397402 \
  --member "serviceAccount:my-gcs-service-account@macro-pulsar-397402.iam.gserviceaccount.com" \
  --role "roles/storage.admin"

kubectl annotate serviceaccount my-k8s-service-account \
  iam.gke.io/gcp-service-account=my-gcs-service-account@macro-pulsar-397402.iam.gserviceaccount.com \
  --namespace default

