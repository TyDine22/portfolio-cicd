---
title: "Local RAG System"
description: "A local Retrieval-Augmented Generation application using document ingestion, embeddings, vector search and local language models."

technologies:
  - Python
  - Ollama
  - ChromaDB
  - RAG

category: "AI Engineering"
year: 2026

featured: true
order: 1
---

## Overview

This project explores a complete local Retrieval-Augmented Generation pipeline.

The system processes documents, divides them into chunks, generates embeddings, stores those embeddings in a vector database and retrieves relevant information before generating an answer.

## What I worked on

The pipeline includes:

- Document ingestion
- Text chunking
- Local embeddings
- Vector storage
- Semantic retrieval
- Context construction
- Local LLM generation

## Architecture

The basic flow is:

User Question → Retrieval → Relevant Context → Local LLM → Answer

## What I learned

This project helped me understand how retrieval quality, chunking strategy and context selection affect the final response produced by a language model.