FROM postgres:alpine

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB postgres

EXPOSE 5432

CMD ["postgres"]
