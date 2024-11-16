const { task, desc } = require("jake");
const { spawn } = require("child_process");

async function asyncRun(cmd, print = true) {
  return new Promise((resolve, reject) => {
    const [program, ...args] = cmd.split(" ").filter((token) => !!token);
    const subprocess = spawn(program, args);

    subprocess.stdout.on("data", (data) => console.log(data.toString()));
    subprocess.stderr.on("data", (data) => console.error(data.toString()));
    subprocess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
}

const dockerImg = "scalarbookmyshow";
const container = "scalarbookmyshow";
const systemPort = 8000;
const googleProjId = "scalarbookmyshow-439707";

desc(`Building docker image: [${dockerImg}]`);
task("build", async function () {
  try {
    await asyncRun(`docker build -t ${dockerImg} .`);
  } catch (error) {
    console.error(`Error building docker image: ${error}`);
    throw error;
  }
});

desc(
  `Deploying docker image: [${dockerImg}] to ` +
    `Google Cloud Run project [${googleProjId}]`
);
task("deploy", ["build"], async function () {
  try {
    await asyncRun(`gcloud auth configure-docker`);
    await asyncRun(
      `docker tag ${dockerImg} gcr.io/${googleProjId}/${dockerImg}`
    );
    await asyncRun(`docker push gcr.io/${googleProjId}/${dockerImg}`);
    await asyncRun(
      `gcloud run deploy ${dockerImg} ` +
        `--image gcr.io/${googleProjId}/${dockerImg} ` +
        `--platform managed --region us-central1 --allow-unauthenticated`
    );
  } catch (error) {
    console.error(`Error deploying docker image: ${error}`);
    throw error;
  }
});

desc(`cleaning up docker container: [${container}]`);
task("cleanup", async function () {
  try {
    await asyncRun(`docker rm -f ${container}`);
  } catch (error) {
    console.error(`Error cleaning up docker container: ${error}`);
  }
});

desc(
  `(re)starting docker container: [${container}] ` +
    `using docker image: [${dockerImg}]`
);
task("run", ["cleanup"], async function () {
  try {
    await asyncRun(
      `docker run -d --name ${container} ` +
        `-p ${systemPort}:8000 ${dockerImg}`
    );
  } catch (error) {
    console.error(`Error building docker image: ${error}`);
    throw error;
  }
});
