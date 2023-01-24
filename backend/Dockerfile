FROM        python
ENV         PYTHONBUFFERED 1 
ENV         PYTHONDONTWRITEBYTECODE 1

WORKDIR     /app/backend
COPY        requirements.txt /app/backend

RUN         apt update \
            && apt upgrade -y 

RUN         apt install -y apt-utils python3-setuptools vim
RUN         pip3 install --upgrade pip -r requirements.txt

COPY        . /app/backend

EXPOSE      8000
CMD         gunicorn --bind 0.0.0.0:8000 cleancash.wsgi
