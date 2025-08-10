FROM continuumio/miniconda3:latest

RUN mkdir -p /backend-cookbook
RUN mkdir -p /scripts
RUN mkdir -p /static-files
RUN mkdir -p /media-files
RUN mkdir -p /main
RUN mkdir -p /cookbook

COPY ./backend-cookbook/requirements.yml /backend-cookbook/requirements.yml
COPY ./scripts /scripts
RUN chmod +x ./scripts

RUN /opt/conda/bin/conda env create -f /backend-cookbook/requirements.yml
ENV PATH /opt/conda/envs/cookbook/bin:$PATH
RUN echo  "source activate cookbook" > ~/.bashrc

ENV PYTHONDONTWRITEBYTECODE=1
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install curl -y
RUN curl https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

WORKDIR /main
COPY ./main/package.json /main/package.json
COPY ./main/package-lock.json /main/package-lock.json
RUN npm i
COPY ./main /main
RUN npm run build

WORKDIR /cookbook
COPY ./cookbook/package.json /cookbook/package.json
COPY ./cookbook/package-lock.json /cookbook/package-lock.json
RUN npm i
COPY ./cookbook /cookbook
RUN npm run build

COPY ./backend-cookbook /backend-cookbook

WORKDIR /backend-cookbook





