FROM python:3.11-slim


# set environment variables
ENV PYTHONDONTWRITEBYCODE 1
ENV PYTHONUNBUFFERED 1


WORKDIR /app


# install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/


CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]