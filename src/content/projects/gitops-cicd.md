---
title: "GitOps CI/CD Pipeline"
description: "A CI/CD workflow connecting Jenkins, Docker, Git and Argo CD for automated application delivery to Kubernetes."

technologies:
  - Jenkins
  - Docker
  - GitHub
  - Argo CD
  - Kubernetes

category: "DevOps"
year: 2026

featured: true
order: 3
---

## Overview

This project demonstrates a GitOps-based deployment workflow for Spring Boot and Next.js applications.

## Pipeline

The workflow includes:

1. Developer pushes code
2. Jenkins detects the change
3. Jenkins builds the applications
4. Docker images are created
5. Images are pushed to a registry
6. Jenkins updates the GitOps repository
7. Argo CD detects the manifest change
8. Kubernetes synchronizes the application

## Technologies

The system combines CI and GitOps tooling:

- Jenkins
- Git
- Docker
- Kubernetes
- Argo CD

## What I learned

The project helped me understand the separation between Continuous Integration and GitOps-based Continuous Delivery.