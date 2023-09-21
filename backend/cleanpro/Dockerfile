FROM python:3.9

WORKDIR /app

RUN pip install gunicorn==20.1.0

COPY . .

RUN pip install -r requirements.txt --no-cache-dir

RUN apt-get update && \
    apt-get install -y dos2unix && \
    dos2unix run_django_not_prod.sh

CMD ["bash", "run_django_not_prod.sh"]
