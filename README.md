# cleancash

1) cp .env.example .env
2) docker-compose up -d
3) docker-compose exec backend python manage.py migrate
4) docker-compose exec frontend npm i
5) docker-compose restart
