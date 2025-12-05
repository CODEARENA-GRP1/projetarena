# sandbox/Dockerfile
FROM python:3.10-slim

WORKDIR /sandbox

# Pas d’installation de packages supplémentaires pour plus de sécurité
# COPY inutile pour le code utilisateur, on le monte au runtime

# Commande par défaut (sera remplacée par docker-py)
CMD ["python", "user_code.py"]
