---
title: "Microservices Platform"
description: "A microservices application deployed with independent services, Helm charts, PostgreSQL and Istio networking."

technologies:
  - Spring Boot
  - PostgreSQL
  - Docker
  - Helm
  - Istio
  - Kubernetes

category: "Cloud Architecture"
year: 2026

featured: true
order: 4
---

## Overview

A microservices application deployed on Kubernetes using independent backend services and cloud-native deployment practices.

## Architecture

The application consists of multiple services including:

- User service
- Product service
- Category service
- Order service
- Frontend application

Each backend service communicates with its own PostgreSQL database.

## Deployment

The services are containerized and deployed using Helm charts.

Istio provides networking capabilities for the microservice environment.

## What I learned

This project helped me understand how application architecture changes when moving from a monolithic deployment model toward independently deployed services.