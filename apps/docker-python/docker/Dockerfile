FROM python:latest AS builder
ENV APP_DIR apps/docker-python
ENV PYTHONPATH /app/dist
COPY ${APP_DIR}/requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt --target ${PYTHONPATH}
COPY ${APP_DIR}/src/server.py /app/server.py

FROM python:3.11-slim-buster
WORKDIR /app
COPY --from=builder /app /app
RUN adduser --disabled-password --gecos '' appuser
RUN chown -R appuser /app
USER appuser
ENV PYTHONPATH /app/dist
EXPOSE 5000
