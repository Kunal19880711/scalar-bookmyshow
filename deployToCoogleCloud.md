# Deploying to google Cloud

To deploy an Express.js server on Google Cloud Run using a `.env` file, you can follow these steps:

### 1. Set Up an Express.js App

First, create an Express.js app if you haven’t done so already:

```bash
mkdir my-express-app
cd my-express-app
npm init -y
npm install express dotenv
```

Create a simple server in `index.js`:

```javascript
// index.js
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, Google Cloud Run!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

### 2. Create a `.env` File

Add your environment variables to a `.env` file:

```plaintext
# .env
PORT=8080
SECRET_KEY=mysecretkey
```

### 3. Dockerize the Application

Cloud Run requires your app to be containerized with Docker. Create a `Dockerfile` in the root directory:

```Dockerfile
# Dockerfile
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Run the app
CMD ["node", "index.js"]
```

### 4. Ignore `.env` File in `.dockerignore`

Add `.env` to a `.dockerignore` file to prevent it from being copied into the Docker image:

```plaintext
# .dockerignore
.env
node_modules
```

### 5. Build and Test the Docker Image Locally

To verify the Docker image, run it locally:

```bash
docker build -t my-express-app .
docker run -p 8080:8080 --env-file .env my-express-app
```

### 6. Deploy to Google Cloud Run

1. **Upload Environment Variables to Cloud Run**: Since `.env` won’t be uploaded with the Docker image, you need to add these environment variables directly to Google Cloud Run during deployment.

2. **Build and Push the Docker Image to Google Container Registry**:

   ```bash
   gcloud auth configure-docker
   docker tag my-express-app gcr.io/[PROJECT_ID]/my-express-app
   docker push gcr.io/[PROJECT_ID]/my-express-app
   ```

3. **Deploy to Cloud Run**:

   ```bash
   gcloud run deploy my-express-app \
     --image gcr.io/[PROJECT_ID]/my-express-app \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars SECRET_KEY=mysecretkey
   ```

Replace `[PROJECT_ID]` with your Google Cloud Project ID. Also, you can add other environment variables with `--set-env-vars` in the deployment command.

### 7. Test the Deployment

After deployment, Google Cloud Run will provide a URL for your app. Visit the URL in your browser to confirm that your Express app is running.

# Result

```
❯ gcloud run deploy scalarbookmyshow --image gcr.io/$PROJECT_ID/scalarbookmyshow --platform managed --region us-central1 --allow-unauthenticated
Deploying container to Cloud Run service [scalarbookmyshow] in project [scalarbookmyshow-439707] region [us-central1]
✓ Deploying new service... Done.
  ✓ Creating Revision...
  ✓ Routing traffic...
  ✓ Setting IAM Policy...
Done.
Service [scalarbookmyshow] revision [scalarbookmyshow-00001-xsn] has been deployed and is serving 100 percent of traffic.
Service URL: https://scalarbookmyshow-357915187611.us-central1.run.app
```
