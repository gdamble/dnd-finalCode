echo start

docker rm -f $(docker ps -aq)
docker rmi -f $(docker images | grep fabcar | awk '{print $3}')

echo "---------------------------Removed docker---------------------------"

./startFabric.sh javascript

echo "---------------------------Started Fabric---------------------------"

cd javascript

echo "---------------------------Changed Directory to javascript---------------------------"

npm install

echo "---------------------------npm install completed---------------------------"

node enrollAdmin.js

echo "---------------------------Enrolled Admin---------------------------"

node registerUser.js

echo "---------------------------Registered User---------------------------"

node query.js

echo "---------------------------Executed Query---------------------------"

cd ..

echo "---------------------------Changed Directory Back---------------------------"
echo end
