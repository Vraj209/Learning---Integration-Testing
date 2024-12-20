docker-compose up -d

echo '🟡 - waiting for database running'
./script/wait-for-it.sh "postgresql://postgres:123@localhost:5432/postgres"  -- echo '🟢 - Database is running'

npx prisma migrate dev --name init

npm run test

docker-compose down
