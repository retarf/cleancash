# cleancash

1) docker-compose up -d
2) docker-compose exec backend python manage.py migrate
3) cp .env.example .env
4) docker-compose exec frontend npm i
5) docker-compose restart
