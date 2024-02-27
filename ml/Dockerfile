FROM python:3.8

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 4000

# ENV FLASK_APP=wsgi.p
# CMD ["flask", "run", "--host=0.0.0.0", "--port=4000"]

CMD ["gunicorn", "-b", "0.0.0.0:4000", "wsgi:app"]