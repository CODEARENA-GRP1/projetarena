# ---------------------------
# IMAGE DE BASE
# ---------------------------
FROM python:3.10-slim

# ---------------------------
# VARIABLES D'ENVIRONNEMENT
# ---------------------------
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ---------------------------
# RÉPERTOIRE DE TRAVAIL
# ---------------------------
WORKDIR /app

# ---------------------------
# COPIER LES FICHIERS DU PROJET
# ---------------------------
COPY . .

# ---------------------------
# INSTALLATION DES DÉPENDANCES
# ---------------------------
RUN pip install --upgrade pip \
    && pip install --no-cache-dir \
       fastapi \
       uvicorn \
       pymongo \
       passlib[bcrypt]==1.7.4 \
       bcrypt==4.0.1 \
       python-jose[cryptography] \
       python-dotenv \
       python-multipart

# ---------------------------
# EXPOSER LE PORT FASTAPI
# ---------------------------
EXPOSE 8000

# ---------------------------
# COMMANDE POUR DÉMARRER L'API
# ---------------------------
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
