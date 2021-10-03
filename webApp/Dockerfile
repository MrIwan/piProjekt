# syntax=docker/dockerfile:1
FROM python:3.7
WORKDIR /src
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY src .
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
