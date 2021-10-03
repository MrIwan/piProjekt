# syntax=docker/dockerfile:1
FROM python:3.7
WORKDIR /src
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY src .
COPY . .
CMD ["python3",  "main.py"]
