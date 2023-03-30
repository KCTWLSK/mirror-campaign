# deploy

## push image from local to cloud run
```shell
    gcloud auth login  
    # update image
    gcloud builds submit --tag gcr.io/cendpoint-kream/mirror-campaign --project=cendpoint-kream  
    # create cloud run
    gcloud run deploy --image gcr.io/cendpoint-kream/mirror-campaign --project=cendpoint-kream --platform=managed  
    # Service name: mirror-campaign  
    # Region: HK ([2] asia-east2)  
    # allow unauth: y
```

## make static page works
### find and replace font path
    - zh-HK.html
    - en.html 
    - out/_next/static/css/ one of them