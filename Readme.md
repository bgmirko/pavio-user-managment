To run project

1. Clone from github

2. Have to have docker environment installed and started locally 

3. In root of project run: "docker-compose up -d --build"

4. To enter into server bash: "docker exec -it pavio-user-managment_app_1 bash"

5. Change directory:  "cd src"

6. In bash enter: "npx sequelize-cli db:migrate"

7. Use postmen to send request to all routs

To run tests:

note: For Jest tests docker-compose will create separate database

1. Project should be in running state: "docker-compose up -d --build"

2. Install jest i root of project with command: "npm install jest" 

3. To run tests, in root of project run: "npm run test"